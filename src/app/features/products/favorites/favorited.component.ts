import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FavoritesService } from "./favorites.service";
import { ProductsService } from "../products.service";
import { combineLatest, map, Observable } from "rxjs";
import { ProductVM } from "../products.component";
import { CommonModule } from "@angular/common";
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent{

  private router = inject(Router);
  private favoritesService = inject(FavoritesService);
  private productsService = inject(ProductsService);

  vm$: Observable<ProductVM[]> = combineLatest([
    this.productsService.getProducts(),
    this.favoritesService.favorites$
  ]).pipe(
    map(([products, favorites]) =>
      products
        .filter(p => favorites.includes(p.id))
        .map(p => ({ ...p, isFavorite: true }))
    )
  );

  openProduct(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  toggleFavorite(productId: number): void {
    this.favoritesService.toggle(productId);
  }

  
}
