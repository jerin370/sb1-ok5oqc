import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<{products: Product[]}>(`${this.baseUrl}/products?limit=100`)
      .pipe(map(response => response.products));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<{products: Product[]}>(`${this.baseUrl}/products/category/${category}`)
      .pipe(map(response => response.products));
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }
}