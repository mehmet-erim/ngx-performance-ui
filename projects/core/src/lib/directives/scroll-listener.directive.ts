import { Directive, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { takeUntilDestroy } from '../utils';
import { EventListenerScrollVertical } from '../actions';

@Directive({ selector: 'perfect-scrollbar' })
export class ScrollListenerDirective implements OnInit, OnDestroy {
  dispatch$ = new Subject<Event>();

  constructor(private store: Store) {}

  @HostListener('psScrollY', ['$event'])
  publish(event: Event) {
    this.dispatch$.next(event);
  }

  ngOnInit() {
    this.dispatch$
      .pipe(
        debounceTime(300),
        takeUntilDestroy(this),
      )
      .subscribe(event => this.store.dispatch(new EventListenerScrollVertical(event)));
  }

  ngOnDestroy() {}
}
