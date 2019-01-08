import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  ApplicationRef,
  ComponentFactoryResolver,
  Injector,
  TemplateRef,
  Type,
  Renderer2,
  ViewContainerRef,
  EmbeddedViewRef,
  ComponentRef,
} from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EventListenerState } from 'store/states';
import { takeUntilDestroy } from '@core/utils';
import { filter } from 'rxjs/operators';
import { TooltipComponent } from '../components';

@Directive({
  selector: '[pTooltip]',
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input('pTooltip')
  content: string | TemplateRef<any> | Type<any>;

  @Input('pTooltipTrigger')
  trigger: 'mousemove' | 'click' = 'mousemove';

  @Input('pTooltipContext')
  context: any = {};

  @Select(EventListenerState.getOne('mousemove'))
  mousemove$: Observable<MouseEvent>;

  tooltip: ComponentRef<TooltipComponent>;

  constructor(
    private appRef: ApplicationRef,
    private elRef: ElementRef,
    private injector: Injector,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver,
    private vcRef: ViewContainerRef,
  ) {}

  ngOnInit() {
    this.mousemove$
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

  ngOnDestroy() {}

  show() {
    console.warn('show');
    this.tooltip = this.resolver
      .resolveComponentFactory(TooltipComponent)
      .create(this.injector, [this.createNode(this.content)]);

    this.tooltip.instance.style = {
      top: this.elRef.nativeElement.offsetTop + 'px',
      left: this.elRef.nativeElement.offsetWidth / 2 + 'px',
    };

    this.appRef.attachView(this.tooltip.hostView);
    this.renderer.appendChild(
      this.renderer.selectRootElement('p-root', true),
      (this.tooltip.hostView as EmbeddedViewRef<any>).rootNodes[0],
    );

    // this.Modal = this.cfRes
    //   .resolveComponentFactory(ModalComponent)
    //   .create(injector, [projectedHeader, projectedBody, projectedFooter]);

    // this.appRef.attachView(this.Modal.hostView);
    // this.renderer.appendChild(host, (this.Modal.hostView as EmbeddedViewRef<any>).rootNodes[0]);
  }

  hide() {
    console.warn('hide', this.elRef.nativeElement);
    this.tooltip.destroy();
    this.tooltip = null;
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
}
