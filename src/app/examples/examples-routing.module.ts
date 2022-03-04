import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { PipesComponent } from './pipes/pipes.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'data-binding' },
  { path: 'data-binding', component: DataBindingComponent },
  { path: 'pipes', component: PipesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamplesRoutingModule {}

export const routedComponents = [DataBindingComponent, PipesComponent];
