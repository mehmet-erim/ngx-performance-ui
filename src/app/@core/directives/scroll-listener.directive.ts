import { Directive, HostListener } from '@angular/core';
import { Store } from '@ngxs/store';
import { publish } from 'rxjs/operators';
import { EventListenerScrollVertical } from 'store/actions';

@Directive({ selector: 'perfect-scrollbar' })
export class ScrollListenerDirective {
  constructor(private store: Store) {}

  @HostListener('psScrollY')
  publish(event: Event) {
    this.store.dispatch(new EventListenerScrollVertical(event));
  }
}
