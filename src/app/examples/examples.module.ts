import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';
import { ExamplesRoutingModule, routedComponents } from './examples-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ExamplesRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SharedModule
  ],
  exports: [],
  declarations: [routedComponents],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExamplesModule {}
