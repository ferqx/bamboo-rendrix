import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const toggleVariants = cva(
  "bm-inline-flex bm-items-center bm-justify-center bm-rounded-md bm-text-sm bm-font-medium bm-transition-colors hover:bm-bg-muted hover:bm-text-muted-foreground focus-visible:bm-outline-none focus-visible:bm-ring-1 focus-visible:bm-ring-ring disabled:bm-pointer-events-none disabled:bm-opacity-50 data-[state=on]:bm-bg-accent data-[state=on]:bm-text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bm-bg-transparent",
        outline:
          "bm-border bm-border-input bm-bg-transparent bm-shadow-sm hover:bm-bg-accent hover:bm-text-accent-foreground",
      },
      size: {
        default: "bm-h-9 bm-px-3",
        sm: "bm-h-8 bm-px-2",
        lg: "bm-h-10 bm-px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
