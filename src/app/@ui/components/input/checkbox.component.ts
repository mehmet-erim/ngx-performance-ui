import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewEncapsulation, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractInputComponent } from '../../abstracts';

@Component({
  selector: 'p-checkbox',
  template: `
    <div class="form-group form-checkbox {{ classes }}">
      <input
        type="checkbox"
        [(ngModel)]="value"
        [id]="id"
        [attr.name]="name"
        [hidden]="hidden"
        [disabled]="disabled"
        class="form-check-input {{ classes }}"
        [required]="required"
        (keyup)="keyup.emit($event)"
        (focus)="focus.emit($event)"
        (blur)="blur.emit($event)"
      />

      <label
        [htmlFor]="id"
        (keyup.space)="onKeyup()"
        (click)="onChangeValue($event)"
        tabindex="0"
        class="form-check-label {{ labelClasses }}"
      >
        <p class="mb-0">{{ labelText }}</p>
      </label>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent extends AbstractInputComponent {
  onKeyup() {
    this.value = !this.value;
  }

  onChangeValue(event) {
    this.value = !this.value;
    this.click.emit(event);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.warn(changes.ngModel);
  }
}
