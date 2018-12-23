import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { Toaster, ToasterShow } from '../../../shared/store';
import { ToasterComponent } from './toaster.component';

@Component({
  selector: 'mn-toaster-container',
  template: `
    <div class="toast-container"><ng-container #container></ng-container></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MnToasterContainerComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private actions: Actions, private cdRef: ChangeDetectorRef, private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.actions.pipe(ofActionDispatched(ToasterShow)).subscribe((action: ToasterShow) => {
      this.create(action.payload);
    });
  }

  create(payload: Toaster.State) {
    const factory = this.resolver.resolveComponentFactory(ToasterComponent);
    const component = this.container.createComponent(factory);
    component.instance.type = payload.type;

    this.cdRef.detectChanges();

    const timeout = setTimeout(() => {
      component.destroy();
      clearTimeout(timeout);
    }, payload.timeout || 30000);
  }
}
