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
  Renderer2,
} from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, filter, take, takeUntil } from 'rxjs/operators';
import { takeUntilDestroy } from '@core/utils';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'mn-modal',
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
      setTimeout(() => {
        this.listen();
      }, 0);
    } else {
      this.renderer.addClass(this.modalContent.nativeElement, 'fade-out-top');
      setTimeout(() => {
        this.setVisible(value);
        this.subscriptions.forEach(subscription => {
          subscription.unsubscribe();
        });
        this.renderer.removeClass(this.modalContent.nativeElement, 'fade-out-top');
      }, 450);
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

  _visible: boolean = false;

  subscriptions: Subscription[] = [];

  protected cdRef: ChangeDetectorRef;

  constructor(public injector: Injector, private renderer: Renderer2) {
    this.cdRef = injector.get(ChangeDetectorRef);
  }

  ngOnDestroy(): void {}

  setVisible(value: boolean) {
    this._visible = value;
    this.visibleChange.emit(value);
  }

  listen() {
    this.subscriptions[0] = fromEvent(document, 'keyup')
      .pipe(
        filter((key: KeyboardEvent) => key.code === 'Escape'),
        debounceTime(300),
        take(1),
        takeUntilDestroy(this),
      )
      .subscribe(_ => {
        this.visible = false;
      });

    this.subscriptions[1] = fromEvent(document, 'click')
      .pipe(
        filter((event: MouseEvent) => event.type === 'click'),
        debounceTime(300),
        takeUntilDestroy(this),
      )
      .subscribe(event => {
        if (this.modalContent && !this.modalContent.nativeElement.contains(event.target)) {
          this.visible = false;
        }
      });
  }
}
