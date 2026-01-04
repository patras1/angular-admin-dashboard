import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductsService } from '../products.service';
import { combineLatest, filter, map, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../favorites/favorites.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
  standalone: true
})
export class ProductDetails {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productsService = inject(ProductsService)
  private favoritesService = inject(FavoritesService)

  vm$: Observable<Product & { isFavorite: boolean }> =
    combineLatest([
      this.route.paramMap.pipe(
        switchMap(params =>
          this.productsService.getProduct(Number(params.get('id')))
        )
      ),
      this.favoritesService.favorites$
    ]).pipe(
      filter(([product]) => !!product),
      map(([product, favorites]) => ({
        ...product,
        isFavorite: favorites.includes(product.id)
      }))
    );
    
  toggleFavorite(id: number): void {
    this.favoritesService.toggle(id);
  }

  goBack(): void {
    this.router.navigate(['/overview']);
  }
}
