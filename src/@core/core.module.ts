import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvalidMessageDirective } from './directives/invalid-message.directive';
import { InvalidTypeDirective } from './directives/invalid-type.directive';

@NgModule({
  declarations: [InvalidMessageDirective, InvalidTypeDirective],
  imports: [],
  exports: [InvalidMessageDirective, InvalidTypeDirective],
  providers: [],
})
export class CoreModule {}
