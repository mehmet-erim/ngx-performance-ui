export namespace Toaster {
  export interface State {
    type: 'success' | 'danger' | 'warning' | 'primary' | 'secondary' | 'info' | 'light' | 'dark';
    header?: string;
    body?: string;
    timeout?: number;
    closeOnClick?: boolean;
  }
}
