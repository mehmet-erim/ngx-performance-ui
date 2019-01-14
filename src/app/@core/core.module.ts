import { NgModule, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import * as handlers from './handlers';
import * as directives from './directives';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [directives.ScrollListenerDirective],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, directives.ScrollListenerDirective],
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
