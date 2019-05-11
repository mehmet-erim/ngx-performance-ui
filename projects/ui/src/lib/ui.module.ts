import { NgModule } from '@angular/core';
import { NgDatepickerModule } from 'ng2-datepicker';
import { CoreModule } from '@ngx-performance-ui/core';
import { NgxsModule } from '@ngxs/store';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AbstractInputComponent } from './abstracts/input-component';
import { AnnotationChartComponent } from './components/charts/annotation-chart.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { CheckboxComponent } from './components/input/checkbox.component';
import { GoogleChartComponent } from './components/google-chart/google-chart.component';
import { DatePickerComponent } from './components/datepicker/datepicker.component';
import { InputComponent } from './components/input/input.component';
import { ListboxComponent } from './components/listbox/listbox.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PopoverComponent } from './components/popover/popover.component';
import { ProgressBarComponent } from './components/progress/progress-bar.component';
import { RadioComponent } from './components/input/radio.component';
import { SelectComponent } from './components/select/select.component';
import { SpinnerComponent } from './components/input/spinner.component';
import { TextAreaComponent } from './components/input/textarea.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ToasterContainerComponent } from './components/toaster/toaster-container.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { PopoverDirective } from './directives/popover.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { ToasterState } from './states/toaster.state';

// Icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarDay, faInfoCircle, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgxSlickJsModule } from 'ngx-slickjs';
library.add(faCalendarDay, faInfoCircle, faSearch, faTimes);

@NgModule({
  imports: [
    CoreModule,
    CoreModule,
    FontAwesomeModule,
    NgDatepickerModule,
    NgxsModule.forFeature([ToasterState]),
    PerfectScrollbarModule,
  ],
  declarations: [
    // abstracts
    AbstractInputComponent,

    // charts
    AnnotationChartComponent,

    // components
    AutocompleteComponent,
    CheckboxComponent,
    GoogleChartComponent,
    DatePickerComponent,
    InputComponent,
    ListboxComponent,
    ModalComponent,
    PaginationComponent,
    PopoverComponent,
    ProgressBarComponent,
    RadioComponent,
    SelectComponent,
    SpinnerComponent,
    TextAreaComponent,
    ToasterComponent,
    ToasterContainerComponent,
    TooltipComponent,

    // Directives
    DropdownDirective,
    PopoverDirective,
    TooltipDirective,
  ],
  entryComponents: [ToasterComponent, PopoverComponent, TooltipComponent],
  exports: [
    // modules
    FontAwesomeModule,
    NgDatepickerModule,
    NgxSlickJsModule,
    PerfectScrollbarModule,

    // charts
    AnnotationChartComponent,

    // components
    AutocompleteComponent,
    CheckboxComponent,
    GoogleChartComponent,
    DatePickerComponent,
    InputComponent,
    ListboxComponent,
    ModalComponent,
    PaginationComponent,
    PopoverComponent,
    ProgressBarComponent,
    RadioComponent,
    SelectComponent,
    SpinnerComponent,
    TextAreaComponent,
    ToasterComponent,
    ToasterContainerComponent,
    TooltipComponent,

    // Directives
    DropdownDirective,
    PopoverDirective,
    TooltipDirective,
  ],
})
export class UiModule {}
