import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { takeUntilDestroy } from '@core/utils';
import { LayoutScroll } from 'store/actions';

@Component({
  selector: 'p-layout-primary',
  templateUrl: './layout-primary.component.html',
})
export class LayoutPrimaryComponent implements OnDestroy {
  @ViewChild(PerfectScrollbarComponent) public pScrollbarRef: PerfectScrollbarComponent;

  @ViewChild('header') header: ElementRef;

  get contentMaxHeight(): string {
    return `calc(100vh - ${this.header.nativeElement.offsetHeight}px)`;
  }

  constructor(private actions: Actions) {
    actions
      .pipe(
        takeUntilDestroy(this),
        ofActionDispatched(LayoutScroll),
      )
      .subscribe(({ payload }) =>
        payload === 'bottom'
          ? this.pScrollbarRef.directiveRef.scrollToBottom()
          : this.pScrollbarRef.directiveRef.scrollToTop(),
      );
  }

  ngOnDestroy() {}
}
