import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { LazyLoadScriptService } from '../../../@core/services/lazy-load-script.service';

declare var google;

@Component({
  selector: 'p-google-chart',
  template: `
    <div #chartContainer style="width: 100%; height: 500px;"></div>
  `,
})
export class GoogleChartComponent implements AfterViewInit {
  @Input()
  drawFn = _ => {
    const data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['2013', 1000, 400],
      ['2014', 1170, 460],
      ['2015', 660, 1120],
      ['2016', 1030, 540],
    ]);

    const options = {
      title: 'Company Performance',
      hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
      vAxis: { minValue: 0 },
    };

    const chart = new google.visualization.AreaChart(this.chartContainer.nativeElement);
    chart.draw(data, options);
  };

  @ViewChild('chartContainer') chartContainer: ElementRef;

  constructor(private lazyLoadScriptService: LazyLoadScriptService) {}

  ngAfterViewInit() {
    this.lazyLoadScriptService
      .loadScript('https://www.gstatic.com/charts/loader.js')
      .pipe(take(1))
      .subscribe(_ => {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(this.drawFn);
      });
  }
}
