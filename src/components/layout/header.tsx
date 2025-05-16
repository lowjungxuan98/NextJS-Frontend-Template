"use client"

import { cn } from "@/lib/utils"

export function Header({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center justify-between gap-4 bg-background px-4 sm:px-6 py-3 border-b",
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
} 