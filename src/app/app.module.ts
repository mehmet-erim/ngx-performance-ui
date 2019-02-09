import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { CoreModule, ngxsLogExcept } from '../../projects/core/src/public_api';
import { UiModule } from '../../projects/ui/src/public_api';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    UiModule,

    // Third party
    NgxsModule.forRoot([]),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
      logger: environment.production ? null : ngxsLogExcept(['EventListener']),
    }),
    NgxsFormPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
