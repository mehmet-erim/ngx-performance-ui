import { Directive, OnInit, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { InvalidMessageDirective } from './invalid-message.directive';

@Directive({
  selector: '[invalidType]',
})
export class InvalidTypeDirective implements OnInit {
  @Input('invalidType') type: string;
  private hasView = false;
  constructor(
    private invalidmessage: InvalidMessageDirective,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {}
  ngOnInit() {
    this.invalidmessage.controlValue$.subscribe(() => {
      this.setVisible();
    });
  }

  private setVisible() {
    if (this.invalidmessage.match(this.type)) {
      if (!this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      }
    } else {
      if (this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    }
  }
}
