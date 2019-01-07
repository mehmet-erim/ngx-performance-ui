import { Component, Input, forwardRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { uuid } from '../../../@core/utils';

@Component({
  selector: 'p-radio',
  template: `
    <div class="custom-control custom-radio custom-control-inline {{ classes }}">
      <input
        [attr.id]="id"
        [attr.name]="name"
        [attr.value]="radioValue"
        [attr.checked]="value && value === radioValue"
        [disabled]="disabled"
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
export class RadioComponent implements ControlValueAccessor {
  @Input()
  classes: string;

  @Input()
  id: string = uuid();

  @Input()
  name: string = 'radio';

  @Input()
  radioValue: any;

  disabled: boolean;

  private _value: any;

  set value(value: any) {
    this._value = value;
    this.notifyValueChange();
  }

  get value(): any {
    return this._value;
  }

  onChange: (value) => {};
  onTouched: () => {};

  constructor() {}

  notifyValueChange(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  writeValue(obj: any): void {
    this._value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onClick() {
    console.log(this.value, this.radioValue);
    this.value = this.radioValue;
  }
}
