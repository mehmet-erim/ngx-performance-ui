import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { TranslateModule } from '@ngx-translate/core';
import { EventListenerState } from './states/event-listener.state';
import { LoaderState } from './states/loader.state';
import { AbstractNgModelComponent } from './abstracts/ng-model.component';
import { RouterOutletComponent } from './components/router-outlet.component';
import { AutosizeDirective } from './directives/autosize.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
import { EllipsisDirective } from './directives/ellipsis.directive';
import { ForDirective } from './directives/for.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { ScrollListenerDirective } from './directives/scroll-listener.directive';
import { EventHandler } from './handlers/event.handler';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgxsModule.forFeature([EventListenerState, LoaderState]),
    TranslateModule.forChild(),
  ],
  declarations: [
    AbstractNgModelComponent,
    RouterOutletComponent,
    AutosizeDirective,
    AutofocusDirective,
    EllipsisDirective,
    ForDirective,
    HighlightDirective,
    ScrollListenerDirective,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgxsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,

    AbstractNgModelComponent,
    RouterOutletComponent,
    AutosizeDirective,
    AutofocusDirective,
    EllipsisDirective,
    ForDirective,
    HighlightDirective,
    ScrollListenerDirective,
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
          deps: [EventHandler],
          useFactory: noop,
          multi: true,
        },
      ],
    };
  }
}

export function noop() {
  const noop = function() {};
  return noop;
}
