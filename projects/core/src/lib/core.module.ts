import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { TextMaskModule } from 'angular2-text-mask';
import { AbstractNgModelComponent } from './abstracts/ng-model.component';
import { RouterOutletComponent } from './components/router-outlet.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { AutosizeDirective } from './directives/autosize.directive';
import { EllipsisDirective } from './directives/ellipsis.directive';
import { ForDirective } from './directives/for.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { ScrollListenerDirective } from './directives/scroll-listener.directive';
import { EventHandler } from './handlers/event.handler';
import { EventListenerState } from './states/event-listener.state';
import { LoaderState } from './states/loader.state';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgxsModule.forFeature([EventListenerState, LoaderState]),
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
