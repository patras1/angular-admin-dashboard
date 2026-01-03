import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, map, Observable } from 'rxjs';
import { ProductsService, Product } from './products.service';
import { Router } from '@angular/router';
import { FavoritesService } from './favorites/favorites.service';

type ProductVM = Product & {
  isFavorite: boolean;
};

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
    private productsService = inject(ProductsService);
    private router = inject(Router);
    private favoritesService = inject(FavoritesService);

    vm$ = combineLatest([
        this.productsService.getProducts(),
        this.favoritesService.favorites$
    ]).pipe(
    map(([products, favorites]) =>
        products.map(product => ({
        ...product,
        isFavorite: favorites.includes(product.id),
        }))
    )
    ) as Observable<ProductVM[]>;

    openProduct(productId : number){
        console.log("id: " + productId)
        this.router.navigate(['/products', productId]);
    }

    toggleFavorite(id:number):void{
        this.favoritesService.toggle(id);
    }
}
