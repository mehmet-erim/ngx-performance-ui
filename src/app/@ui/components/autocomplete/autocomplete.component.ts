import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  Output,
  TrackByFunction,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { timer } from 'rxjs';
import { takeUntilDestroy } from '../../../@core/utils';
import { InputComponent } from '../input/input.component';

export interface AutocompleteItem {
  text: string;
  value: any;
}

@Component({
  selector: 'p-autocomplete',
  template: `
    <div class="autocomplete-container">
      <div *ngIf="showDropdown" class="list-group">
        <a
          [pHighlight]="inputValue"
          [pHighlightHide]="true"
          *ngFor="let item of items; trackBy: trackByFn"
          class="list-group-item list-group-item-action"
          [class.active]="value === item.text"
          (click)="onSelect(item)"
        >
          {{ item.text }}
        </a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent extends InputComponent {
  @Input() items: AutocompleteItem[] = [];

  @Input() delay: number = 150;

  @Output() select = new EventEmitter<AutocompleteItem>();

  @ViewChild('input') input: ElementRef;

  autocomplete: string = 'nop';

  showDropdown: boolean = false;

  valueFn: (
    value: string | AutocompleteItem,
    previousValue?: string | AutocompleteItem,
  ) => string | AutocompleteItem = value => {
    if (typeof value === 'string') {
      return this.items.find(item => item.text === value) || value;
    }

    return value;
  };

  valueLimitFn: (value: string | AutocompleteItem) => boolean = value => {
    if (typeof value !== 'string') return false;

    if (this.items.find(item => item.text === value)) return true;
    return false;
  };

  trackByFn: TrackByFunction<AutocompleteItem> = (index, value) => value.text;

  get inputValue(): string {
    return (this.input.nativeElement as HTMLInputElement).value;
  }

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnDestroy(): void {}

  onBlur(event: FocusEvent) {
    timer(this.delay)
      .pipe(takeUntilDestroy(this))
      .subscribe(() => {
        this.showDropdown = false;
        this.cdRef.detectChanges();
      });
    this.blur.emit(event);
  }

  onFocus(event: FocusEvent) {
    timer(this.delay)
      .pipe(takeUntilDestroy(this))
      .subscribe(() => {
        this.showDropdown = true;
        this.cdRef.detectChanges();
      });
    this.focus.emit(event);
  }

  onSelect(item: AutocompleteItem) {
    this.value = item;
    this.select.emit(item);
  }
}
