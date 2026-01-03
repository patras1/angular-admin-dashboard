import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductsService, Product } from './products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
    private productsService = inject(ProductsService)
    private router = inject(Router);
  products$: Observable<Product[]> = this.productsService.getProducts();

  openProduct(productId : number){
    console.log("id: " + productId)
      this.router.navigate(['/products', productId]);
  }
}
