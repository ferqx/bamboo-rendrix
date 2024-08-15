import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "../../lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "bm-z-50 bm-overflow-hidden bm-rounded-md bm-bg-primary bm-px-3 bm-py-1.5 bm-text-xs bm-text-primary-foreground bm-animate-in bm-fade-in-0 bm-zoom-in-95 data-[state=closed]:bm-animate-out data-[state=closed]:bm-fade-out-0 data-[state=closed]:bm-zoom-out-95 data-[side=bottom]:bm-slide-in-from-top-2 data-[side=left]:bm-slide-in-from-right-2 data-[side=right]:bm-slide-in-from-left-2 data-[side=top]:bm-slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
