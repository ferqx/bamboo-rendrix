import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "../../lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "bm-inline-flex bm-h-9 bm-items-center bm-justify-center bm-rounded-lg bm-bg-muted bm-p-1 bm-text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "bm-inline-flex bm-items-center bm-justify-center bm-whitespace-nowrap bm-rounded-md bm-px-3 bm-py-1 bm-text-sm bm-font-medium bm-ring-offset-background bm-transition-all focus-visible:bm-outline-none focus-visible:bm-ring-2 focus-visible:bm-ring-ring focus-visible:bm-ring-offset-2 disabled:bm-pointer-events-none disabled:bm-opacity-50 data-[state=active]:bm-bg-background data-[state=active]:bm-text-foreground data-[state=active]:bm-shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "bm-mt-2 bm-ring-offset-background focus-visible:bm-outline-none focus-visible:bm-ring-2 focus-visible:bm-ring-ring focus-visible:bm-ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
