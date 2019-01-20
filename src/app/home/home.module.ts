import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { UiModule } from '../@ui/ui.module';
import { CoreModule } from '../@core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ChartsComponent } from './components/charts/charts.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { LayoutPrimaryComponent } from '../layouts';

@NgModule({
  declarations: [ChartsComponent, LayoutPrimaryComponent, ShowcaseComponent],
  imports: [HomeRoutingModule, UiModule, CoreModule, SharedModule],
})
export class HomeModule {}
