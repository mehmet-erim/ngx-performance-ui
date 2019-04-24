import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  forwardRef,
  Input,
  TrackByFunction,
  Injector,
} from '@angular/core';
import { AbstractNgModelComponent } from '@ngx-performance-ui/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import compare from 'just-compare';

export interface ListboxItem {
  text: string;
  value?: any;
  classes?: string;
}

@Component({
  selector: 'p-listbox',
  template: `
    <div class="card">
      <div class="card-header">
        <div class="col-12 px-0">
          <h5>{{ title }}</h5>
        </div>
        <div *ngIf="isFilterShow" class="col-12 px-0 mt-2">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text"><fa-icon [icon]="['fas', 'search']"></fa-icon></span>
            </div>
            <p-input
              [(ngModel)]="filterValue"
              [attr.placeholder]="filterPlaceholder"
              classes="bg-transparent"
              class="w-75"
            ></p-input>
          </div>
        </div>
      </div>
      <ul class="list-group  list-group-flush {{ classes }}">
        <li
          *pFor="
            let item of items;
            filterValue: filterValue;
            filterContain: true;
            filterKey: 'text';
            trackBy: trackByFn
          "
          [ngClass]="[isActive(item) ? activeClass : '']"
          (click)="onClick(item)"
          style="cursor: pointer"
          class="list-group-item {{ item.classes }}"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListboxComponent),
      multi: true,
    },
  ],
})
export class ListboxComponent extends AbstractNgModelComponent<ListboxItem | ListboxItem[]> {
  @Input()
  items: ListboxItem[] = [];

  @Input() classes: string = '';

  @Input() activeClass: string = 'active';

  @Input() title: string = '';

  @Input() isFilterShow: boolean = true;

  @Input() filterPlaceholder: string = '';

  @Input() multiple: boolean = false;

  filterValue: string = '';

  trackByFn: TrackByFunction<ListboxItem> = (index, item) => item.text || index;

  constructor(public injector: Injector) {
    super(injector);
  }

  onClick(item: ListboxItem) {
    if (!this.multiple) {
      compare(this.value, item) ? (this.value = {} as ListboxItem) : (this.value = item);
      return;
    }

    if (!this.value || !Array.isArray(this.value) || !this.value.length) this.value = [];

    const index = this.value.findIndex(val => compare(val, item));
    if (index > -1) {
      this.value = [...this.value.slice(0, index), ...this.value.slice(index + 1)];
    } else {
      const cloneItem = { ...item };
      delete cloneItem.classes;
      this.value = [...this.value, cloneItem];
    }
    this.cdRef.detectChanges();
  }

  isActive(item: ListboxItem) {
    if (!this.multiple) {
      return compare(this.value, item);
    }

    if (!this.value || !(this.value as ListboxItem[]).length) return;
    const cloneItem = { ...item };
    delete cloneItem.classes;
    return (this.value as ListboxItem[]).findIndex(val => compare(val, cloneItem)) > -1;
  }
}
