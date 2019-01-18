import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, SimpleChanges, forwardRef } from '@angular/core';
import { AbstractNgModelComponent } from 'shared/abstracts/ng-model.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'p-pagination',
  templateUrl: './pagination.component.html',
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
  paginationRange: number = 7;

  @Input()
  totalPages: number = 15;

  @Input()
  previousLabel: string = 'Previous';

  @Input()
  nextLabel: string = 'Next';

  @Input()
  ngModel: number;

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
          halfWay > i
            ? i
            : this.paginationRange - halfWay < i
            ? this.totalPages - (this.paginationRange - i)
            : this.value - halfWay + i - 1,
        label: halfWay === i || this.paginationRange - halfWay + 1 === i ? '...' : null,
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
