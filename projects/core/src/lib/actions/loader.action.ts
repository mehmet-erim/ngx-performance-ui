export class LoaderSetProgress {
  static readonly type = '[Loader] Set Progress';
  constructor(public payload: boolean) {}
}
