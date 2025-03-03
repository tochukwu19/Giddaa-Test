export type ToastType = "success" | "error" | "warning" | "info" | "default" | "destructive";

export interface Toast {
  id: string;
  title?: string;
  message?: string;
  type: ToastType;
  duration?: number;
}

export interface ToastState {
  toasts: Toast[];
}

export type ToastAction =
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "REMOVE_TOAST"; id: string }
  | { type: "CLEAR_TOASTS" };
