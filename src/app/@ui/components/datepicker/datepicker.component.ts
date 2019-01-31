import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import * as enLocale from 'date-fns/locale/en';
import * as trLocale from 'date-fns/locale/tr';
import { DatepickerOptions } from 'ng2-datepicker';
import { uuid } from '../../../@core/utils';
import { AbstractNgModelComponent } from '../../../shared/abstracts/ng-model.component';

@Component({
  selector: 'p-datepicker',
  templateUrl: './datepicker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DatePickerComponent extends AbstractNgModelComponent<Date | string | number> {
  @Input() locale: 'tr' | 'en' = 'tr';

  @Input() type: 'date' | 'string' | 'number' = 'date';

  @Input() position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' = 'bottom-left';

  @Input() barTitleIfEmpty: string = 'Click to select a date';

  @Input() placeholder: string = 'Click to select a date';

  @Input() addClass: string = 'form-control';

  @Input() labelClass: string = '';

  @Input() label: string = 'Start Date';

  get options(): DatepickerOptions {
    return {
      minYear: 1970,
      maxYear: 2030,
      displayFormat: this.displayFormat,
      barTitleFormat: 'MMMM YYYY',
      dayNamesFormat: 'dd',
      firstCalendarDay: 1, // 0 - Sunday, 1 - Monday
      locale: this.locale === 'tr' ? trLocale : enLocale,
      barTitleIfEmpty: this.barTitleIfEmpty,
      placeholder: this.placeholder, // HTML input placeholder attribute (default: '')
      addClass: this.addClass, // Optional, value to pass on to [ngClass] on the input field
      fieldId: `p-date-picker-${uuid()}`, // ID to assign to the input field. Defaults to datepicker-<counter>
    };
  }

  get displayFormat(): string {
    return this.locale === 'tr' ? 'dd.MM.yyyy' : 'MMM d, y';
  }

  get date(): Date {
    return this.value ? new Date(this.value) : null;
  }
}
