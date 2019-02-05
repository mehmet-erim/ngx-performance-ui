import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewEncapsulation, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractInputComponent } from '../../abstracts';

@Component({
  selector: 'xc-checkbox',
  template: `
    <div class="form-group form-checkbox {{ classes }}">
      <input
        type="checkbox"
        [(ngModel)]="value"
        [attr.id]="id"
        [attr.name]="name"
        [hidden]="hidden"
        [disabled]="disabled"
        class="form-check-input {{ classes }}"
        [required]="required"
        (change)="onChange($event)"
        (keyup)="keyup.emit($event)"
        (focus)="focus.emit($event)"
        (blur)="blur.emit($event)"
        (click)="click.emit($event)"
      />

      <label
        [htmlFor]="id + '-checkbox'"
        tabindex="0"
        (keyup.space)="onKeyup()"
        class="form-check-label {{ labelClasses }}"
      >
        <p class="mb-0">{{ labelText }}</p>
      </label>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent extends AbstractInputComponent {
  valueFn: (value: boolean, previousValue?: boolean) => boolean = value => (!value as any) as boolean;

  onKeyup() {
    this.value = !this.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.warn(changes.ngModel);
  }
}
