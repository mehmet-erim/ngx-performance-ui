import { Loader } from '../models';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { LOADER_DEFAULTS as defaults } from '../defaults';
import { LoaderSetProgress } from '../actions';

@State<Loader.State>({
  name: 'LoaderState',
  defaults,
})
export class LoaderState {
  @Selector()
  static progress({ progress }: Loader.State) {
    return progress;
  }

  @Action(LoaderSetProgress)
  addEventListener({ patchState }: StateContext<Loader.State>, { payload }: LoaderSetProgress) {
    patchState({ progress: payload });
  }
}
