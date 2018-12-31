import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, share } from 'rxjs/operators';
import { EventListener } from 'store/models';
import { EventListenerPublish } from 'store/actions/event-listener.action';

@Injectable({
  providedIn: 'root',
})
export class EventHandler {
  subscriptions: { [key: string]: Subscription } = {};

  constructor(private store: Store) {
    this.listenToEvents(['click', 'mousemove', 'resize']);
  }

  listenToEvents(events: string[]): void {
    events.forEach(event => {
      if (this.subscriptions[event]) return;

      this.subscriptions[event] = fromEvent(event === 'resize' ? window : document, event)
        .pipe(debounceTime(EventListener.debonceTimes[event]))
        .subscribe(event => this.store.dispatch(new EventListenerPublish(event)));
    });

    console.log(this.subscriptions);
  }
}
