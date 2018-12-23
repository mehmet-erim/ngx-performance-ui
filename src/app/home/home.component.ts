import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToasterShow } from '../shared/store';

@Component({
  selector: 'mn-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}

  showToaster() {
    this.store.dispatch(new ToasterShow({ type: 'success' }));
  }
}
