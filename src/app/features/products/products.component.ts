import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { combineLatest, debounce, debounceTime, distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { ProductsService, Product } from './products.service';
import { Router } from '@angular/router';
import { FavoritesService } from './favorites/favorites.service';
import { FormControl } from '@angular/forms';

export type ProductVM = Product & {
  isFavorite: boolean;
};

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
    private productsService = inject(ProductsService);
    private router = inject(Router);
    private favoritesService = inject(FavoritesService);

    searchControl = new FormControl('',{nonNullable:true});

    search$ = this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
    )
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

    filteredProducts$:Observable<ProductVM[]>= combineLatest([
        this.vm$,
        this.search$
    ]).pipe(
        map(([products,search])=>{
            const term = search.toLowerCase().trim();

            if(!term) return products;

            return products.filter(product=>{
              return  product.title.toLowerCase().includes(term)
            })
        })
    )


    openProduct(productId : number){
        console.log("id: " + productId)
        this.router.navigate(['/products', productId]);
    }

    toggleFavorite(id:number):void{
        this.favoritesService.toggle(id);
    }
}
