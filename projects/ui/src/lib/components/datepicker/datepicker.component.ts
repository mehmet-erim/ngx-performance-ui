import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractNgModelComponent, EventListenerState, uuid } from '@ngx-performance-ui/core';
import { Select } from '@ngxs/store';
import * as enLocale from 'date-fns/locale/en';
import * as trLocale from 'date-fns/locale/tr';
import { DatepickerOptions, NgDatepickerComponent } from 'ng2-datepicker';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'p-datepicker',
  templateUrl: './datepicker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent extends AbstractNgModelComponent<Date | string | number> {
  @Input() locale: 'tr' | 'en' = 'tr';

  @Input() position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' = 'bottom-right';

  @Input() barTitleIfEmpty: string = 'Click to select a date';

  @Input() placeholder: string = 'Click to select a date';

  @Input() addClass: string = 'form-control';

  @Input() labelClass: string = '';

  @Input() label: string = 'Start Date';

  @Select(EventListenerState.getOne('click'))
  click$: Observable<MouseEvent>;

  @ViewChild('datePicker') datePicker: NgDatepickerComponent;

  @ViewChild('group', { read: ElementRef }) group: ElementRef;

  destroy$ = new Subject<void>();

  closable: boolean = false;

  get options(): DatepickerOptions {
    return {
      minYear: 1890,
      maxYear: 2040,
      displayFormat: this.displayFormat,
      barTitleFormat: 'MMMM YYYY',
      dayNamesFormat: 'dd',
      firstCalendarDay: 1, // 0 - Sunday, 1 - Monday
      locale: this.locale === 'tr' ? trLocale : enLocale,
      barTitleIfEmpty: this.barTitleIfEmpty,
      placeholder: this.placeholder, // HTML input placeholder attribute (default: '')
      addClass: this.addClass, // Optional, value to pass on to [ngClass] on the input field
      fieldId: `p-date-picker-${uuid()}`, // ID to assign to the input field. Defaults to datepicker-<counter>,
    };
  }

  get displayFormat(): string {
    return this.locale === 'tr' ? 'dd.MM.yyyy' : 'MMM d, y';
  }

  get date(): Date {
    return this.value ? new Date(this.value) : null;
  }

  constructor(public injector: Injector) {
    super(injector);
  }

  private subscribeToEvents() {
    this.click$
      .pipe(
        takeUntil(this.destroy$),
        filter(
          event =>
            event &&
            this.closable &&
            !this.group.nativeElement.contains(event.target) &&
            !document.querySelector('#datepicker').contains(event.target as any),
        ),
      )
      .subscribe(() => this.toggle());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onClick() {
    if (this.datePicker.isOpened) return;

    this.toggle();
  }

  toggle() {
    if (this.datePicker.isOpened) {
      this.hide();
    } else {
      this.show();
    }

    setTimeout(() => this.cdRef.detectChanges(), 0);
  }

  show() {
    this.flip();
    this.datePicker.toggle();

    this.closable = false;
    this.subscribeToEvents();
    setTimeout(() => {
      this.closable = true;
    }, 500);
  }

  hide() {
    this.datePicker.toggle();
    this.destroy$.next();
  }

  flip() {
    const { bottom, top } = (this.group.nativeElement as HTMLElement).getBoundingClientRect();
    const { innerHeight } = window;

    if (bottom + 330 > innerHeight && this.position.indexOf('bottom') > -1) {
      this.position = this.position.replace('bottom', 'top') as any;
      this.cdRef.detectChanges();
    } else if (top - 330 < 0 && this.position.indexOf('top') > -1) {
      this.position = this.position.replace('top', 'bottom') as any;
      this.cdRef.detectChanges();
    }
  }

  clear() {
    this.value = null;
  }
}
