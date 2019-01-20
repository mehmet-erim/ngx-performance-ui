import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPrimaryComponent } from '../layouts';
import { ChartsComponent } from './components/charts/charts.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPrimaryComponent,
    children: [
      {
        path: '',
        component: ShowcaseComponent,
      },
      {
        path: 'charts',
        component: ChartsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
