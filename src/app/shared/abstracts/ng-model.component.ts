import { ControlValueAccessor } from '@angular/forms';
import { ChangeDetectorRef, Component, Injector, Input } from '@angular/core';

// Not an abstract class on purpose. Do not change!

@Component({ template: '' })
export class AbstractNgModelComponent<T = any> implements ControlValueAccessor {
  @Input()
  disabled: boolean;

  protected _value: T;

  @Input()
  set value(value: T) {
    if (this.valueLimitFn(value) !== false) return;
    this._value = this.valueFn(value);
    this.notifyValueChange();
  }

  get value(): T {
    return this._value || this.defaultValue;
  }

  get defaultValue(): T {
    return this._value;
  }

  onChange: (value) => {};
  onTouched: () => {};

  valueFn: (value: any) => T = value => value;
  valueLimitFn: (value: any) => any = value => false;

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
    this._value = this.valueLimitFn(value) || value;
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
