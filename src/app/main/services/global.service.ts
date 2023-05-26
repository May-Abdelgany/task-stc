import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  Path = 'https://fakestoreapi.com/'
  products = new BehaviorSubject<product[]>([])
  constructor(private http: HttpClient) { }
  getData(url: String): Observable<any> {
    return this.http.get<any>(`${this.Path}${url}`);
  }
  addData(url: String, data: any): Observable<any> {
    return this.http.post<any>(`${this.Path}${url}`, data);
  }
  deleteData(url: String, data: any): Observable<any> {
    return this.http.delete<any>(`${this.Path}${url}`, data);
  }
  putData(url: String, data: any): Observable<any> {
    return this.http.put<any>(`${this.Path}${url}`, data);
  }
  patchData(url: String, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Path}${url}`, data);
  }
}
