import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductsService } from '../products.service';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

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

  product$:Observable<Product> = this.route.paramMap.pipe(
    switchMap(params =>{
      const id = Number(params.get('id'));
      return this.productsService.getProduct(id)
    })
  )

  goBack(): void {
    this.router.navigate(['/overview']);
  }
}
