import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { ChartsComponent } from './components/charts/charts.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { LayoutPrimaryComponent } from '../layouts';
import { UiModule } from '@ngx-performance-ui/ui';
import { CoreModule } from '@ngx-performance-ui/core';

@NgModule({
  declarations: [ChartsComponent, LayoutPrimaryComponent, ShowcaseComponent],
  imports: [HomeRoutingModule, UiModule, CoreModule],
})
export class HomeModule {}
