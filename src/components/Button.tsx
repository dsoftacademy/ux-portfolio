import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/cn"

type ButtonVariant = "primary" | "secondary"

interface BaseProps {
  variant?: ButtonVariant
  className?: string
  children?: React.ReactNode
}

interface LinkProps extends BaseProps {
  href: string
  target?: string
  rel?: string
}

interface HTMLButtonProps extends BaseProps {
  href?: never
  type?: "button" | "submit" | "reset"
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export type ButtonProps = LinkProps | HTMLButtonProps

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, variant = "primary", children } = props

    const styles = cn(
      "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      // Primary Defaults
      variant === "primary" && "bg-brand-primary text-white hover:bg-zinc-800",
      // Secondary Defaults - Modified to be more override-friendly
      variant === "secondary" && "border border-zinc-200 bg-white text-brand-primary hover:bg-zinc-50",
      // Custom overrides passed from parent components
      className,
    )

    if ("href" in props && props.href) {
      const isExternal = props.href.startsWith("http") || props.href.startsWith("mailto:")

      if (isExternal) {
        return (
          <a
            className={styles}
            href={props.href}
            target={props.target}
            // Fix: Ensure security best practices for external links
            rel={props.target === "_blank" ? (props.rel || "noopener noreferrer") : props.rel}
          >
            {children}
          </a>
        )
      }

      return (
        <Link className={styles} href={props.href}>
          {children}
        </Link>
      )
    }

    const { type = "button", onClick } = props as HTMLButtonProps
    return (
      <button
        ref={ref}
        type={type}
        className={styles}
        onClick={onClick}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"