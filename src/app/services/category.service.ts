import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl: string;
  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = environment.apiUrl;
  }

  getCategories(): Observable<Category[]> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.category}/all`;
    return this.getArrary<Category>(url);
  }

  getCategory(id: number): Observable<Category> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.category}/${id}`;
    return this.get<Category>(url);
  }

  private get<T>(url: string, options?: any): Observable<T> {
    return this.http.get(url, options).pipe(
      map(res => this.extractData<T>(res))
    ) as Observable<T>;
  }
  private getArrary<T>(url: string, options?: any): Observable<T[]> {
    return this.http.get(url, options).pipe(
      map(res => this.extractData<T[]>(res))
    ) as Observable<T[]>;
  }

  private extractData<T>(res: any) {
    if (res && (res.status < 200 || res.status >= 300)) {
      throw new Error('Bad response status: ' + res.status);
    }
    return (res || {}) as T;
  }
}
