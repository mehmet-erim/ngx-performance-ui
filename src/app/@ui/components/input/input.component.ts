import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { AbstractNgModelComponent } from 'shared/abstracts/ng-model.component';
import { Mask } from '@core/models';

@Component({
  selector: 'p-input',
  template: `
    <label class="{{ labelClasses }}" [attr.for]="inputId" [innerHTML]="labelText"></label>
    <input
      class="form-control {{ classes }}"
      [attr.id]="id"
      [attr.type]="type"
      [placeholder]="placeholder"
      [textMask]="textMask"
      [(ngModel)]="value"
    />
    <small class="form-text text-muted {{ helpTextClasses }}" [innerHTML]="helpText"></small>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent extends AbstractNgModelComponent {
  protected _textMask: Mask.Config = {
    mask: false,
  };

  @Input()
  set textMask(value: Mask.Config) {
    this._textMask = {
      ...value,
      mask: value.mask || false,
      guide: value.guide || false,
      keepCharPositionsMask: value.keepCharPositionsMask || false,
    };
  }
  get textMask(): Mask.Config {
    return this._textMask;
  }

  @Input()
  classes: string;

  @Input()
  helpText: string;

  @Input()
  helpTextClasses: string;

  @Input()
  labelText: string;

  @Input()
  labelClasses: string;

  @Input()
  type: string = 'text';

  @Input()
  placeholder: string;
}
