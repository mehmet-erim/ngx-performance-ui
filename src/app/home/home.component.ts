import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToasterShow, LayoutScroll } from 'store/actions';
import { Toaster } from 'store/models';

@Component({
  selector: 'p-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  toaster = { closeOnClick: false, type: 'primary' } as Toaster.State;

  selectValue;

  isModalShow;

  radio: 'one' | 'two' = 'two';

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

  scrollTo(location: 'top' | 'bottom') {
    this.store.dispatch(new LayoutScroll(location));
  }

  onChangeRadio(value) {
    console.log(value);
  }
}
