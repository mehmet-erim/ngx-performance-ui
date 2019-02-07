import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@core/core.module';
import { ngxsLogExcept } from '@core/utils';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { UiModule } from '@ui/ui.module';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import * as _states from './store/states';
import { LoaderState } from './@core/states/loader.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    UiModule,

    // Third party
    NgxsModule.forRoot([_states.ToasterState, _states.EventListenerState, LoaderState]),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
      logger: environment.production ? null : ngxsLogExcept(['EventListener']),
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
