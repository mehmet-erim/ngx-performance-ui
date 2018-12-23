export namespace Toaster {
  export interface State {
    type: 'success' | 'danger' | 'warning' | 'primary';
    title?: string;
    body?: any;
    timeout?: number;
    showCloseButton?: boolean;
    closeHtml?: string;
    data?: any;
  }
}
