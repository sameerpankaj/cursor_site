import type React from "react";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M32 4.5c15.188 0 27.5 12.312 27.5 27.5S47.188 59.5 32 59.5 4.5 47.188 4.5 32 16.812 4.5 32 4.5Z"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1.5"
      />
      <path
        d="M20 25.5c2.4-4.5 7.2-7.5 12.6-7.5 6.4 0 11.7 3.8 13.7 9.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M44 38.5c-2.4 4.5-7.2 7.5-12.6 7.5-6.4 0-11.7-3.8-13.7-9.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M25 32h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

