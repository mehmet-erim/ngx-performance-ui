import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutletComponent } from './@core/components';

const routes: Routes = [
  {
    path: 'home',
    component: RouterOutletComponent,
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
