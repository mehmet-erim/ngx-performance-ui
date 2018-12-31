import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToasterShow, Toaster } from '../store';

@Component({
  selector: 'mn-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  toaster = { closeOnClick: false, type: 'primary' } as Toaster.State;

  selectValue;

  isModalShow;

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

  log(val) {
    console.warn(val);
  }
}
