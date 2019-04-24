import { ElementRef, HostListener, Directive, Input } from '@angular/core';

@Directive({
  selector: '[autosize]',
})
export class AutosizeDirective {
  @Input('autosize')
  enabled: boolean = true;

  @HostListener('input')
  onInput(): void {
    if (!this.enabled) return;

    this.element.nativeElement.style.overflow = 'hidden';
    this.element.nativeElement.style.height = 'auto';
    this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + 'px';
  }
  constructor(public element: ElementRef) {}
  ngAfterContentInit(): void {
    this.onInput();
  }
}
