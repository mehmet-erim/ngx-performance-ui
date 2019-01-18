import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { AbstractNgModelComponent } from 'shared/abstracts/ng-model.component';

@Component({
  selector: 'p-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent extends AbstractNgModelComponent {
  @Input()
  paginationRange: number = 7;

  @Input()
  totalPages: number = 7;

  get pageArray(): Array<{ value: number; label?: string }> {
    if (this.paginationRange >= this.totalPages) {
      return Array.apply(null, { length: this.totalPages }).map((_, index) => ({ value: index + 1 }));
    }

    const halfWay = Math.floor(this.paginationRange / 2);
  }

  ngOnInit() {
    console.log(this.pageArray);
  }
}
