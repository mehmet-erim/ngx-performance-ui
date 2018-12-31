import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Select } from '@ngxs/store';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { filter, skip, take, takeUntil } from 'rxjs/operators';
import { EventListenerState } from '../../../store/states';

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
      this.listen();
    } else {
      this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
      });
    }
  }

  @Input() centered: boolean = true;

  @Input() modalClass: string = '';

  @Input() size: ModalSize = 'md';

  @Output() visibleChange = new EventEmitter<boolean>();

  @Select(EventListenerState.getClick)
  click$: Observable<MouseEvent>;

  @ContentChild('mnHeader') mnHeader: TemplateRef<any>;

  @ContentChild('mnBody') mnBody: TemplateRef<any>;

  @ContentChild('mnFooter') mnFooter: TemplateRef<any>;

  @ViewChild('mnModalContent') modalContent: ElementRef;

  destroy$ = new Subject<boolean>();

  _visible: boolean = false;

  subscriptions: Subscription[] = [];

  protected cdRef: ChangeDetectorRef;

  constructor(public injector: Injector) {
    this.cdRef = injector.get(ChangeDetectorRef);
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  listen() {
    this.subscriptions[0] = fromEvent(document, 'keyup')
      .pipe(
        filter((key: KeyboardEvent) => key.code === 'Escape'),
        take(1),
        takeUntil(this.destroy$),
      )
      .subscribe(_ => {
        this.visible = false;
      });

    this.subscriptions[1] = this.click$
      .pipe(
        filter(event => !!event && !!event.type),
        skip(1),
        takeUntil(this.destroy$),
      )
      .subscribe(event => {
        if (this.modalContent && !this.modalContent.nativeElement.contains(event.target)) {
          this.visible = false;
        }
      });
  }
}
