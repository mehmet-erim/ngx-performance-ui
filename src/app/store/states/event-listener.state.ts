import { State, Selector, Action, StateContext } from '@ngxs/store';
import { EventListener } from '../models';
import { EventListenerPublish } from '../actions';

@State<EventListener.State>({
  name: 'EventListenerState',
  defaults: {
    click: {} as MouseEvent,
    mousemove: {} as MouseEvent,
    resize: {} as Event,
  },
})
export class EventListenerState {
  @Selector()
  static getClick({ click }: EventListener.State) {
    return click;
  }

  @Selector()
  static getMousemove({ click: mousemove }: EventListener.State) {
    return mousemove;
  }

  @Selector()
  static getResize({ click: resize }: EventListener.State) {
    return resize;
  }

  @Action(EventListenerPublish)
  publishEvent({ patchState }: StateContext<EventListener.State>, { payload }: EventListenerPublish) {
    patchState({ [payload.type]: payload });
  }
}
