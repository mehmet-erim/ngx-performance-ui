import { Directive, Input, ElementRef, HostBinding, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[pEllipsis]',
})
export class EllipsisDirective implements AfterViewInit {
  @Input() pEllipsis: string;

  @HostBinding('style.max-width')
  get maxWidth(): string {
    return this.pEllipsis || '100%';
  }

  @HostBinding('title')
  @Input()
  title: string;

  @HostBinding('class.p-ellipsis')
  @Input()
  pEllipsisEnabled: boolean = true;

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.title = this.title || (this.elRef.nativeElement as HTMLElement).innerText;
    }, 0);
  }
}
