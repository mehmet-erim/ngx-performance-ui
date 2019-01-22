import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import * as _components from './components';
import * as _directives from './directives';
import { CoreModule } from '@core/core.module';

@NgModule({
  imports: [SharedModule, CoreModule],
  declarations: [
    _components.CarouselComponent,
    _components.GoogleChartComponent,
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
    _directives.TooltipDirective,
  ],
  entryComponents: [_components.ToasterComponent, _components.TooltipComponent],
  exports: [
    _components.CarouselComponent,
    _components.GoogleChartComponent,
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
    _directives.TooltipDirective,
  ],
})
export class UiModule {}
