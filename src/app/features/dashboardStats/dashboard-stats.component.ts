import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { FavoritesService } from '../products/favorites/favorites.service';

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  templateUrl: './dashboard-stats.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardStatsComponent {
  private productsService = inject(ProductsService);
  private favoritesService = inject(FavoritesService);

  // 🔹 Signals (state)
  productsCount = signal(0);
  favoritesCount = signal(0);

  // 🔹 Derived signal
  favoritesLabel = computed(() =>
    `You have ${this.favoritesCount()} favorite products`
  );

  constructor() {
    // Bridge RxJS → Signals
    this.productsService.getProducts().subscribe(products => {
      this.productsCount.set(products.length);
    });

    this.favoritesService.favorites$.subscribe(favorites => {
      this.favoritesCount.set(favorites.length);
    });
  }
}