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
    <div #container style="position: fixed" class="{{ classes }}" [ngStyle]="style">
      <div class="tooltip-arrow arrow"></div>
      <div class="tooltip-inner"><ng-content></ng-content></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TooltipComponent implements AfterViewInit {
  get classes(): string {
    return (
      'tooltip in tooltip-' +
      this.tooltip.placement +
      ' bs-tooltip-' +
      this.tooltip.placement +
      ' ' +
      this.tooltip.placement +
      ' show'
    );
  }
  style: { [key: string]: string | number } = {};

  @ViewChild('container') container: ElementRef;

  constructor(@Inject('TOOLTIP_PROVIDER') public tooltip: Tooltip.Config, private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.setPosition();
      this.cdRef.detectChanges();
    }, 0);
  }

  setPosition() {
    const { left, right, top, bottom, width, height } = this.tooltip.element.getBoundingClientRect();
    const { width: hostWidth, height: hostHeight } = this.container.nativeElement.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;

    switch (this.tooltip.placement) {
      case 'top':
        if (top - hostHeight - 5 < 0) this.tooltip.placement = 'bottom';
        this.setY(left, top, bottom, width, hostHeight, hostWidth);
        break;
      case 'bottom':
        if (bottom + hostHeight + 5 > innerHeight) this.tooltip.placement = 'top';
        this.setY(left, top, bottom, width, hostHeight, hostWidth);
        break;
      case 'left':
        if (left - hostWidth - 5 < 0) this.tooltip.placement = 'right';
        this.setX(left, top, right, height, hostHeight, hostWidth);
        break;
      case 'right':
        if (right + hostWidth + 5 > innerWidth) this.tooltip.placement = 'left';
        this.setX(left, top, right, height, hostHeight, hostWidth);
        break;
    }
  }

  setY(left: number, top: number, bottom: number, width: number, hostHeight: number, hostWidth: number) {
    this.style.left = left + (width - hostWidth) / 2 + 'px';

    this.tooltip.placement === 'top'
      ? (this.style.top = top - hostHeight - 5 + 'px')
      : (this.style.top = bottom + 5 + 'px');
  }

  setX(left: number, top: number, right: number, height: number, hostHeight: number, hostWidth: number) {
    this.style.top = top + (height - hostHeight) / 2 + 'px';

    this.tooltip.placement === 'left'
      ? (this.style.left = left - hostWidth - 5 + 'px')
      : (this.style.left = right + 5 + 'px');
  }
}
