import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule, routedComponents } from './admin-routing.module';
import { FoodEditComponent } from './food/food-edit/food-edit.component';
import { FoodViewComponent } from './food/food-view/food-view.component';
import { FoodCreateComponent } from './food/food-create/food-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SharedModule,
  ],
  exports: [],
  declarations: [routedComponents, FoodEditComponent, FoodViewComponent, FoodCreateComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
