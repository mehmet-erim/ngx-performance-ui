import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutletComponent } from '@ngx-performance-ui/core';

const routes: Routes = [
  {
    path: '',
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
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
