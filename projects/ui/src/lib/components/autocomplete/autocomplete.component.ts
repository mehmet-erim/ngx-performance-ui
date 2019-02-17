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
    <div class="autocomplete-container {{ containerClasses }}">
      <label *ngIf="labelText" class="{{ labelClasses }}" [attr.for]="id" [innerHTML]="labelText"></label>
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
        (focus)="onFocus($event)"
        (blur)="onBlur($event)"
        (click)="click.emit($event)"
      ></p-input>
      <div *ngIf="showList" class="list-group">
        <a
          [pHighlight]="inputValue"
          [pHighlightHide]="true"
          *ngFor="let item of items; trackBy: trackByFn"
          class="list-group-item list-group-item-action"
          [class.list-group-item-secondary]="value?.text === item.text"
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
export class AutocompleteComponent extends AbstractInputComponent<AutocompleteItem> {
  @Input() items: AutocompleteItem[] = [];

  @Input() containerClasses: string = '';

  @Input() delay: number = 200;

  @Output() select = new EventEmitter<AutocompleteItem>();

  @ViewChild('input') input: ElementRef;

  autocomplete: string = 'nop';

  showList: boolean = false;

  inputValue: string = '';

  placeholder: string = 'Type in here';

  valueFn: (value: AutocompleteItem, previousValue?: AutocompleteItem) => AutocompleteItem = value => {
    if (!value) return value;

    this.inputValue = value.text;
    return value;
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
      return;
    }

    this.value = undefined;
  }
}
