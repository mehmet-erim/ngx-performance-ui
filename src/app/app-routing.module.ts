import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPrimaryComponent } from './layouts';

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: LayoutPrimaryComponent,
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomeModule',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
