import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Inject,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { Tooltip } from '../../models';

@Component({
  selector: 'p-tooltip',
  host: {
    role: 'tooltip',
  },
  template: `
    <div #container class="{{ classes }}" [ngStyle]="style">
      <div class="tooltip-arrow arrow"></div>
      <div class="tooltip-inner"><ng-content></ng-content></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TooltipComponent implements AfterViewInit {
  get classes(): string {
    return `tooltip bs-tooltip-${this.tooltip.placement} show`;
  }
  style: { [key: string]: string | number } = { position: 'fixed', visibility: 'hidden' };

  @ViewChild('container') container: ElementRef;

  arrowPart: number = 5;

  constructor(@Inject('TOOLTIP_PROVIDER') public tooltip: Tooltip.Config, protected cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.setPosition();
      this.style = { ...this.style, visibility: 'visible' };
      this.cdRef.detectChanges();
    }, 0);
  }

  setPosition() {
    const { left, right, top, bottom, width, height } = this.tooltip.element.getBoundingClientRect();
    const { width: hostWidth, height: hostHeight } = this.container.nativeElement.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;

    switch (this.tooltip.placement) {
      case 'top':
        if (top - hostHeight - this.arrowPart < 0) this.tooltip.placement = 'bottom';
        this.setY(left, top, bottom, width, hostHeight, hostWidth);
        break;
      case 'bottom':
        if (bottom + hostHeight + this.arrowPart > innerHeight) this.tooltip.placement = 'top';
        this.setY(left, top, bottom, width, hostHeight, hostWidth);
        break;
      case 'left':
        if (left - hostWidth - this.arrowPart < 0) this.tooltip.placement = 'right';
        this.setX(left, top, right, height, hostHeight, hostWidth);
        break;
      case 'right':
        if (right + hostWidth + this.arrowPart > innerWidth) this.tooltip.placement = 'left';
        this.setX(left, top, right, height, hostHeight, hostWidth);
        break;
    }
  }

  setY(left: number, top: number, bottom: number, width: number, hostHeight: number, hostWidth: number) {
    this.style.left = left + (width - hostWidth) / 2 + 'px';

    this.tooltip.placement === 'top'
      ? (this.style.top = top - hostHeight - this.arrowPart + 'px')
      : (this.style.top = bottom + this.arrowPart + 'px');
  }

  setX(left: number, top: number, right: number, height: number, hostHeight: number, hostWidth: number) {
    this.style.top = top + (height - hostHeight) / 2 + 'px';

    this.tooltip.placement === 'left'
      ? (this.style.left = left - hostWidth - this.arrowPart + 'px')
      : (this.style.left = right + this.arrowPart + 'px');
  }
}
