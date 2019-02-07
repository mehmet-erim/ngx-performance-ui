import { Component } from '@angular/core';

@Component({
  selector: 'p-root',
  template: `
    <p-progress-bar></p-progress-bar>
    <router-outlet></router-outlet>
    <p-toaster-container></p-toaster-container>
  `,
})
export class AppComponent {}
