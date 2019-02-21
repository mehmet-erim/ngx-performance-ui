import { NgModule } from '@angular/core';
import * as _abstracts from './abstracts';
import * as _components from './components';
import * as _directives from './directives';
import { NgDatepickerModule } from 'ng2-datepicker';
import { CoreModule } from '../../../core/src/public_api';
import { NgxsModule } from '@ngxs/store';
import * as states from './states';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  imports: [
    CoreModule,
    NgDatepickerModule,
    CoreModule,
    NgxsModule.forFeature([states.ToasterState]),
    PerfectScrollbarModule,
  ],
  declarations: [
    // abstracts
    _abstracts.AbstractInputComponent,

    // charts
    _components.AnnotationChartComponent,

    // components
    _components.AutocompleteComponent,
    _components.CarouselComponent,
    _components.CheckboxComponent,
    _components.GoogleChartComponent,
    _components.DatePickerComponent,
    _components.InputComponent,
    _components.ListboxComponent,
    _components.ModalComponent,
    _components.PaginationComponent,
    _components.PopoverComponent,
    _components.ProgressBarComponent,
    _components.RadioComponent,
    _components.SelectComponent,
    _components.SpinnerComponent,
    _components.TextAreaComponent,
    _components.ToasterComponent,
    _components.ToasterContainerComponent,
    _components.TooltipComponent,

    // Directives
    _directives.DropdownDirective,
    _directives.PopoverDirective,
    _directives.TooltipDirective,
  ],
  entryComponents: [_components.ToasterComponent, _components.PopoverComponent, _components.TooltipComponent],
  exports: [
    // modules
    NgDatepickerModule,
    PerfectScrollbarModule,

    // charts
    _components.AnnotationChartComponent,

    // components
    _components.AutocompleteComponent,
    _components.CarouselComponent,
    _components.CheckboxComponent,
    _components.GoogleChartComponent,
    _components.DatePickerComponent,
    _components.InputComponent,
    _components.ListboxComponent,
    _components.ModalComponent,
    _components.PaginationComponent,
    _components.PopoverComponent,
    _components.ProgressBarComponent,
    _components.RadioComponent,
    _components.SelectComponent,
    _components.SpinnerComponent,
    _components.TextAreaComponent,
    _components.ToasterComponent,
    _components.ToasterContainerComponent,
    _components.TooltipComponent,

    // Directives
    _directives.DropdownDirective,
    _directives.PopoverDirective,
    _directives.TooltipDirective,
  ],
})
export class UiModule {}
