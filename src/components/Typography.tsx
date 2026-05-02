import * as React from "react"
import { cn } from "@/lib/cn"

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>

export function H1({ className, children, ...props }: HeadingProps) {
  return (
    <h1
      className={cn(
        "font-heading text-4xl font-bold tracking-tight text-brand-primary md:text-5xl",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export function H2({ className, children, ...props }: HeadingProps) {
  return (
    <h2
      className={cn(
        "font-heading text-2xl font-bold tracking-tight text-brand-primary md:text-3xl",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export function H3({ className, children, ...props }: HeadingProps) {
  return (
    <h3
      className={cn(
        "font-heading text-xl font-bold tracking-tight text-brand-primary md:text-2xl",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

