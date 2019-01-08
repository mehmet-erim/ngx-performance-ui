import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { EventListenerAdd } from 'store/actions/event-listener.action';

@Injectable({
  providedIn: 'root',
})
export class EventHandler {
  constructor(private store: Store) {
    setTimeout(() => {
      this.store.dispatch(new EventListenerAdd(['click', 'keyup', 'mousemove']));
    }, 0);
  }
}
