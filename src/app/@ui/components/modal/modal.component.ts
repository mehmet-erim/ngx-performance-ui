import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'mn-modal',
  templateUrl: './modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input()
  get visible(): boolean {
    return this._visible;
  }
  set visible(val: boolean) {
    this._visible = val;
    this.visibleChange.emit(val);

    if (val) {
      fromEvent(document, 'keyup')
        .pipe(
          take(1),
          takeUntil(this.destroy$),
        )
        .subscribe(_ => {
          this.visible = false;
        });
    }
  }

  @Input() centered: boolean = true;

  @Input() modalClass: string = '';

  @Input() size: ModalSize = 'md';

  @Output() visibleChange = new EventEmitter<boolean>();

  @ContentChild('mnHeader') mnHeader: TemplateRef<any>;

  @ContentChild('mnBody') mnBody: TemplateRef<any>;

  @ContentChild('mnFooter') mnFooter: TemplateRef<any>;

  destroy$ = new Subject<boolean>();

  _visible: boolean = false;

  protected cdRef: ChangeDetectorRef;

  constructor(public injector: Injector) {
    this.cdRef = injector.get(ChangeDetectorRef);
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
