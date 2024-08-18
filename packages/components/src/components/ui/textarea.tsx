import * as React from "react"

import { cn } from "../../lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "bm-flex bm-min-h-[60px] bm-w-full bm-rounded-md bm-border bm-border-input bm-bg-transparent bm-px-3 bm-py-2 bm-text-sm bm-shadow-sm placeholder:bm-text-muted-foreground focus-visible:bm-outline-none focus-visible:bm-ring-1 focus-visible:bm-ring-ring disabled:bm-cursor-not-allowed disabled:bm-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
