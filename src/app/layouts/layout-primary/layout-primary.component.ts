import { Component, ViewChild, ElementRef } from '@angular/core';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'p-layout-primary',
  templateUrl: './layout-primary.component.html',
})
export class LayoutPrimaryComponent {
  @ViewChild(PerfectScrollbarComponent) public pScrollbarRef: PerfectScrollbarComponent;
  @ViewChild('header') header: ElementRef;
  get contentMaxHeight(): string {
    return `calc(100vh - ${this.header.nativeElement.offsetHeight}px)`;
  }
}
