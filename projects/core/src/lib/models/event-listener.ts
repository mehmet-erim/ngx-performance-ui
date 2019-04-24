export namespace EventListener {
  export interface State {
    [key: string]: Event;
  }

  export const debonceTimes = {
    click: 300,
    mousemove: 500,
    resize: 700,
    keyup: 300,
  };
}
