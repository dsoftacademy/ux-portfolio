"use client"

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
  disabled?: boolean
}

export type ButtonProps = LinkProps | HTMLButtonProps

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, variant = "primary", children } = props

    const styles = cn(
      // Base: v5 Lead-Level Parameters
      "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[13px] font-bold uppercase tracking-[0.15em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:pointer-events-none disabled:opacity-50 font-sans cursor-pointer",

      // v5 Primary: Tokenized Brand Gradient (Same in all modes)
      variant === "primary" &&
        "bg-gradient-to-br from-[#6366F1] to-[#818CF8] text-white shadow-[0_6px_20px_rgba(99,102,241,0.25)] border-none motion-safe:hover:scale-105 motion-safe:active:scale-95",

      // v5 Secondary: Token-Driven Accessibility (Flipping correctly in light/dark)
      variant === "secondary" &&
        "border border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-[var(--text)]/[0.04] hover:border-[var(--text)]/[0.2] motion-safe:hover:scale-105 motion-safe:active:scale-95",

      className
    )

    if ("href" in props && props.href) {
      const isExternal = props.href.startsWith("http") || props.href.startsWith("mailto:")
      return (
        <Link
          className={styles}
          href={props.href}
          target={isExternal ? (props.target || "_blank") : props.target}
          rel={isExternal ? (props.rel || "noopener noreferrer") : props.rel}
        >
          {children}
        </Link>
      )
    }

    const buttonProps = props as HTMLButtonProps
    return (
      <button
        ref={ref}
        type={buttonProps.type || "button"}
        className={styles}
        onClick={buttonProps.onClick}
        disabled={buttonProps.disabled}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"
