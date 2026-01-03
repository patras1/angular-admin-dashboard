import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, map, shareReplay } from "rxjs";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Injectable({providedIn:'root'})
export class ProductsService{
    private BASE_URL = 'https://fakestoreapi.com/';
    private http = inject(HttpClient);

    private readonly products$ = this.http
        .get<Product[]>(`${this.BASE_URL}products`)
        .pipe(
        shareReplay(1) // 🔑 THIS IS THE KEY
        );


    getProducts(): Observable<Product[]>{
        return this.products$;
    } 

    getProduct(id: number): Observable<Product>{
        return this.http.get<Product>(`${this.BASE_URL}products/${id}`)
    }
}