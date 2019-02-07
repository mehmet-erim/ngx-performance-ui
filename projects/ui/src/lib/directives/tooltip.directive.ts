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
import { takeUntilDestroy, takeUntilNotNull } from '@core/utils';
import { Select, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EventListenerState } from 'store/states';
import { EventListenerAdd, EventListenerRemove, EventListenerScrollVertical } from '../../store/actions';
import { TooltipComponent } from '../components';
import { Tooltip } from '../models';
import { createProjectableNode } from '../utils';

@Directive({
  selector: '[pTooltip]',
  exportAs: 'pTooltip',
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input('pTooltip')
  content: string | TemplateRef<any> | Type<any>;

  @Input('pTooltipContext')
  context: any = {};

  @Input('pTooltipPlacement')
  placement: 'top' | 'left' | 'right' | 'bottom' = 'top';

  @Input('pTooltipTrigger')
  trigger: 'mousemove' | 'click' = 'mousemove';

  @Select(EventListenerState.getOne('mousemove'))
  mousemove$: Observable<MouseEvent>;

  @Select(EventListenerState.getOne('click'))
  click$: Observable<MouseEvent>;

  @Select(EventListenerState.getOne('resize'))
  resize$: Observable<MouseEvent>;

  private tooltip: ComponentRef<TooltipComponent>;

  private destroy$ = new Subject<void>();

  constructor(
    private actions: Actions,
    private appRef: ApplicationRef,
    private elRef: ElementRef,
    private injector: Injector,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver,
    private vcRef: ViewContainerRef,
    private store: Store,
  ) {}

  ngOnInit() {
    (this.trigger === 'mousemove' ? this.mousemove$ : this.click$)
      .pipe(
        takeUntilDestroy(this),
        filter(event => !!event),
      )
      .subscribe(event => {
        if (!this.tooltip && this.elRef.nativeElement.contains(event.target)) {
          this.show();
        } else if (this.tooltip && !this.elRef.nativeElement.contains(event.target)) {
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
      { provide: 'TOOLTIP_PROVIDER', useValue: { element, placement: this.placement } as Tooltip.Config },
    ]);
    const projectableNode = createProjectableNode.call(this, this.content);

    this.tooltip = this.resolver.resolveComponentFactory(TooltipComponent).create(injector, [projectableNode]);

    this.appRef.attachView(this.tooltip.hostView);
    this.renderer.appendChild(
      this.renderer.selectRootElement('p-root', true),
      (this.tooltip.hostView as EmbeddedViewRef<any>).rootNodes[0],
    );

    this.subscribeTo();
  }

  hide() {
    if (this.tooltip) {
      this.tooltip.destroy();
      this.tooltip = null;
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
