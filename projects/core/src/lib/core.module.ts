import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as abstracts from './abstracts';
import * as components from './components';
import * as directives from './directives';
import * as handlers from './handlers';
import * as states from './states';
import { TextMaskModule } from 'angular2-text-mask';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgxsModule.forFeature([states.EventListenerState, states.LoaderState]),
    NgxsFormPluginModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    abstracts.AbstractNgModelComponent,
    components.RouterOutletComponent,
    directives.HighlightDirective,
    directives.ScrollListenerDirective,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgxsModule,
    NgxsFormPluginModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,

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
