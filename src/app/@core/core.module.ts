import { NgModule, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import * as handlers from './handlers';

@NgModule({
  declarations: [],
  imports: [SharedModule],
  exports: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          deps: [handlers.EventHandler],
          useFactory: noop,
          multi: true,
        },
      ],
    };
  }
}

export function noop() {
  return function() {};
}
