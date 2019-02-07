export namespace Mask {
  export interface Config {
    mask: Array<string | RegExp> | ((raw: string) => Array<string | RegExp>) | false;
    guide?: boolean;
    keepCharPositionsMask?: boolean;
    pipe?: (conformedValue: string, config: any) => false | string | Object;
    placeholderChar?: string;
    showMask?: boolean;
  }
}
