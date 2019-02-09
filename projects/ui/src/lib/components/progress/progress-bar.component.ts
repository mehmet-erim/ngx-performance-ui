import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoaderState } from '../../../../../core/src/lib/states';
import { takeUntilDestroy } from '../../../../../core/src/lib/utils';

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

  speed: number = 30;

  height: string = '10px';

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.show$.pipe(takeUntilDestroy(this)).subscribe(status => {
      if (status === true) {
        if (this.show) {
          setTimeout(() => {
            this.showFn();
          }, 900);
          return;
        }
        this.showFn();
        return;
      }

      this.value = 100;
      this.cdRef.detectChanges();

      setTimeout(() => {
        clearInterval(this.interval);
        this.show = false;
        this.cdRef.detectChanges();
      }, 800);
    });
  }

  showFn() {
    this.value = 0;
    this.show = true;
    this.cdRef.detectChanges();

    this.setValue();
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
