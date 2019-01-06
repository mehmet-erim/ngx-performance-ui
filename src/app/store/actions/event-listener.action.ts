export class EventListenerPublish {
  static readonly type = '[EventListener] Publish';
  constructor(public payload: Event) {}
}

export class EventListenerAdd {
  static readonly type = '[EventListener] Add';
  constructor(public payload: string[] | string) {}
}

export class EventListenerRemove {
  static readonly type = '[EventListener] Remove';
  constructor(public payload: string[]) {}
}
