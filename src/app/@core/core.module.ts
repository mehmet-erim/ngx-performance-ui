import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import * as directives from './directives';
import * as handlers from './handlers';

@NgModule({
  imports: [SharedModule],
  declarations: [directives.ScrollListenerDirective],
  exports: [directives.ScrollListenerDirective],
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
