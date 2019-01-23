import { ChangeDetectorRef, Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { Tooltip } from '../../models';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'p-popover',
  template: `
    <div #container [ngStyle]="style" class="{{ classes }}">
      <div [ngStyle]="arrowStyle" class="arrow"></div>
      <h3 class="popover-header"><ng-content></ng-content></h3>
      <div class="popover-body"><ng-content></ng-content></div>
    </div>
  `,
})
export class PopoverComponent extends TooltipComponent {
  arrowStyle: { [key: string]: string | number } = {};

  get classes(): string {
    return `popover fade bs-popover-${this.popover.placement} show`;
  }

  arrowPart: number = 10;

  constructor(@Inject('POPOVER_PROVIDER') public popover: Tooltip.Config, protected cdRef: ChangeDetectorRef) {
    super(popover, cdRef);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setPosition();
      this.style = { ...this.style, visibility: 'visible' };
      this.cdRef.detectChanges();
    }, 0);
  }

  setPosition() {
    const { left, right, top, bottom, width, height } = this.popover.element.getBoundingClientRect();
    const { width: hostWidth, height: hostHeight } = this.container.nativeElement.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;

    switch (this.popover.placement) {
      case 'top':
        if (top - hostHeight - this.arrowPart < 0) this.popover.placement = 'bottom';
        this.setY(left, top, bottom, width, hostHeight, hostWidth);
        this.arrowStyle.left = hostWidth / 2 - 12 + 'px';
        break;
      case 'bottom':
        if (bottom + hostHeight + this.arrowPart > innerHeight) this.popover.placement = 'top';
        this.setY(left, top, bottom, width, hostHeight, hostWidth);
        this.arrowStyle.left = hostWidth / 2 - 12 + 'px';
        break;
      case 'left':
        if (left - hostWidth - this.arrowPart < 0) this.popover.placement = 'right';
        this.setX(left, top, right, height, hostHeight, hostWidth);
        this.arrowStyle.top = hostHeight / 2 - 12 + 'px';
        break;
      case 'right':
        if (right + hostWidth + this.arrowPart > innerWidth) this.popover.placement = 'left';
        this.setX(left, top, right, height, hostHeight, hostWidth);
        this.arrowStyle.top = hostHeight / 2 - 12 + 'px';
        break;
    }
  }
}
