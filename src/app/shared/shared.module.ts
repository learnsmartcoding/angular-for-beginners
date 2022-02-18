import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DisplayErrorsComponent } from './display-errors/display-errors.component';
import { LabelErrorComponent } from './label-error/label-error.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TooltipModule,
  ],
  declarations: [DisplayErrorsComponent, LabelErrorComponent],
  exports: [DisplayErrorsComponent, LabelErrorComponent],
})
export class SharedModule {}
