import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import { cn } from '../../lib/utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'bm-fixed bm-inset-0 bm-z-50 bm-bg-black/80 bm- data-[state=open]:bm-animate-in data-[state=closed]:bm-animate-out data-[state=closed]:bm-fade-out-0 data-[state=open]:bm-fade-in-0',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'bm-fixed bm-left-[50%] bm-top-[50%] bm-z-50 bm-grid bm-w-full bm-max-w-lg bm-translate-x-[-50%] bm-translate-y-[-50%] bm-gap-4 bm-border bm-bg-background bm-p-6 bm-shadow-lg bm-duration-200 data-[state=open]:bm-animate-in data-[state=closed]:bm-animate-out data-[state=closed]:bm-fade-out-0 data-[state=open]:bm-fade-in-0 data-[state=closed]:bm-zoom-out-95 data-[state=open]:bm-zoom-in-95 data-[state=closed]:bm-slide-out-to-left-1/2 data-[state=closed]:bm-slide-out-to-top-[48%] data-[state=open]:bm-slide-in-from-left-1/2 data-[state=open]:bm-slide-in-from-top-[48%] sm:bm-rounded-lg',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="bm-absolute bm-right-4 bm-top-4 bm-rounded-sm bm-opacity-70 bm-ring-offset-background bm-transition-opacity hover:bm-opacity-100 focus:bm-outline-none focus:bm-ring-2 focus:bm-ring-ring focus:bm-ring-offset-2 disabled:bm-pointer-events-none data-[state=open]:bm-bg-accent data-[state=open]:bm-text-muted-foreground">
        <Cross2Icon className="bm-h-4 bm-w-4" />
        <span className="bm-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('bm-flex bm-flex-col bm-space-y-1.5 bm-text-center sm:bm-text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('bm-flex bm-flex-col-reverse sm:bm-flex-row sm:bm-justify-end sm:bm-space-x-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('bm-text-lg bm-font-semibold bm-leading-none bm-tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn('bm-text-sm bm-text-muted-foreground', className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
