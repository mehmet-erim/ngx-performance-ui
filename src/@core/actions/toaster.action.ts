import { Toaster } from '../models/toaster.model';

export class ToasterShow {
  static readonly type = '[Toaster] Show]';
  constructor(public payload: Toaster.State) {}
}
