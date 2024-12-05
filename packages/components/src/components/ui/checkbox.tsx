import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

import { cn } from '../../lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'bm-peer bm-h-4 bm-w-4 bm-shrink-0 bm-rounded-sm bm-border bm-border-primary bm-shadow focus-visible:bm-outline-none focus-visible:bm-ring-1 focus-visible:bm-ring-ring disabled:bm-cursor-not-allowed disabled:bm-opacity-50 data-[state=checked]:bm-bg-primary data-[state=checked]:bm-text-primary-foreground',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('bm-flex bm-items-center bm-justify-center bm-text-current')}>
      <CheckIcon className="bm-h-4 bm-w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
