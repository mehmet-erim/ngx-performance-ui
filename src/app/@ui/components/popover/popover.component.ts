import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'p-popover',
  template: `
    <div
      class="popover fade bs-popover-right show"
      style="will-change: transform; position: absolute; transform: translate3d(523px, 1820px, 0px); top: 0px; left: 0px;"
      x-placement="right"
    >
      <div class="arrow" style="top: 34px;"></div>
      <h3 class="popover-header">Popover title</h3>
      <div class="popover-body">And here's some amazing content. It's very engaging. Right?</div>
    </div>
  `,
})
export class PopoverComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
