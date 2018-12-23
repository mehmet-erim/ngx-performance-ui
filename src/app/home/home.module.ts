import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { UiModule } from '../@ui/ui.module';
import { CoreModule } from '../@core/core.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [HomeRoutingModule, UiModule, CoreModule, SharedModule],
})
export class HomeModule {}
