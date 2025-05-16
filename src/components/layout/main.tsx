"use client"

import { cn } from "@/lib/utils"

export function Main({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <main
      className={cn(
        "flex-1 overflow-hidden px-4 py-6 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    />
  )
} 