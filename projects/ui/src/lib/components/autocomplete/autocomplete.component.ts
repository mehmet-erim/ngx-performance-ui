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
import { AbstractInputComponent } from '../../abstracts';
import { takeUntilDestroy } from '../../../../../core/src/lib/utils';

export interface AutocompleteItem {
  text: string;
  value: any;
}

@Component({
  selector: 'p-autocomplete',
  template: `
    <div class="autocomplete-container">
      <p-input
        [(ngModel)]="inputValue"
        (ngModelChange)="onChangeInputValue($event)"
        class="w-100 {{ classes }}"
        [id]="id"
        [type]="type"
        [placeholder]="placeholder"
        [hidden]="hidden"
        [name]="name"
        [disabled]="disabled"
        [attr.tabindex]="tabindex"
        [required]="required"
        [autofocus]="autofocus"
        [autofocusDelay]="autofocusDelay"
        autocomplete="nop"
        (focus)="onFocus()"
        (blur)="onBlur()"
        (click)="click.emit($event)"
      ></p-input>
      <div *ngIf="showList" class="list-group">
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
export class AutocompleteComponent extends AbstractInputComponent {
  @Input() items: AutocompleteItem[] = [];

  @Input() delay: number = 150;

  @Output() select = new EventEmitter<AutocompleteItem>();

  @ViewChild('input') input: ElementRef;

  autocomplete: string = 'nop';

  showList: boolean = false;

  inputValue: string = '';

  placeholder: string = 'Type in here';

  valueFn: (value: AutocompleteItem, previousValue?: AutocompleteItem) => AutocompleteItem = value => {
    this.inputValue = value.text;
    return value;
  };

  valueLimitFn: (value: AutocompleteItem) => boolean = value => {
    if (typeof value !== 'string') return false;

    if (this.items.find(item => item.text === value)) return true;
    return false;
  };

  trackByFn: TrackByFunction<AutocompleteItem> = (_, value) => value.text;

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnDestroy(): void {}

  onBlur(event: FocusEvent) {
    timer(this.delay)
      .pipe(takeUntilDestroy(this))
      .subscribe(() => {
        this.showList = false;
        this.cdRef.detectChanges();
      });
    this.blur.emit(event);
  }

  onFocus(event: FocusEvent) {
    timer(this.delay)
      .pipe(takeUntilDestroy(this))
      .subscribe(() => {
        this.showList = true;
        this.cdRef.detectChanges();
      });
    this.focus.emit(event);
  }

  onSelect(item: AutocompleteItem) {
    this.value = item;
    this.select.emit(item);
  }

  onChangeInputValue(value: string) {
    const found = this.items.find(item => item.text.toLocaleLowerCase() === value.toLocaleLowerCase());
    if (found) {
      this.value = found;
      this.inputValue = found.text;
    }
  }
}
