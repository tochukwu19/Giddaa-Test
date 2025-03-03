"use client"

import React, { createContext, useContext, useReducer, useCallback } from "react";
import type { Toast, ToastState, ToastAction } from "./types";

const ToastContext = createContext<
  | {
      toasts: Toast[];
      toast: (options: Omit<Toast, "id">) => string;
      removeToast: (id: string) => void;
      clearToasts: () => void;
    }
  | undefined
>(undefined);

const TOAST_TIMEOUT = 3000;

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case "ADD_TOAST":
      return { toasts: [...state.toasts, action.toast] };
    case "REMOVE_TOAST":
      return { toasts: state.toasts.filter((toast) => toast.id !== action.id) };
    case "CLEAR_TOASTS":
      return { toasts: [] };
    default:
      return state;
  }
};

let toastCount = 0;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const toast = useCallback(({ title, message, type, duration = TOAST_TIMEOUT }: Omit<Toast, "id">) => {
    const id = `toast-${++toastCount}`;
    const newToast: Toast = { id, title, message, type, duration };

    dispatch({ type: "ADD_TOAST", toast: newToast });

    setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", id });
    }, duration);

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    dispatch({ type: "REMOVE_TOAST", id });
  }, []);

  const clearToasts = useCallback(() => {
    dispatch({ type: "CLEAR_TOASTS" });
  }, []);

  return (
    <ToastContext.Provider value={{ toasts: state.toasts, toast, removeToast, clearToasts }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
