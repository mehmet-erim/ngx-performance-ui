import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[pAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  @Input('pAutoFocus')
  enable: boolean = false;

  @Input('pAutoFocusDelay')
  delay: number = 0;

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.enable) setTimeout(() => this.elRef.nativeElement.focus(), this.delay);
  }
}
