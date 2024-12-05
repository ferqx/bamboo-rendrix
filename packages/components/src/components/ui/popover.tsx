import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '../../lib/utils';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'bm-z-50 bm-w-72 bm-rounded-md bm-border bm-bg-popover bm-p-4 bm-text-popover-foreground bm-shadow-md bm-outline-none data-[state=open]:bm-animate-in data-[state=closed]:bm-animate-out data-[state=closed]:bm-fade-out-0 data-[state=open]:bm-fade-in-0 data-[state=closed]:bm-zoom-out-95 data-[state=open]:bm-zoom-in-95 data-[side=bottom]:bm-slide-in-from-top-2 data-[side=left]:bm-slide-in-from-right-2 data-[side=right]:bm-slide-in-from-left-2 data-[side=top]:bm-slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
