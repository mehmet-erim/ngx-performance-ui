import { Directive, Input, OnChanges, ElementRef } from '@angular/core';
import { normalizeDiacritics } from '../utils';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[pHighlight]',
})
export class HighlightDirective implements OnChanges {
  private value: string = '';

  @Input()
  set pHighlight(value: string) {
    if (!value && value !== '') return;

    this.value = normalizeDiacritics(value.replace(/\s+/gm, ' '));
  }

  @Input('pHighlightClass') class: string = 'text-primary';

  @Input('pHighlightHideC') hide: boolean = false;

  @Input('pHighlightHideClass') hideClass: string = 'd-none';

  constructor(private elRef: ElementRef) {}

  private setHighlight(text: string) {
    if (!this.value || this.value === '' || this.value === ' ') return text;

    text = normalizeDiacritics(text.replace(/\s+/gm, ' '));

    const splitText = text.split(' ').filter(value => value !== '');
    const splitValue = this.value.split(' ').filter(value => value !== '');
    let found: { index: number; text: string; value: string }[] = [];

    splitValue.forEach(value => {
      found = [
        ...found,
        ...splitText.map((text, index) => ({ text, index, value })).filter(({ text }) => text.indexOf(value) > -1),
      ];
    });

    if (!found.length) return text;

    return splitText.reduce((acc, val, index) => {
      const { value } = found.find(data => data.index === index) || ({} as any);
      if (value) {
        val = val.replace(RegExp(value, 'mig'), `<span class="${this.class}">${value}</span>`);
      }
      return (acc += `${val} `);
    }, '');
  }

  ngOnChanges() {
    setTimeout(() => {
      const element = this.elRef.nativeElement as HTMLElement;
      const text = element.textContent;

      if (text) {
        const matched = this.setHighlight(text);
        if (matched) element.innerHTML = matched;
      }
    }, 0);
  }
}
