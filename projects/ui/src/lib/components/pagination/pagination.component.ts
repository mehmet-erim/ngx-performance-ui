import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, SimpleChanges, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractNgModelComponent } from '@ngx-performance-ui/core';

@Component({
  selector: 'p-pagination',
  template: `
    <ul class="pagination pagination-{{ size }} justify-content-{{ alignment }}">
      <li [class.disabled]="value === 1" (click)="change(value - 1)" class="page-item">
        <span class="page-link">{{ previousLabel }}</span>
      </li>
      <li
        *ngFor="let page of pages"
        [class.active]="page.value === value"
        (click)="change(page.value)"
        class="page-item"
      >
        <span class="page-link">{{ page.label || page.value }}</span>
      </li>
      <li [class.disabled]="value === totalPages" (click)="change(value + 1)" class="page-item">
        <span class="page-link">{{ nextLabel }}</span>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaginationComponent),
      multi: true,
    },
  ],
})
export class PaginationComponent extends AbstractNgModelComponent<number> {
  @Input()
  alignment: 'start' | 'center' | 'end' = 'start';

  @Input()
  classes: string = '';

  @Input()
  paginationRange: 5 | 7 | 9 | 11 = 7;

  @Input()
  totalPages: number = 15;

  @Input()
  previousLabel: string = 'Previous';

  @Input()
  nextLabel: string = 'Next';

  @Input()
  size: 'sm' | 'md' | 'lg' = 'sm';

  get pages(): Array<{ value: number; label?: string }> {
    if (this.paginationRange >= this.totalPages) {
      return Array.apply(null, { length: this.totalPages }).map((_, index) => ({ value: index + 1 }));
    }

    const halfWay = Math.floor(this.paginationRange / 2);

    const isStart = this.value <= halfWay;
    const isEnd = this.totalPages - this.value < halfWay;

    return Array.apply(null, { length: this.paginationRange }).map((_, index) => {
      const i = index + 1;

      if (isStart) {
        return {
          value: halfWay + 2 >= i ? i : this.totalPages - (this.paginationRange - i),
          label: halfWay + 2 === i ? '...' : null,
        };
      }

      if (isEnd) {
        return {
          value: this.paginationRange - halfWay - 2 < i ? this.totalPages - (this.paginationRange - i) : i,
          label: halfWay === i ? '...' : null,
        };
      }

      return {
        value:
          i === 1
            ? 1
            : i === this.paginationRange
            ? this.totalPages
            : this.value + (halfWay - this.paginationRange + i),
        label: 2 === i || this.paginationRange - 1 === i ? '...' : null,
      };
    });
  }

  ngOnChanges({ ngModel }: SimpleChanges): void {
    if (!ngModel) return;

    if (!ngModel.currentValue) setTimeout(_ => (this.value = 1), 0);

    if (ngModel.currentValue > this.totalPages || ngModel.currentValue < 1)
      setTimeout(_ => (this.value = ngModel.previousValue), 0);
  }

  change(value: number) {
    if (value < 1 || value > this.totalPages) return;
    this.value = value;
  }
}
