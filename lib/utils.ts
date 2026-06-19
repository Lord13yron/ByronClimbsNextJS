import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Splits a title into two roughly balanced display lines (by char length).
 * A single-word title stays on one line.
 */
export function splitHeadline(title: string): string[] {
  const words = title.trim().split(/\s+/);
  if (words.length < 2) return [title.trim()];

  const total = title.length;
  let line1 = "";
  let i = 0;
  while (i < words.length - 1 && line1.length + words[i].length < total / 2) {
    line1 += (line1 ? " " : "") + words[i];
    i++;
  }
  const line2 = words.slice(i).join(" ");
  return [line1, line2];
}
