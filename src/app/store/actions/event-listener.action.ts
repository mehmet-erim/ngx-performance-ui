export class EventListenerPublish {
  static readonly type = '[Events] Publish';
  constructor(public payload: Event) {}
}

export class EventListenerRemove {
  static readonly type = '[EventListener] Remove';
  constructor(public payload: string[]) {}
}
