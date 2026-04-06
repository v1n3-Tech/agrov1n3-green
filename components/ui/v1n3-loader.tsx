"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

type LoaderColor = "green" | "orange" | "mint"

interface V1n3LoaderProps {
  /** Size variant - 'sm' for buttons, 'md' for cards, 'lg' for full page */
  size?: "sm" | "md" | "lg"
  /** Color of the loader */
  color?: LoaderColor
  /** Show only the text/logo without background overlay */
  inline?: boolean
  /** Use logo instead of text (for full page loaders) */
  useLogo?: boolean
  /** Additional class names */
  className?: string
}

const colorStyles: Record<LoaderColor, string> = {
  green: "text-primary",
  orange: "text-orange-400", 
  mint: "text-teal-400",
}

export function V1n3Loader({ 
  size = "lg", 
  color = "green",
  inline = false, 
  useLogo = false,
  className 
}: V1n3LoaderProps) {
  const sizeStyles = {
    sm: "text-xs",
    md: "text-base",
    lg: "text-2xl",
  }

  const logoSizes = {
    sm: { width: 20, height: 20 },
    md: { width: 32, height: 32 },
    lg: { width: 48, height: 48 },
  }

  // Logo version for full-page loaders
  if (useLogo) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className="animate-pulse">
          <Image
            src="/images/greenvine-logo.png"
            alt="Loading"
            width={logoSizes[size].width}
            height={logoSizes[size].height}
            className="object-contain"
          />
        </div>
      </div>
    )
  }

  // Text version
  const TextLogo = (
    <span
      className={cn(
        "font-[family-name:var(--font-aldrich)] tracking-wider select-none animate-pulse",
        sizeStyles[size],
        colorStyles[color],
        className
      )}
    >
      V1n3
    </span>
  )

  if (inline) {
    return TextLogo
  }

  return (
    <div className="flex items-center justify-center">
      {TextLogo}
    </div>
  )
}

interface V1n3LoadingOverlayProps {
  /** Whether to show the loading overlay */
  isLoading?: boolean
  /** Children to show behind the overlay */
  children?: React.ReactNode
  /** Color of the loader */
  color?: LoaderColor
  /** Additional class names for the overlay */
  className?: string
}

export function V1n3LoadingOverlay({ 
  isLoading = true, 
  children,
  color = "green",
  className 
}: V1n3LoadingOverlayProps) {
  return (
    <div className="relative min-h-screen">
      {/* Content rendered behind (preloaded page) */}
      <div className={cn(
        "transition-opacity duration-500",
        isLoading ? "opacity-50 pointer-events-none" : "opacity-100"
      )}>
        {children}
      </div>
      
      {/* Loading overlay */}
      {isLoading && (
        <div 
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center",
            "bg-background/50",
            "animate-in fade-in duration-200",
            className
          )}
        >
          <div className="animate-pulse">
            <Image
              src="/images/greenvine-logo.png"
              alt="Loading"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}

/** 
 * Full page loading component for Next.js loading.tsx files
 * Shows centered logo on a semi-transparent overlay (50% opacity)
 */
export function V1n3PageLoader({ color = "green" }: { color?: LoaderColor }) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/50"
    >
      <div className="animate-pulse">
        <Image
          src="/images/greenvine-logo.png"
          alt="Loading"
          width={56}
          height={56}
          className="object-contain"
        />
      </div>
    </div>
  )
}

/**
 * Button/small component loading state - uses text only, single color
 * Example: <Button disabled>{isLoading ? <V1n3ButtonLoader /> : "Submit"}</Button>
 */
export function V1n3ButtonLoader({ 
  className,
  color = "green" 
}: { 
  className?: string
  color?: LoaderColor
}) {
  return (
    <span 
      className={cn(
        "font-[family-name:var(--font-aldrich)] text-xs tracking-wide animate-pulse",
        colorStyles[color],
        className
      )}
    >
      V1n3
    </span>
  )
}

/**
 * Small component loader using logo only (alternative to text)
 * For buttons, cards, or other small UI elements
 */
export function V1n3LogoLoader({ 
  size = "sm",
  className 
}: { 
  size?: "sm" | "md"
  className?: string
}) {
  const sizes = {
    sm: { width: 16, height: 16 },
    md: { width: 24, height: 24 },
  }

  return (
    <div className={cn("animate-pulse", className)}>
      <Image
        src="/images/greenvine-logo.png"
        alt="Loading"
        width={sizes[size].width}
        height={sizes[size].height}
        className="object-contain"
      />
    </div>
  )
}
