import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import compare from 'just-compare';
import { AbstractNgModelComponent } from '../../../../../core/src/public_api';

export interface SelectOption {
  label?: string;
  value: any;
}

export type SelectListOption = SelectOption | string | number;

@Component({
  selector: 'p-select',
  template: `
    <label [attr.for]="selectId">{{ label }}</label>
    <select
      class="custom-select {{ selectClass }}"
      [(ngModel)]="value"
      [attr.id]="selectId"
      [compareWith]="compareFn"
      (ngModelChange)="onSelect($event)"
    >
      <option [ngValue]="undefined" *ngIf="placeholder">{{ placeholder }}</option>
      <option *ngFor="let option of options; trackBy: trackByFn" [ngValue]="getOptionValue(option)"
        >{{ getOptionLabel(option) }}
      </option>
    </select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent extends AbstractNgModelComponent {
  @Input()
  options: SelectListOption[] = [];

  @Input()
  selectId: string;

  @Input()
  selectClass: string = '';

  @Input()
  compareFn = compare;

  @Input()
  label: string;

  @Input()
  placeholder: string;

  @Output()
  select = new EventEmitter<any>();

  onSelect(value) {
    this.select.emit(value);
  }

  getOptionLabel(option: SelectListOption): string {
    const { label, value } = option as SelectOption;

    return label || (typeof value === 'string' || typeof value === 'number' ? String(value) : String(option));
  }

  trackByFn(_, option: SelectListOption) {
    const { label, value } = option as SelectOption;
    if (value === undefined || value instanceof Object) {
      return label || option;
    }

    return value;
  }

  getOptionValue(option: SelectListOption): any {
    const { value } = option as SelectOption;

    if (value === undefined) return option;

    return value;
  }
}
