import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as _components from './components';
import * as _directives from './directives';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, FormsModule],
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
