import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import * as _abstracts from './abstracts';
import * as _components from './components';
import * as _directives from './directives';
import { CoreModule } from '@core/core.module';
import { NgDatepickerModule } from 'ng2-datepicker';

@NgModule({
  imports: [SharedModule, CoreModule, NgDatepickerModule],
  declarations: [
    // abstracts
    _abstracts.AbstractInputComponent,

    // charts
    _components.AnnotationChartComponent,

    // components
    _components.CarouselComponent,
    _components.CheckboxComponent,
    _components.GoogleChartComponent,
    _components.DatePickerComponent,
    _components.InputComponent,
    _components.ModalComponent,
    _components.PaginationComponent,
    _components.PopoverComponent,
    _components.RadioComponent,
    _components.SelectComponent,
    _components.ToasterComponent,
    _components.ToasterContainerComponent,
    _components.TooltipComponent,

    // Directives
    _directives.AutoFocusDirective,
    _directives.PopoverDirective,
    _directives.TooltipDirective,
  ],
  entryComponents: [_components.ToasterComponent, _components.PopoverComponent, _components.TooltipComponent],
  exports: [
    // modules
    NgDatepickerModule,

    // charts
    _components.AnnotationChartComponent,

    // components
    _components.CarouselComponent,
    _components.CheckboxComponent,
    _components.GoogleChartComponent,
    _components.DatePickerComponent,
    _components.InputComponent,
    _components.ModalComponent,
    _components.PaginationComponent,
    _components.PopoverComponent,
    _components.RadioComponent,
    _components.SelectComponent,
    _components.ToasterComponent,
    _components.ToasterContainerComponent,
    _components.TooltipComponent,

    // Directives
    _directives.AutoFocusDirective,
    _directives.PopoverDirective,
    _directives.TooltipDirective,
  ],
})
export class UiModule {}
