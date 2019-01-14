import { ModuleWithProviders, NgModule } from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AbstractNgModelComponent } from './abstracts/ng-model.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AbstractNgModelComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PerfectScrollbarModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, AbstractNgModelComponent, PerfectScrollbarModule],
  providers: [],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
