import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as abstracts from './abstracts';
import * as components from './components';
import * as directives from './directives';
import * as handlers from './handlers';
import { TextMaskModule } from 'angular2-text-mask';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    abstracts.AbstractNgModelComponent,
    components.RouterOutletComponent,
    directives.HighlightDirective,
    directives.ScrollListenerDirective,
  ],
  exports: [
    CommonModule,

    abstracts.AbstractNgModelComponent,
    components.RouterOutletComponent,
    directives.HighlightDirective,
    directives.ScrollListenerDirective,
    TextMaskModule,
  ],
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
