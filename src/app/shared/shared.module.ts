import { ModuleWithProviders, NgModule } from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AbstractNgModelComponent } from './abstracts/ng-model.component';

@NgModule({
  declarations: [AbstractNgModelComponent],
  imports: [PerfectScrollbarModule],
  exports: [AbstractNgModelComponent, PerfectScrollbarModule],
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
