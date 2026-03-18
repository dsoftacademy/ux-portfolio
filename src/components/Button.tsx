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

    // CHECK: Are we passing custom colors in the className?
    const hasCustomBg = className?.includes("bg-")
    const hasCustomText = className?.includes("text-")
    const hasCustomBorder = className?.includes("border-")

    const styles = cn(
      "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      
      // Primary Defaults (Only if no custom bg/text is passed)
      variant === "primary" && !hasCustomBg && "bg-brand-primary hover:bg-zinc-800",
      variant === "primary" && !hasCustomText && "text-white",
      
      // Secondary Defaults (Only if no custom bg/text/border is passed)
      variant === "secondary" && !hasCustomBorder && "border border-zinc-200",
      variant === "secondary" && !hasCustomBg && "bg-white hover:bg-zinc-50",
      variant === "secondary" && !hasCustomText && "text-brand-primary",
      
      // Custom overrides (Always applied last)
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