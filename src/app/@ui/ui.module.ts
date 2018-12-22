import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as _components from './components';

@NgModule({
  imports: [FormsModule],
  declarations: [_components.MnRadioComponent, _components.MnToasterComponent, _components.MnToasterContainerComponent],
  exports: [_components.MnRadioComponent, _components.MnToasterComponent, _components.MnToasterContainerComponent],
})
export class UiModule {}
