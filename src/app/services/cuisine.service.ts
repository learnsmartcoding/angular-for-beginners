import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cuisine } from '../models/food-menu.model';

@Injectable({
  providedIn: 'root'
})
export class CuisineService {

    private apiUrl: string;
    constructor(
      private http: HttpClient
    ) {
      this.apiUrl = environment.apiUrl;
    }
  
   
  GetCuisines(): Observable<Cuisine[]> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.cuisine}/All`;
    return this.getArrary<Cuisine>(url);
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
