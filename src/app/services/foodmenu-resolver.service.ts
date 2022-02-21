import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FoodMenu, FoodMenuResolved } from '../models/food-menu.model';
import { FoodMenuService } from './foodmenu.service';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FoodMenuResolver implements Resolve<FoodMenuResolved> {
  constructor(private foodmenuService: FoodMenuService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<FoodMenuResolved> {
    const id = Number(route.paramMap.get('foodId'));
    if (isNaN(Number(id))) {
      const message = `FoodMenu id was not a number: ${id}`;
      console.error(message);
      return of({ foodMenu: null, error: message });
    }

    return this.foodmenuService.GetFoodItemDetails(id).pipe(
      map((fm) => ({ foodMenu: fm })),
      catchError((error) => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of({ foodMenu: null, error: message });
      })
    );
  }
}
