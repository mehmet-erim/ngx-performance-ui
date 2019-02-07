import { EventEmitter, Input, Output, Component } from '@angular/core';
import { AbstractNgModelComponent } from './ng-model.component';

@Component({
  template: '',
})
export class AbstractInputComponent extends AbstractNgModelComponent {
  @Input() autofocus: boolean = false;

  @Input() autofocusDelay: number = 0;

  @Input() classes: string;

  @Input() labelText: string;

  @Input() labelClasses: string;

  @Input() id: string = uuid();

  @Input() name: string;

  @Input() tabindex: number;

  @Input() required: boolean = false;

  @Input() hidden: boolean = false;

  @Input() placeholder: string = '';

  @Input() type: 'text' | 'number' | 'password' = 'text';

  @Output() blur = new EventEmitter();

  @Output() focus = new EventEmitter();

  @Output() keyup = new EventEmitter();

  @Output() click = new EventEmitter();
}
