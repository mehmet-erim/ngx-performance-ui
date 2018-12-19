import { NgModule } from '@angular/core';
import { RadioComponent } from './components/radio.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutPrimaryComponent } from './components/layouts';

@NgModule({
  imports: [FormsModule],
  declarations: [RadioComponent, LayoutPrimaryComponent],
  exports: [RadioComponent, LayoutPrimaryComponent],
})
export class UiModule {}
