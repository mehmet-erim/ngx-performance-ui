import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroupDirective } from '@angular/forms';
import { Subscription, merge, of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[invalidmessage]',
})
export class InvalidMessageDirective implements OnInit, OnDestroy {
  @Input()
  invalidmessage: string;
  control: AbstractControl;
  hasView = false;
  controlValue$: Observable<any>;
  controlSubscription: Subscription;
  hasSubmitted: boolean;
  constructor(private controlContainer: ControlContainer, private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.control = this.form.get(this.invalidmessage);
    let formSubmit$ = (<FormGroupDirective>this.controlContainer).ngSubmit.pipe(
      map(() => {
        this.hasSubmitted = true;
      }),
    );
    this.controlValue$ = merge(this.control.valueChanges, of(''), formSubmit$);
    this.controlSubscription = this.controlValue$.subscribe(() => {
      this.setVisible();
    });
  }

  private setVisible() {
    if (this.control.invalid && (this.control.dirty || this.hasSubmitted)) {
      this.renderer.removeStyle(this.elRef.nativeElement, 'display');
    } else {
      this.renderer.setStyle(this.elRef.nativeElement, 'display', 'none');
    }
  }

  match(error: string) {
    if (this.control && this.control.errors) {
      if (Object.keys(this.control.errors).indexOf(error) > -1) {
        return true;
      }
    }
    return false;
  }

  get form() {
    return this.controlContainer.formDirective
      ? (this.controlContainer.formDirective as FormGroupDirective).form
      : null;
  }

  ngOnDestroy() {
    this.controlSubscription.unsubscribe();
  }
}
