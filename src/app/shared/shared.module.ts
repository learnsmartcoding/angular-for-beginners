import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DisplayErrorsComponent } from './display-errors/display-errors.component';
import { LabelErrorComponent } from './label-error/label-error.component';
import { ReplaceStringPipe } from './pipes/string-replace.pipe';
import { ToPascalPipe } from './pipes/to-pascal.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TooltipModule,
  ],
  declarations: [DisplayErrorsComponent, LabelErrorComponent, ReplaceStringPipe,ToPascalPipe],
  exports: [DisplayErrorsComponent, LabelErrorComponent,ReplaceStringPipe,ToPascalPipe],
})
export class SharedModule {}
