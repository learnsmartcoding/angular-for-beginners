import { NgModule } from '@angular/core';
import { MenuRoutingModule, routedComponents } from './menu-routing.module';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [routedComponents],
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule,
    CarouselModule.forRoot(),
  ],
  providers: [],
})
export class MenuModule {}
