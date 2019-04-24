import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { take } from 'rxjs/operators';
import { GoogleChart } from '../../models';
import { LazyLoadScriptService } from '@ngx-performance-ui/core';

declare var google;

// https://developers.google.com/chart/interactive/docs/
@Component({
  selector: 'p-google-chart',
  template: `
    <div #chartContainer class="{{ containerClasses }}" [ngStyle]="style"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GoogleChartComponent implements AfterViewInit {
  @Input()
  chartType: 'AnnotationChart' | 'AreaChart' = 'AreaChart';

  @Input()
  dataTable: any[];

  @Input()
  columns: GoogleChart.Column[];

  @Input()
  rows: Array<any[]>;

  @Input()
  options: GoogleChart.AnnotationOption;

  @Input()
  style: { [key: string]: string | number } = { width: '100%', height: 'auto' };

  @Input()
  containerClasses: string = '';

  @Input()
  drawFn = _ => {
    if (this.dataTable && this.dataTable.length) {
      this.data = google.visualization.arrayToDataTable(this.dataTable);
    } else if (this.columns && this.columns.length && this.rows && this.rows.length) {
      this.data = new google.visualization.DataTable();
      this.columns.forEach(column => this.data.addColumn(column.type, column.label));
      this.data.addRows(this.rows);
    } else {
      console.error('Must set datatable or columns and rows inputs');
      return;
    }

    this.chart = new google.visualization[this.chartType](this.chartContainer.nativeElement);
    this.chart.draw(this.data, this.options);

    this.ready.emit();
  };

  @Output()
  ready = new EventEmitter<void>();

  @ViewChild('chartContainer') chartContainer: ElementRef;

  public chart: any;

  public data: any;

  get packages(): string[] {
    if (this.chartType === 'AnnotationChart') return [this.chartType.toLowerCase()];

    return ['corechart'];
  }

  constructor(private lazyLoadScriptService: LazyLoadScriptService) {}

  ngAfterViewInit() {
    this.lazyLoadScriptService
      .loadScript('https://www.gstatic.com/charts/loader.js')
      .pipe(take(1))
      .subscribe(_ => {
        google.charts.load('current', { packages: this.packages });
        google.charts.setOnLoadCallback(this.drawFn);
      });
  }
}
