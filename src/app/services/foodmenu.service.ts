import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {  FoodMenu } from '../models/food-menu.model';
import { FoodMenuImage } from '../models/food-menu-image.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodMenuService {

  private apiUrl: string;
  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = environment.apiUrl;
  }

  public uploadImage(file: FormData, id: number): Observable<any> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.foodmenu}/upload/${id}`;
    return this.http.post(url, file);
}

  createFoodItem(foodMenu: FoodMenu): Observable<any>{
    const url = `${this.apiUrl}/${environment.apiEndpoints.foodmenu}`;
    return this.http.post(url,foodMenu);
  }

  updateFoodItem(foodMenu: FoodMenu): Observable<any>{
    const url = `${this.apiUrl}/${environment.apiEndpoints.foodmenu}`;
    return this.http.put(url,foodMenu);
  }

  deleteFoodItem(id:number):Observable<any>{
    const url = `${this.apiUrl}/${environment.apiEndpoints.foodmenu}/${id}`;
    return this.http.delete(url);
  }

  GetFoodItemsByCuisineId(id: number): Observable<FoodMenu[]> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.foodmenu}/cuisine/${id}/allFoodMenus`;
    return this.getArrary<FoodMenu>(url);
  }

  GetAllFoodItems(): Observable<FoodMenu[]> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.foodmenu}/allFoodMenuImages`;
    return this.getArrary<FoodMenu>(url);
  }

  GetFoodItemDetails(foodItemId: number): Observable<FoodMenu> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.foodmenu}/${foodItemId}`;
    return this.get<FoodMenu>(url);
  }

  GetFoodItemImages(foodItemId: number): Observable<FoodMenuImage[]> {
    const url = `${this.apiUrl}/${environment.apiEndpoints.foodmenu}/${foodItemId}/foodMenuImages`;
    return this.getArrary<FoodMenuImage>(url);
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

  
  GetFoodDetails(foodItemId:number):Observable<FoodMenu>{
    const url = `${this.apiUrl}/${environment.apiEndpoints.foodmenu}/${foodItemId}`;

    return this.http.get<FoodMenu>(url).pipe(
      tap(data=>console.log('All data: '+ JSON.stringify(data))), 
      catchError(this.handleError)
    );
  }

  private handleError(err:HttpErrorResponse){
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
