"use client"

import { cn } from "@/lib/utils"

interface V1n3LoaderProps {
  /** Size variant - 'sm' for buttons, 'md' for cards, 'lg' for full page */
  size?: "sm" | "md" | "lg"
  /** Show only the text/logo without background overlay */
  inline?: boolean
  /** Additional class names */
  className?: string
}

export function V1n3Loader({ size = "lg", inline = false, className }: V1n3LoaderProps) {
  const sizeStyles = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-4xl md:text-5xl",
  }

  const Logo = (
    <span
      className={cn(
        "font-[family-name:var(--font-aldrich)] tracking-wider select-none",
        sizeStyles[size],
        className
      )}
    >
      <span className="text-primary animate-pulse">V</span>
      <span className="text-orange-400 animate-pulse [animation-delay:100ms]">1</span>
      <span className="text-primary animate-pulse [animation-delay:200ms]">n</span>
      <span className="text-orange-400 animate-pulse [animation-delay:300ms]">3</span>
    </span>
  )

  if (inline) {
    return Logo
  }

  return (
    <div className="flex items-center justify-center">
      {Logo}
    </div>
  )
}

interface V1n3LoadingOverlayProps {
  /** Whether to show the loading overlay */
  isLoading?: boolean
  /** Children to show behind the overlay */
  children?: React.ReactNode
  /** Additional class names for the overlay */
  className?: string
}

export function V1n3LoadingOverlay({ 
  isLoading = true, 
  children, 
  className 
}: V1n3LoadingOverlayProps) {
  return (
    <div className="relative min-h-screen">
      {/* Content rendered behind (preloaded page) */}
      <div className={cn(
        "transition-opacity duration-500",
        isLoading ? "opacity-30 pointer-events-none" : "opacity-100"
      )}>
        {children}
      </div>
      
      {/* Loading overlay */}
      {isLoading && (
        <div 
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center",
            "bg-background/60 backdrop-blur-[2px]",
            "animate-in fade-in duration-200",
            className
          )}
        >
          <div className="flex flex-col items-center gap-4">
            <V1n3Loader size="lg" inline />
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/** 
 * Full page loading component for Next.js loading.tsx files
 * Shows centered V1n3 text on a semi-transparent overlay
 */
export function V1n3PageLoader() {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4">
        <V1n3Loader size="lg" inline />
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}

/**
 * Button loading state - use inside buttons
 * Example: <Button disabled>{isLoading ? <V1n3ButtonLoader /> : "Submit"}</Button>
 */
export function V1n3ButtonLoader({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      <span className="font-[family-name:var(--font-aldrich)] text-sm tracking-wide">
        <span className="text-primary-foreground animate-pulse">V</span>
        <span className="text-orange-400 animate-pulse [animation-delay:100ms]">1</span>
        <span className="text-primary-foreground animate-pulse [animation-delay:200ms]">n</span>
        <span className="text-orange-400 animate-pulse [animation-delay:300ms]">3</span>
      </span>
      <span className="flex items-center gap-0.5 ml-1">
        <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:0ms]" />
        <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:150ms]" />
        <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:300ms]" />
      </span>
    </span>
  )
}
