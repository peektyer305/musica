import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  return format(parsedDate, "yyyy年MM月dd日 HH:mm", { locale: ja });
}
