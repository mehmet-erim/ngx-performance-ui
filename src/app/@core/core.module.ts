import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import * as components from './components';
import * as directives from './directives';
import * as handlers from './handlers';

@NgModule({
  imports: [RouterModule, SharedModule],
  declarations: [components.RouterOutletComponent, directives.ScrollListenerDirective],
  exports: [components.RouterOutletComponent, directives.ScrollListenerDirective],
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
