import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { LoaderState } from '@core/states/loader.state';
import { Observable } from 'rxjs';
import { takeUntilDestroy } from '../../../@core/utils';

@Component({
  selector: 'p-progress-bar',
  template: `
    <div *ngIf="show" class="progress" [style.height]="height">
      <div [ngStyle]="{ width: value + '%' }" class="{{ classes }}"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProgressBarComponent implements OnInit {
  @Input()
  classes: string = 'progress-bar bg-danger';

  @Select(LoaderState.progress)
  show$: Observable<boolean>;

  show: boolean;

  value: number;

  interval;

  speed: number = 15;

  height: string = '10px';

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.show$.pipe(takeUntilDestroy(this)).subscribe(status => {
      if (status) {
        this.show = true;
        this.cdRef.detectChanges();

        this.setValue();
        return;
      }

      this.value = 100;
      this.cdRef.detectChanges();

      setTimeout(() => {
        clearInterval(this.interval);
        this.value = 0;
        this.show = false;
        this.cdRef.detectChanges();
      }, 1000);
    });
  }

  setValue() {
    this.interval = setInterval(() => {
      const plus = Math.random() * this.speed;
      if (this.value < 100 - plus) {
        this.value += plus;
      } else {
        this.value += 0.1;
      }
      this.cdRef.detectChanges();
    }, 500);
  }

  ngOnDestroy(): void {}
}
