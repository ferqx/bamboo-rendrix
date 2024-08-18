import * as React from "react"
import { Cross2Icon } from "@radix-ui/react-icons"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "bm-fixed bm-top-0 bm-z-[100] bm-flex bm-max-h-screen bm-w-full bm-flex-col-reverse bm-p-4 sm:bm-bottom-0 sm:bm-right-0 sm:bm-top-auto sm:bm-flex-col md:bm-max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "bm-group bm-pointer-events-auto bm-relative bm-flex bm-w-full bm-items-center bm-justify-between bm-space-x-2 bm-overflow-hidden bm-rounded-md bm-border bm-p-4 bm-pr-6 bm-shadow-lg bm-transition-all data-[swipe=cancel]:bm-translate-x-0 data-[swipe=end]:bm-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:bm-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:bm-transition-none data-[state=open]:bm-animate-in data-[state=closed]:bm-animate-out data-[swipe=end]:bm-animate-out data-[state=closed]:bm-fade-out-80 data-[state=closed]:bm-slide-out-to-right-full data-[state=open]:bm-slide-in-from-top-full data-[state=open]:sm:bm-slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "bm-border bm-bg-background bm-text-foreground",
        destructive:
          "bm-destructive bm-group bm-border-destructive bm-bg-destructive bm-text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "bm-inline-flex bm-h-8 bm-shrink-0 bm-items-center bm-justify-center bm-rounded-md bm-border bm-bg-transparent bm-px-3 bm-text-sm bm-font-medium bm-transition-colors hover:bm-bg-secondary focus:bm-outline-none focus:bm-ring-1 focus:bm-ring-ring disabled:bm-pointer-events-none disabled:bm-opacity-50 group-[.destructive]:bm-border-muted/40 group-[.destructive]:hover:bm-border-destructive/30 group-[.destructive]:hover:bm-bg-destructive group-[.destructive]:hover:bm-text-destructive-foreground group-[.destructive]:focus:bm-ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "bm-absolute bm-right-1 bm-top-1 bm-rounded-md bm-p-1 bm-text-foreground/50 bm-opacity-0 bm-transition-opacity hover:bm-text-foreground focus:bm-opacity-100 focus:bm-outline-none focus:bm-ring-1 group-hover:bm-opacity-100 group-[.destructive]:bm-text-red-300 group-[.destructive]:hover:bm-text-red-50 group-[.destructive]:focus:bm-ring-red-400 group-[.destructive]:focus:bm-ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <Cross2Icon className="bm-h-4 bm-w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("bm-text-sm bm-font-semibold [&+div]:bm-text-xs", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("bm-text-sm bm-opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
