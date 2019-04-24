import { State } from '@ngxs/store';
import { Toaster } from '../models';

@State<Toaster.State>({
  name: 'ToasterState',
})
export class ToasterState {}
