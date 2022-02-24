import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BindingExamplesComponent } from './common/binding-examples/binding-examples.component';
import { PipeExamplesComponent } from './common/pipe-examples/pipe-examples.component';
import { HomeComponent } from './Home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'binding-examples', component: BindingExamplesComponent },
  { path: 'pipes-examples', component: PipeExamplesComponent },
  {
    path: 'cuisine',
    loadChildren: () => import('./menu/menu.module').then((m) => m.MenuModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
