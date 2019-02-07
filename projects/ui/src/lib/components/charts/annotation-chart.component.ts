import { Component, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { GoogleChart } from '../../models';
import { GoogleChartComponent } from '../google-chart/google-chart.component';
import { Store } from '@ngxs/store';
import { ToasterShow } from '../../actions';

declare var google;

@Component({
  selector: 'p-annotation-chart',
  template: `
    <p-google-chart
      #annotationChart
      chartType="AnnotationChart"
      [columns]="annotationChartColumns"
      [rows]="annotationChartRows"
      [options]="annotationChartOptions"
      (ready)="rangeChangeHandler()"
    ></p-google-chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AnnotationChartComponent {
  // https://developers.google.com/chart/interactive/docs/gallery/annotationchart
  annotationChartColumns: GoogleChart.Column[] = [
    { type: 'date', label: 'Date' },
    { type: 'number', label: 'Kepler-22b mission' },
    { type: 'string', label: 'Kepler title' },
    { type: 'string', label: 'Kepler text' },
    { type: 'number', label: 'Gliese 163 mission' },
    { type: 'string', label: 'Gliese title' },
    { type: 'string', label: 'Gliese text' },
  ];

  annotationChartRows: Array<any[]> = [
    [new Date(2314, 2, 15), 12400, undefined, undefined, 10645, undefined, undefined],
    [new Date(2314, 2, 16), 24045, 'Lalibertines', 'First encounter', 12374, undefined, undefined],
    [new Date(2314, 2, 17), 35022, 'Lalibertines', 'They are very tall', 15766, 'Gallantors', 'First Encounter'],
    [
      new Date(2314, 2, 18),
      12284,
      'Lalibertines',
      'Attack on our crew!',
      34334,
      'Gallantors',
      'Statement of shared principles',
    ],
    [new Date(2314, 2, 19), 8476, 'Lalibertines', 'Heavy casualties', 66467, 'Gallantors', 'Mysteries revealed'],
    [new Date(2314, 2, 20), 0, 'Lalibertines', 'All crew lost', 79463, 'Gallantors', 'Omniscience achieved'],
  ];

  annotationChartOptions: GoogleChart.AnnotationOption = {
    displayAnnotations: true,
  };

  @ViewChild('annotationChart') annotationChart: GoogleChartComponent;

  get chart() {
    return this.annotationChart.chart;
  }

  constructor(private store: Store) {}

  rangeChangeHandler() {
    google.visualization.events.addListener(this.chart, 'rangechange', event => {
      console.log('You changed the range to ', event['start'], ' and ', event['end']);
    });
  }

  clearChart() {
    this.chart.clearChart();
  }

  getContainer() {
    console.log(this.chart.getContainer());
    this.showToaster();
  }

  getSelection() {
    console.log(this.chart.getSelection());
    this.showToaster();
  }

  getVisibleChartRange() {
    console.log(this.chart.getVisibleChartRange());
    this.showToaster();
  }

  hideDataColumns(index: number | number[]) {
    this.chart.hideDataColumns(index);
  }

  showDataColumns(index: number | number[]) {
    this.chart.showDataColumns(index);
  }

  setVisibleChartRange(start: Date, end: Date) {
    this.chart.setVisibleChartRange(start, end);
  }

  showToaster() {
    this.store.dispatch(new ToasterShow({ body: 'Check the console' }));
  }
}
