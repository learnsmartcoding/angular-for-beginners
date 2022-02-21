import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodMenuResolver } from '../services/foodmenu-resolver.service';
import { CuisineComponent } from './cuisine/cuisine.component';
import { FoodDetailsComponent } from './food-details/food-details.component';
import { FoodItemsComponent } from './food-items/food-items.component';

const routes: Routes = [
  {
    path: '',
    component: CuisineComponent,
  },
  {
    path: ':cuisineId/foods',
    component: FoodItemsComponent,
  },
  {
    path: 'food/:foodId',
    component: FoodDetailsComponent,
    resolve: {foodMenuItem: FoodMenuResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}

export const routedComponents = [
  CuisineComponent,
  FoodItemsComponent,
  FoodDetailsComponent,
];
