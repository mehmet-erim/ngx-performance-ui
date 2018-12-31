import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbstractNgModelComponent } from './abstracts/ng-model.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

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
