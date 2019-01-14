import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from '@ui/ui.module';
import { CoreModule } from '@core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import * as _states from './store/states';
import { LayoutPrimaryComponent } from './layouts';
import { SharedModule } from './shared/shared.module';
import { ngxsLogExcept } from '@core/utils';

@NgModule({
  declarations: [AppComponent, LayoutPrimaryComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    UiModule,

    // Third party
    NgxsModule.forRoot([_states.ToasterState, _states.EventListenerState]),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
      // logger: environment.production ? null : ngxsLogExcept(['EventListener']),
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
