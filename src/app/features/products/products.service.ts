import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

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
    constructor(private http:HttpClient){}

    getProducts(): Observable<Product[]>{
        return this.http.get<Product[]>(`${this.BASE_URL}products`);
    } 

    getProduct(id: number): Observable<Product>{
        return this.http.get<Product>(`${this.BASE_URL}products/${id}`)
    }
}