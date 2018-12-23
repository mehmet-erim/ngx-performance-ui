import { State } from '@ngxs/store';
import { Toaster } from '../models/toaster';

@State<Toaster.State>({
  name: 'ToasterState',
  defaults: {
    timeout: 30000,
    type: 'primary',
  },
})
export class ToasterState {}
