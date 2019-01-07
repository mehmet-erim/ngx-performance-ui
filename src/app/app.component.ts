import { Component } from '@angular/core';

@Component({
  selector: 'p-root',
  template: `
    <router-outlet></router-outlet>
    <p-toaster-container></p-toaster-container>
  `,
})
export class AppComponent {}
