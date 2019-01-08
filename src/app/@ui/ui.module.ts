import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import * as _components from './components';
import * as _directives from './directives';

@NgModule({
  imports: [SharedModule],
  declarations: [
    _components.CarouselComponent,
    _components.ModalComponent,
    _components.RadioComponent,
    _components.SelectComponent,
    _components.ToasterComponent,
    _components.ToasterContainerComponent,
    _components.TooltipComponent,

    // Directives
    _directives.TooltipDirective,
  ],
  entryComponents: [_components.ToasterComponent, _components.TooltipComponent],
  exports: [
    _components.CarouselComponent,
    _components.ModalComponent,
    _components.RadioComponent,
    _components.SelectComponent,
    _components.ToasterComponent,
    _components.ToasterContainerComponent,
    _components.TooltipComponent,

    // Directives
    _directives.TooltipDirective,
  ],
})
export class UiModule {}
