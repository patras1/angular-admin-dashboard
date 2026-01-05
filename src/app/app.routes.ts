import { Routes } from '@angular/router';
import { AppLayout } from './layout/app-layout/app-layout';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component')
        .then(m => m.LoginComponent),
  },
  {
    path: '',
    component: AppLayout,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboardStats/dashboard-stats.component')
            .then(m => m.DashboardStatsComponent)
      },
      {
        path:'overview',
        loadComponent: () =>
          import('./features/products/products.component')
            .then(m => m.ProductsComponent)
      },
      {
      path: 'products/:id',
      loadComponent: () =>
        import('./features/products/product-details/product-details')
          .then(m => m.ProductDetails),
      },{
         path:'favorites',
         loadComponent: () => import('./features/products/favorites/favorited.component')
          .then(m => m.FavoritesComponent)
      },
      {
         path:'favorites-signal',
         loadComponent: () => import('./features/products/favorites/favorites-signal.component')
          .then(m => m.FavoritesSignalDemoComponent)
      },
     
      {
        path:'coach-profile',
        loadComponent: () =>
          import('./features/coach-profile/coach-profile')
            .then(m => m.CoachProfile)

      },
      {
        path:'nutrition-logic',
        loadComponent: () =>
          import('./features/nutrition-logic/nutrition-logic')
            .then(m => m.CoachPhilosophyComponent)
      }
    ]
  },
];