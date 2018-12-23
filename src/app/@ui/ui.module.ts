import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import * as _components from './components';
import * as _directives from './directives';

@NgModule({
  imports: [SharedModule],
  declarations: [
    _components.MnRadioComponent,
    _components.ToasterComponent,
    _components.MnToasterContainerComponent,

    // Directives
    _directives.MnToasterDirective,
  ],
  entryComponents: [_components.ToasterComponent],
  exports: [
    _components.MnRadioComponent,
    _components.ToasterComponent,
    _components.MnToasterContainerComponent,

    // Directives
    _directives.MnToasterDirective,
  ],
})
export class UiModule {}
