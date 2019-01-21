import { ControlValueAccessor } from '@angular/forms';
import { ChangeDetectorRef, Component, Injector, Input } from '@angular/core';

@Component({ template: '' })
export class AbstractNgModelComponent<T = any, U = T> implements ControlValueAccessor {
  protected _value: T;

  @Input()
  disabled: boolean;

  @Input()
  ngModel: number;

  @Input()
  valueFn: (value: U, previousValue?: T) => T = value => (value as any) as T;

  @Input()
  valueLimitFn: (value: T, previousValue?: T) => any = value => false;

  @Input()
  set value(value: T) {
    value = this.valueFn((value as any) as U, this._value);

    if (this.valueLimitFn(value, this._value) !== false) return;

    this._value = value;
    this.notifyValueChange();
  }

  get value(): T {
    return this._value || this.defaultValue;
  }

  get defaultValue(): T {
    return this._value;
  }

  onChange: (value: T) => {};
  onTouched: () => {};

  protected cdRef: ChangeDetectorRef;

  constructor(public injector: Injector) {
    this.cdRef = injector.get(ChangeDetectorRef);
  }

  notifyValueChange(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  writeValue(value: T): void {
    this._value = this.valueLimitFn(value, this._value) || value;
    setTimeout(() => this.cdRef.detectChanges(), 0);
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
}
