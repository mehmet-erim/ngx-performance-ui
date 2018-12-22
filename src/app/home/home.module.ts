import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { UiModule } from '../@ui/ui.module';
import { CoreModule } from '../@core/core.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [HomeRoutingModule, UiModule, CoreModule],
})
export class HomeModule {}
