import { Toaster } from '../models/toaster';

export class ToasterShow {
  static readonly type = '[Toaster] Show]';
  constructor(public payload: Toaster.State) {}
}
