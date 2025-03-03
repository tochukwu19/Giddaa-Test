"use client"

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserFromLocalStorage = (): Record<string, any> | null =>
  JSON.parse(localStorage.getItem("user") || "null");
