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
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subject, timer } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { EventListenerState } from 'store/states';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'p-modal',
  templateUrl: './modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnDestroy {
  @Input()
  get visible(): boolean {
    return this._visible;
  }
  set visible(value: boolean) {
    if (value) {
      this.setVisible(value);
      this.listen();
    } else {
      this.closable = false;
      this.renderer.addClass(this.modalContent.nativeElement, 'fade-out-top');
      setTimeout(() => {
        this.setVisible(value);
        this.renderer.removeClass(this.modalContent.nativeElement, 'fade-out-top');
        this.ngOnDestroy();
      }, 400);
    }
  }

  @Input() centered: boolean = true;

  @Input() modalClass: string = '';

  @Input() size: ModalSize = 'md';

  @Output() visibleChange = new EventEmitter<boolean>();

  @ContentChild('mnHeader') mnHeader: TemplateRef<any>;

  @ContentChild('mnBody') mnBody: TemplateRef<any>;

  @ContentChild('mnFooter') mnFooter: TemplateRef<any>;

  @ViewChild('mnModalContent') modalContent: ElementRef;

  @Select(EventListenerState.getOne('click'))
  click$: Observable<Event>;

  @Select(EventListenerState.getOne('keyup'))
  keyup$: Observable<KeyboardEvent>;

  _visible: boolean = false;

  closable: boolean = false;

  protected cdRef: ChangeDetectorRef;

  destroy$ = new Subject<void>();

  constructor(public injector: Injector, private renderer: Renderer2) {
    this.cdRef = injector.get(ChangeDetectorRef);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  setVisible(value: boolean) {
    this._visible = value;
    this.visibleChange.emit(value);
    value
      ? timer(500)
          .pipe(take(1))
          .subscribe(_ => (this.closable = true))
      : (this.closable = false);
  }

  listen() {
    this.click$
      .pipe(
        takeUntil(this.destroy$),
        filter(
          (event: MouseEvent) =>
            event && this.closable && this.modalContent && !this.modalContent.nativeElement.contains(event.target),
        ),
      )
      .subscribe(_ => {
        this.visible = false;
      });

    this.keyup$
      .pipe(
        takeUntil(this.destroy$),
        filter((key: KeyboardEvent) => key && key.code === 'Escape' && this.closable),
      )
      .subscribe(_ => {
        this.visible = false;
      });
  }
}
