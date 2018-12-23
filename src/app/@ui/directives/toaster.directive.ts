import { Directive, OnInit, ViewContainerRef, Renderer2, ComponentFactoryResolver, Injector } from '@angular/core';
import { Store, Actions, ofActionDispatched } from '@ngxs/store';
import { ToasterShow, Toaster } from '../../shared/store';
import { ToasterComponent } from '../components';

@Directive({
  selector: '[mnToaster]',
})
export class MnToasterDirective implements OnInit {
  constructor(
    private actions: Actions,
    private injector: Injector,
    private renderer: Renderer2,
    private store: Store,
    private cfRes: ComponentFactoryResolver,
    public vcRef: ViewContainerRef,
  ) {}
  ngOnInit() {
    this.actions.pipe(ofActionDispatched(ToasterShow)).subscribe((action: ToasterShow) => {
      this.create(action.payload);
    });
  }

  create(payload: Toaster.State) {
    const factory = this.cfRes.resolveComponentFactory(ToasterComponent);
    const content = this.renderer.createText(payload.body);

    const ref = factory.create(this.injector, [content]);
    let container = document.querySelector('.toaster-container');
  }
}
