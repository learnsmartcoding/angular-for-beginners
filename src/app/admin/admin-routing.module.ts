import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { UpdateCategoryComponent } from './category/edit/index.component';
import { CreateCuisineComponent } from './create-cuisine/create-cuisine.component';
import { CuisineViewComponent } from './cuisine-view/cuisine-view.component';
import { EditCuisineComponent } from './edit-cuisine/edit-cuisine.component';
import { FoodCreateComponent } from './food/food-create/food-create.component';
import { FoodEditComponent } from './food/food-edit/food-edit.component';
import { FoodViewComponent } from './food/food-view/food-view.component';
import { UploadComponent } from './food/upload/upload.component';

const routes: Routes = [
  {
    path: 'cuisine',
    component: CuisineViewComponent,
  },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'cuisine/create',
    component: CreateCuisineComponent,
  },
  {
    path: 'cuisine/edit/:cuisineId',
    component: EditCuisineComponent,
  },
  { path: 'food/create', component: FoodCreateComponent },
  { path: 'food/edit/:foodId', component: FoodEditComponent },
  { path: 'food/all', component: FoodViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

export const routedComponents = [
  CuisineViewComponent,
  CreateCuisineComponent,
  UpdateCategoryComponent,
  CategoryComponent,
  EditCuisineComponent,
  FoodCreateComponent,
  FoodEditComponent,
  FoodViewComponent,
  UploadComponent
];
