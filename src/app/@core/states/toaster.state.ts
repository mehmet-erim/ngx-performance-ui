import { State } from '@ngxs/store';
import { Toaster } from '../models/toaster.model';

@State<Toaster.State>({
  name: 'ToasterState',
  defaults: {
    timeout: 3000,
    type: 'success',
  },
})
export class ToasterState {}
