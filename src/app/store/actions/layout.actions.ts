export class LayoutScroll {
  static readonly type = '[Layout] Scroll';
  constructor(public payload: 'top' | 'bottom') {}
}
