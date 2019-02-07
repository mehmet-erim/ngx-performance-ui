import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { Select } from '@ngxs/store';
import { LoaderState } from '@core/states/loader.state';
import { Observable } from 'rxjs';
import { takeUntilDestroy } from '../../../@core/utils';

@Component({
  selector: 'p-progress-bar',
  template: `
    <div *ngIf="show" class="progress">
      <div
        [ngStyle]="{ width: value + '%' }"
        class="progress-bar progress-bar-striped bg-danger"
        role="progressbar"
      ></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProgressBarComponent implements OnInit {
  @Select(LoaderState.progress)
  show$: Observable<boolean>;

  show: boolean;

  value: number;

  interval;

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
      }, 700);
    });
  }

  setValue() {
    this.interval = setInterval(() => {
      const plus = Math.random() * 20;
      if (this.value < 100 - plus) {
        this.value += plus;
        this.cdRef.detectChanges();
      }
    }, 500);
  }

  ngOnDestroy(): void {}
}
