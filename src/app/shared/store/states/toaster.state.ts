import { State } from '@ngxs/store';
import { Toaster } from '../models/toaster';

@State<Toaster.State>({
  name: 'ToasterState',
})
export class ToasterState {}
