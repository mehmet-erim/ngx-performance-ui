import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractInputComponent } from '../../abstracts';

@Component({
  selector: 'p-textarea',
  template: `
    <label *ngIf="labelText" class="{{ labelClasses }}" [attr.for]="id" [innerHTML]="labelText"></label>
    <textarea
      class="form-control {{ classes }}"
      [(ngModel)]="value"
      [autosize]="autosize"
      [rows]="rows"
      [cols]="cols"
      [id]="id"
      [placeholder]="placeholder"
      [hidden]="hidden"
      [name]="name"
      [disabled]="disabled"
      [minlength]="minlength"
      [maxlength]="maxlength"
      [attr.tabindex]="tabindex"
      [required]="required"
      [autofocus]="autofocus"
      [autofocusDelay]="autofocusDelay"
      (keyup)="keyup.emit($event)"
      (focus)="focus.emit($event)"
      (blur)="blur.emit($event)"
      (click)="click.emit($event)"
    ></textarea>
    <small *ngIf="helpText" class="form-text text-muted {{ helpTextClasses }}" [innerHTML]="helpText"></small>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true,
    },
  ],
})
export class TextAreaComponent extends AbstractInputComponent {
  @Input() autosize: boolean = true;

  @Input() rows: number = 1;

  @Input() cols: number = 20;

  @Input() helpText: string;

  @Input() helpTextClasses: string;

  @Input() minlength: number;

  @Input() maxlength: number;

  @Output() change = new EventEmitter();

  @Output() blur = new EventEmitter();

  @Output() focus = new EventEmitter();

  @Output() keyup = new EventEmitter();

  @Output() click = new EventEmitter();
}
