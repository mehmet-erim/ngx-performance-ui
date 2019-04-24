import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractInputComponent } from '../../abstracts';

@Component({
  selector: 'p-spinner',
  template: `
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <button type="button" class="{{ buttonClass }}" (click)="onClick(value - step)" [disabled]="disabled">
          {{ decreaseLabel }}
        </button>
      </div>
      <input
        type="number"
        class="form-control text-center {{ classes }}"
        [(ngModel)]="value"
        [id]="id"
        [hidden]="hidden"
        [name]="name"
        [disabled]="disabled"
        [min]="min"
        [max]="max"
        [attr.tabindex]="tabindex"
        [required]="required"
        [autofocus]="autofocus"
        [autofocusDelay]="autofocusDelay"
        (keyup)="keyup.emit($event)"
        (focus)="focus.emit($event)"
        (blur)="blur.emit($event)"
      />
      <div class="input-group-append">
        <button type="button" class="{{ buttonClass }}" (click)="onClick(value + step)" [disabled]="disabled">
          {{ increaseLabel }}
        </button>
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpinnerComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerComponent extends AbstractInputComponent {
  @Input()
  min: number = 1;

  @Input()
  max: number = 100;

  @Input()
  buttonClass: string = 'btn btn-secondary';

  @Input()
  increaseLabel: string = '+';

  @Input()
  decreaseLabel: string = '-';

  @Input()
  step: number = 1;

  valueLimitFn = (value: number): number | boolean => {
    if (value > this.max) return this.max;
    if (value < this.min) return this.min;
    return false;
  };

  get defaultValue(): number {
    return this.min;
  }

  onClick(value) {
    this.value = value;
  }
}
