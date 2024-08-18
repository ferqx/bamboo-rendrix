import * as React from "react"

import { cn } from "../../lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "bm-flex bm-h-9 bm-w-full bm-rounded-md bm-border bm-border-input bm-bg-transparent bm-px-3 bm-py-1 bm-text-sm bm-shadow-sm bm-transition-colors file:bm-border-0 file:bm-bg-transparent file:bm-text-sm file:bm-font-medium placeholder:bm-text-muted-foreground focus-visible:bm-outline-none focus-visible:bm-ring-1 focus-visible:bm-ring-ring disabled:bm-cursor-not-allowed disabled:bm-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
