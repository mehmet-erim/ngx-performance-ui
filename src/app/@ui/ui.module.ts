import { NgModule } from '@angular/core';
import { RadioComponent } from './components/radio.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule],
  declarations: [RadioComponent],
  exports: [RadioComponent],
})
export class UiModule {}
