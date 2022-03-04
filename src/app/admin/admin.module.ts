import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule, routedComponents } from './admin-routing.module';
import { EditCuisineComponent } from './edit-cuisine/edit-cuisine.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SharedModule
  ],
  exports: [],
  declarations: [routedComponents, EditCuisineComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
