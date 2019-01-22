import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { AbstractNgModelComponent } from 'shared/abstracts/ng-model.component';
import { Mask } from '@core/models';

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
      (change)="onChange($event)"
      (keyup)="keyup.emit($event)"
      (focus)="focus.emit($event)"
      (blur)="blur.emit($event)"
      (click)="click.emit($event)"
      [required]="required"
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

  @Input() classes: string;

  @Input() helpText: string;

  @Input() helpTextClasses: string;

  @Input() labelText: string;

  @Input() labelClasses: string;

  @Input() placeholder: string;

  @Input() id: string;

  @Input() name: string;

  @Input() type: 'text' | 'number' | 'password' = 'text';

  @Input() tabindex: number;

  @Input() min: number;

  @Input() max: number;

  @Input() minlength: number;

  @Input() maxlength: number;

  @Input() required: boolean = false;

  @Input() hidden: boolean = false;

  @Input() autocomplete: boolean = false;

  @Input() autocorrect: boolean = false;

  @Input() spellcheck: boolean = false;

  @Output() change = new EventEmitter();

  @Output() blur = new EventEmitter();

  @Output() focus = new EventEmitter();

  @Output() keyup = new EventEmitter();

  @Output() click = new EventEmitter();
}
