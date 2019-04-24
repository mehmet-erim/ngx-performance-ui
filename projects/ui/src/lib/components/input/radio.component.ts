import { Component, Input, forwardRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractNgModelComponent, uuid } from '@ngx-performance-ui/core';

@Component({
  selector: 'p-radio',
  template: `
    <div class="custom-control custom-radio custom-control-inline {{ classes }}">
      <input
        [attr.id]="id"
        [attr.name]="name"
        [value]="radioValue"
        [disabled]="disabled"
        [(ngModel)]="value"
        type="radio"
        class="custom-control-input"
      />
      <label class="custom-control-label" [attr.for]="id"><ng-content></ng-content></label>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
})
export class RadioComponent extends AbstractNgModelComponent {
  @Input()
  classes: string;

  @Input()
  id: string = uuid();

  @Input()
  name: string = 'radio';

  @Input()
  radioValue: any;
}
