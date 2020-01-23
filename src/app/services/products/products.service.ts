import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(email: string): Observable<Product[]> {
    const params = new HttpParams().set('email', email);
    return this.http.get<Product[]>(environment.products, { params: params });
  }

  createProduct(product: Product, email: string): Observable<Product> {
    const createProductDto = {
      product,
      email
    };
    return this.http.post<Product>(environment.products, createProductDto);
  }

  updateProductById(productId: string, updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(environment.products + '/' + productId, updatedProduct);
  }

  getProductById(productId: string): Observable<Product> {
    const params = new HttpParams().set('id', productId);
    return this.http.get<Product>(environment.products, { params: params });
  }

  updateProducts(email: string, newProductsArr: Product[]): Observable<Product[]> {
    const updateProductsDto = {
      email,
      newProductsArr
    };
    return this.http.put<Product[]>(environment.products, updateProductsDto);
  }
}
