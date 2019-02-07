import { Action, Selector, State, StateContext, createSelector } from '@ngxs/store';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, share, tap } from 'rxjs/operators';
import { EventListenerAdd, EventListenerPublish, EventListenerRemove } from '../actions';
import { transformToArray } from '../utils';
import { EventListener } from '../models';

@State<EventListener.State>({
  name: 'EventListenerState',
  defaults: {},
})
export class EventListenerState {
  subscriptions: { [key: string]: Subscription } = {};

  @Selector()
  static getAll(state: EventListener.State) {
    return state;
  }

  static getOne(key: string) {
    return createSelector(
      [EventListenerState],
      function(state: EventListener.State) {
        return state[key];
      },
    );
  }

  @Action(EventListenerAdd)
  addEventListener({ dispatch }: StateContext<EventListener.State>, { payload }: EventListenerAdd) {
    transformToArray(payload).forEach(key => {
      if (this.subscriptions[key]) return;

      this.subscriptions[key] = fromEvent(key === 'resize' ? window : document, key)
        .pipe(
          debounceTime(EventListener.debonceTimes[key] || 300),
          share(),
        )
        .subscribe(event => dispatch(new EventListenerPublish(event)));
    });
  }

  @Action(EventListenerPublish)
  publishEvent({ patchState }: StateContext<EventListener.State>, { payload }: EventListenerPublish) {
    patchState({ [payload.type]: payload });
  }

  @Action(EventListenerRemove)
  removeEventListener({ patchState }: StateContext<EventListener.State>, { payload }: EventListenerRemove) {
    transformToArray(payload).forEach(key => {
      if (this.subscriptions[key]) {
        this.subscriptions[key].unsubscribe();
        delete this.subscriptions[key];

        patchState({
          [key]: null,
        });
      }
    });
  }
}
