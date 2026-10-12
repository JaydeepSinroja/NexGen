import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CompanyEmail =
  import.meta.env.VITE_COMPANY_EMAIL || "nexgendigital1111@gmail.com";
