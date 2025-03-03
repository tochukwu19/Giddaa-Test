"use client"

import { AnimatePresence, motion } from "framer-motion";
import { Check, X, AlertCircle, Info } from "lucide-react";
import { useToast } from "./Toast";
import type { ToastType } from "./types";
import { JSX } from "react";

const icons: Record<ToastType, JSX.Element | null> = {
  success: <Check className="w-4 h-4" />,
  error: <X className="w-4 h-4" />,
  warning: <AlertCircle className="w-4 h-4" />,
  info: <Info className="w-4 h-4" />,
  default: null,
  destructive: <X className="w-4 h-4" />,
};

const toastStyles: Record<ToastType, string> = {
  success: "bg-green-50 text-green-800 border-green-200",
  error: "bg-red-50 text-red-800 border-red-200",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  info: "bg-blue-50 text-blue-800 border-blue-200",
  default: "bg-gray-50 text-gray-800 border-gray-200",
  destructive: "bg-red-50 text-red-800 border-red-200",
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`min-w-[300px] max-w-[400px] p-4 rounded-lg shadow-lg border flex items-center gap-3 ${toastStyles[toast.type]}`}
          >
            {icons[toast.type] && <span className="flex-shrink-0">{icons[toast.type]}</span>}
            <div className="flex-grow">
              {toast.title && <p className="font-semibold">{toast.title}</p>}
              <p className="text-sm">{toast.message}</p>
            </div>
            <button onClick={() => removeToast(toast.id)} className="text-gray-500 hover:text-gray-700">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
