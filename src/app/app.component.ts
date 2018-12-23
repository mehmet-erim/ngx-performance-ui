import { Component } from '@angular/core';

@Component({
  selector: 'mn-root',
  template: `
    <router-outlet></router-outlet>
    <mn-toaster-container></mn-toaster-container>
  `,
})
export class AppComponent {}
