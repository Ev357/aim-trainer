import { type ClassValue, clsx } from "clsx";
import { twMerge } from "@@/node_modules/tailwind-merge/src";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
