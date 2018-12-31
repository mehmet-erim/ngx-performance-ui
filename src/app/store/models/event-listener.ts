export namespace EventListener {
  export interface State {
    click: MouseEvent;
    mousemove: MouseEvent;
    resize: Event;
  }

  export const debonceTimes = {
    click: 300,
    mousemove: 500,
    resize: 700,
  };
}
