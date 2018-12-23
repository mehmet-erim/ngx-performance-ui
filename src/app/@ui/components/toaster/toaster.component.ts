import { Component, Input } from '@angular/core';

@Component({
  selector: 'mn-toaster',
  template: `
    <div class="alert alert-{{ type }}">A simple primary alert—check it out! {{ type }}</div>
  `,
})
export class ToasterComponent {
  @Input() type: string = 'primary';
}
