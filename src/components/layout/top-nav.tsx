"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  links: {
    title: string
    href: string
    isActive?: boolean
    disabled?: boolean
  }[]
}

export function TopNav({ className, links, ...props }: TopNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {links.map((link) => {
        const isActive = 
          link.isActive || 
          (pathname && pathname === link.href) || 
          (pathname && link.href !== '/' && pathname.startsWith(link.href))

        return (
          <Link
            key={link.title}
            href={link.disabled ? "#" : link.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive
                ? "text-foreground"
                : "text-muted-foreground",
              link.disabled && "pointer-events-none opacity-50"
            )}
          >
            {link.title}
          </Link>
        )
      })}
    </nav>
  )
} 