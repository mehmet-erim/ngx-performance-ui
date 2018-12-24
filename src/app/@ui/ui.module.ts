import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import * as _components from './components';

@NgModule({
  imports: [SharedModule],
  declarations: [
    _components.RadioComponent,
    _components.SelectComponent,
    _components.ToasterComponent,
    _components.ToasterContainerComponent,

    // Directives
  ],
  entryComponents: [_components.ToasterComponent],
  exports: [
    _components.RadioComponent,
    _components.SelectComponent,
    _components.ToasterComponent,
    _components.ToasterContainerComponent,

    // Directives
  ],
})
export class UiModule {}
