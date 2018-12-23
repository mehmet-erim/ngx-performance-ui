import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToasterShow, Toaster } from '../shared/store';

@Component({
  selector: 'mn-home',
  templateUrl: './home.component.html',
  styles: [
    `
      input:not([type='checkbox']) {
        width: 90%;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  toaster = { closeOnClick: false, type: 'primary' } as Toaster.State;

  constructor(private store: Store) {}

  ngOnInit() {}

  showToaster() {
    this.store.dispatch(
      new ToasterShow({
        type: this.toaster.type,
        header: this.toaster.header || 'Okay!',
        body: this.toaster.body || '<i>Hello World!</i> <b>Hi!!</b>',
        closeOnClick: this.toaster.closeOnClick,
        timeout: this.toaster.timeout,
      }),
    );
  }
}
