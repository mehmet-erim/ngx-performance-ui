export namespace Toaster {
  export interface State {
    type: 'success' | 'danger' | 'warning';
    title?: string;
    body?: any;
    toastId?: string;
    toastContainerId?: number;
    timeout?: number;
    timeoutId?: number | null;
    showCloseButton?: boolean;
    closeHtml?: string;
    data?: any;
  }
}
