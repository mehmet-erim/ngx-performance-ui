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
import { ToasterShow } from 'store/actions';
import { Toaster } from 'store/models';
import { ToasterComponent } from './toaster.component';
import { DomSanitizer } from '@angular/platform-browser';
import { isNullOrUndefined } from 'util';
import { take } from 'rxjs/operators';

@Component({
  selector: 'p-toaster-container',
  template: `
    <div class="toast-container"><ng-container #container></ng-container></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToasterContainerComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(
    private actions: Actions,
    private cdRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private resolver: ComponentFactoryResolver,
  ) {}

  ngOnInit() {
    this.actions.pipe(ofActionDispatched(ToasterShow)).subscribe((action: ToasterShow) => {
      this.create(action.payload);
    });
  }

  create(payload: Toaster.State) {
    const factory = this.resolver.resolveComponentFactory(ToasterComponent);
    const component = this.container.createComponent(factory);
    component.instance.body = payload.body ? this.sanitizer.bypassSecurityTrustHtml(payload.body) : '';
    component.instance.header = payload.header;
    component.instance.closeOnClick = isNullOrUndefined(payload.closeOnClick) ? true : payload.closeOnClick;
    component.instance.type = payload.type || 'primary';
    component.instance.timeout = payload.timeout || 5000;

    this.cdRef.detectChanges();

    component.instance.destroy.pipe(take(1)).subscribe(_ => {
      component.destroy();
    });
  }
}
