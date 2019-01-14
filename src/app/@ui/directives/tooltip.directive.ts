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
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EventListenerState } from 'store/states';
import { LayoutPrimaryComponent } from '../../layouts';
import { EventListenerAdd, EventListenerRemove } from '../../store/actions';
import { TooltipComponent } from '../components';
import { Tooltip } from '../models';

@Directive({
  selector: '[pTooltip]',
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
    const projectableNode = this.createNode(this.content);

    this.tooltip = this.resolver.resolveComponentFactory(TooltipComponent).create(injector, [projectableNode]);

    this.appRef.attachView(this.tooltip.hostView);
    this.renderer.appendChild(
      this.renderer.selectRootElement('p-root', true),
      (this.tooltip.hostView as EmbeddedViewRef<any>).rootNodes[0],
    );

    this.subscribeTo();
  }

  hide() {
    this.tooltip.destroy();
    this.tooltip = null;
    this.destroy$.next();
    this.store.dispatch(new EventListenerRemove('resize'));
  }

  createNode(content: string | TemplateRef<any> | Type<any> = ''): Node[] {
    if (typeof content === 'string') {
      return [this.renderer.createText(content)];
    }

    if (content instanceof TemplateRef) {
      return this.vcRef.createEmbeddedView(content, this.context).rootNodes;
    }

    const factory = this.resolver.resolveComponentFactory(content);
    const {
      location: { nativeElement },
    } = factory.create(this.injector);
    return [nativeElement];
  }

  subscribeTo() {
    this.store.dispatch(new EventListenerAdd('resize'));

    this.resize$
      .pipe(
        filter(event => !!event),
        takeUntilNotNull(this.destroy$),
      )
      .subscribe(_ => this.hide());

    // this.pScrollBarRef.directiveRef.psScrollY.pipe(take(1)).subscribe(_ => this.hide());
  }
}
