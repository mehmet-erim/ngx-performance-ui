import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'p-charts',
  template: `
    <p-google-chart></p-google-chart>
  `,
})
export class ChartsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
