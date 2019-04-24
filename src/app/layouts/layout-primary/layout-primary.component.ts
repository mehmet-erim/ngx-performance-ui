import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { takeUntilDestroy } from '../../../../projects/core/src/lib/utils';
import { LayoutScroll } from '../../../../projects/ui/src/lib/actions';

@Component({
  selector: 'p-layout-primary',
  templateUrl: './layout-primary.component.html',
  styles: [
    `
      html,
      body {
        overflow-y: hidden;
      }
    `,
  ],
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
