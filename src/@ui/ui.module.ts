import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RadioComponent } from './components/radio.component';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  declarations: [RadioComponent],
  exports: [RadioComponent],
})
export class UiModule {}
