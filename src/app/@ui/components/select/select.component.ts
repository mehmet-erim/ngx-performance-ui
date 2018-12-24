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
import { AbstractNgModelComponent } from '../../../shared/abstracts/ng-model.component';
import compare from 'just-compare';

export interface SelectOption {
  label?: string;
  value: any;
}

@Component({
  selector: 'mn-select',
  template: `
    <label [attr.for]="selectId">{{ label }}</label>
    <select
      class="custom-select {{ selectClass }}"
      [(ngModel)]="value"
      [attr.id]="selectId"
      [compareWith]="compareFn"
      (change)="onSelect()"
    >
      <option [ngValue]="undefined" *ngIf="placeholder">{{ placeholder }}</option>
      <option *ngFor="let option of options; trackBy: trackByFn" [ngValue]="option.value || option"
        >{{ option.label || option.value || option }}
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
  options: Array<SelectOption | string> = [];

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

  onSelect() {
    this.select.emit(this.value);
  }

  trackByFn(_, option) {
    return option.label || option.value || option;
  }
}
