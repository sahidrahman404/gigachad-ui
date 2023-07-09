import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GetUserQuery$data } from "../../__generated__/GetUserQuery.graphql";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRedirectUrl(data: GetUserQuery$data | null): string {
  if (data?.getUser && data.getUser.activated === 0) {
    return `/auth/verify?mail=${data.getUser.email}`;
  }

  if (data?.getUser && data.getUser.activated === 1) {
    return `/dashboard/${data.getUser.username}`;
  }
  return "";
}
