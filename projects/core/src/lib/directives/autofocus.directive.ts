import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[autofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  @Input('autofocus')
  enable: boolean = false;

  @Input('autofocusDelay')
  delay: number = 0;

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.enable) setTimeout(() => this.elRef.nativeElement.focus(), this.delay);
  }
}
