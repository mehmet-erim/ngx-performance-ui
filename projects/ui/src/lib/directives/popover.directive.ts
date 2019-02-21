import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ReflectiveInjector,
  Renderer2,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PopoverComponent } from '../components';
import { Tooltip } from '../models';
import { createProjectableNode } from '../utils';
import { EventListenerState } from '../../../../core/src/lib/states';
import { takeUntilDestroy, takeUntilNotNull } from '../../../../core/src/lib/utils';
import { EventListenerRemove, EventListenerAdd, EventListenerScrollVertical } from '../../../../core/src/public_api';

@Directive({
  selector: '[pPopover]',
  exportAs: 'pPopover',
})
export class PopoverDirective implements OnInit, OnDestroy {
  @Input('pPopover')
  content: string | TemplateRef<any> | Type<any>;

  @Input('pPopoverContext')
  context: any = {};

  @Input('pPopoverHeader')
  header: string | TemplateRef<any> | Type<any>;

  @Input('pPopoverPlacement')
  placement: 'top' | 'left' | 'right' | 'bottom' = 'top';

  @Input('pPopoverTrigger')
  trigger: 'mousemove' | 'click' = 'click';

  @Select(EventListenerState.getOne('mousemove'))
  mousemove$: Observable<MouseEvent>;

  @Select(EventListenerState.getOne('click'))
  click$: Observable<MouseEvent>;

  @Select(EventListenerState.getOne('resize'))
  resize$: Observable<MouseEvent>;

  private popover: ComponentRef<PopoverComponent>;

  private destroy$ = new Subject<void>();

  get containerRect(): ClientRect {
    return ((this.popover.location.nativeElement as HTMLElement).childNodes[0] as HTMLElement).getBoundingClientRect();
  }

  constructor(
    private actions: Actions,
    private appRef: ApplicationRef,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver,
    private store: Store,
    private vcRef: ViewContainerRef,
  ) {}

  ngOnInit() {
    (this.trigger === 'mousemove' ? this.mousemove$ : this.click$)
      .pipe(
        takeUntilDestroy(this),
        filter(event => !!event),
      )
      .subscribe(event => {
        let onMouseContainerOver = false;
        if (this.popover) {
          this.popover.hostView.detectChanges();
          const { top, bottom, left, right } = this.containerRect;
          const { x, y } = event;
          onMouseContainerOver = top < y && bottom > y && left < x && right > x;
        }

        if (!this.popover && this.elRef.nativeElement.contains(event.target)) {
          this.show();
        } else if (this.popover && !this.elRef.nativeElement.contains(event.target) && !onMouseContainerOver) {
          this.hide();
        }
      });
  }

  ngOnDestroy() {
    this.hide();
  }

  show() {
    const element = this.elRef.nativeElement as HTMLElement;
    const injector = ReflectiveInjector.resolveAndCreate([
      { provide: 'POPOVER_PROVIDER', useValue: { element, placement: this.placement } as Tooltip.Config },
    ]);

    const hedaerNode = createProjectableNode.call(this, this.header);
    const contentNode = createProjectableNode.call(this, this.content);

    this.popover = this.resolver.resolveComponentFactory(PopoverComponent).create(injector, [hedaerNode, contentNode]);

    this.appRef.attachView(this.popover.hostView);
    this.renderer.appendChild(
      this.renderer.selectRootElement('p-root', true),
      (this.popover.hostView as EmbeddedViewRef<any>).rootNodes[0],
    );

    this.subscribeTo();
  }

  hide() {
    if (this.popover) {
      this.popover.destroy();
      this.popover = null;
    }
    this.destroy$.next();
    this.store.dispatch(new EventListenerRemove('resize'));
  }

  subscribeTo() {
    this.store.dispatch(new EventListenerAdd('resize'));

    this.resize$
      .pipe(
        filter(event => !!event),
        takeUntilNotNull(this.destroy$),
      )
      .subscribe(_ => this.hide());

    this.actions
      .pipe(
        ofActionDispatched(EventListenerScrollVertical),
        takeUntilNotNull(this.destroy$),
      )
      .subscribe(_ => this.hide());
  }
}
