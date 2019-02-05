import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Mask } from '@core/models';
import { AbstractInputComponent } from '../../abstracts';

@Component({
  selector: 'p-input',
  template: `
    <label class="{{ labelClasses }}" [attr.for]="id" [innerHTML]="labelText"></label>
    <input
      class="form-control {{ classes }}"
      [(ngModel)]="value"
      [id]="id"
      [type]="type"
      [placeholder]="placeholder"
      [textMask]="textMask"
      [hidden]="hidden"
      [name]="name"
      [disabled]="disabled"
      [min]="'' + min"
      [max]="'' + max"
      [minlength]="minlength"
      [maxlength]="maxlength"
      [attr.tabindex]="tabindex"
      [attr.autocomplete]="autocomplete"
      [attr.autocorrect]="autocorrect"
      [attr.spellcheck]="spellcheck"
      [required]="required"
      [autofocus]="autofocus"
      [autofocusDelay]="autofocusDelay"
      (change)="onChange($event)"
      (keyup)="keyup.emit($event)"
      (focus)="focus.emit($event)"
      (blur)="blur.emit($event)"
      (click)="click.emit($event)"
    />
    <small class="form-text text-muted {{ helpTextClasses }}" [innerHTML]="helpText"></small>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent extends AbstractInputComponent {
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

  @Input() helpText: string;

  @Input() helpTextClasses: string;

  @Input() placeholder: string = 'Placeholder';

  @Input() type: 'text' | 'number' | 'password' = 'text';

  @Input() min: number;

  @Input() max: number;

  @Input() minlength: number;

  @Input() maxlength: number;

  @Input() autocomplete: boolean = false;

  @Input() autocorrect: boolean = false;

  @Input() spellcheck: boolean = false;

  @Output() change = new EventEmitter();

  @Output() blur = new EventEmitter();

  @Output() focus = new EventEmitter();

  @Output() keyup = new EventEmitter();

  @Output() click = new EventEmitter();
}
