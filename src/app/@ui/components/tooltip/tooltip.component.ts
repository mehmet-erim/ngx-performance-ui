import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'p-tooltip',
  host: {
    '[class]': '"tooltip in tooltip-" + placement + " bs-tooltip-" + placement + " " + placement + " show"',
    '[style]': '"top:" + style.top + ";left:" + style.left',
    role: 'tooltip',
  },
  template: `
    <div class="tooltip-arrow arrow"></div>
    <div class="tooltip-inner"><ng-content></ng-content></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TooltipComponent {
  placement: 'top' | 'left' | 'right' | 'bottom' = 'top';

  style: { top: string; left: string };
}
