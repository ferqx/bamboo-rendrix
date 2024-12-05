import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '../../lib/utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'bm-peer bm-inline-flex bm-h-5 bm-w-9 bm-shrink-0 bm-cursor-pointer bm-items-center bm-rounded-full bm-border-2 bm-border-transparent bm-shadow-sm bm-transition-colors focus-visible:bm-outline-none focus-visible:bm-ring-2 focus-visible:bm-ring-ring focus-visible:bm-ring-offset-2 focus-visible:bm-ring-offset-background disabled:bm-cursor-not-allowed disabled:bm-opacity-50 data-[state=checked]:bm-bg-primary data-[state=unchecked]:bm-bg-input',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'bm-pointer-events-none bm-block bm-h-4 bm-w-4 bm-rounded-full bm-bg-background bm-shadow-lg bm-ring-0 bm-transition-transform data-[state=checked]:bm-translate-x-4 data-[state=unchecked]:bm-translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
