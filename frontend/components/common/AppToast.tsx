"use client";

import { toast } from "sonner";

import {
  CheckCircle2,
  CircleAlert,
  Info,
  TriangleAlert,
} from "lucide-react";

interface ToastOptions {
  description?: string;

  duration?: number;
}

const DEFAULT_DURATION = 3000;

const AppToast = {
  success(
    title: string,
    options?: ToastOptions
  ) {
    toast.success(title, {
      description: options?.description,

      duration:
        options?.duration ??
        DEFAULT_DURATION,

      icon: (
        <CheckCircle2 className="h-5 w-5 text-green-500" />
      ),
    });
  },

  error(
    title: string,
    options?: ToastOptions
  ) {
    toast.error(title, {
      description: options?.description,

      duration:
        options?.duration ??
        DEFAULT_DURATION,

      icon: (
        <CircleAlert className="h-5 w-5 text-red-500" />
      ),
    });
  },

  warning(
    title: string,
    options?: ToastOptions
  ) {
    toast.warning(title, {
      description: options?.description,

      duration:
        options?.duration ??
        DEFAULT_DURATION,

      icon: (
        <TriangleAlert className="h-5 w-5 text-yellow-500" />
      ),
    });
  },

  info(
    title: string,
    options?: ToastOptions
  ) {
    toast.info(title, {
      description: options?.description,

      duration:
        options?.duration ??
        DEFAULT_DURATION,

      icon: (
        <Info className="h-5 w-5 text-sky-500" />
      ),
    });
  },

  loading(title: string) {
    return toast.loading(title);
  },

  dismiss(id?: string | number) {
    toast.dismiss(id);
  },
};

export default AppToast;