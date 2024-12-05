import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '../../lib/utils';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('bm-relative bm-flex bm-w-full bm-touch-none bm-select-none bm-items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className="bm-relative bm-h-1.5 bm-w-full bm-grow bm-overflow-hidden bm-rounded-full bm-bg-primary/20">
      <SliderPrimitive.Range className="bm-absolute bm-h-full bm-bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="bm-block bm-h-4 bm-w-4 bm-rounded-full bm-border bm-border-primary/50 bm-bg-background bm-shadow bm-transition-colors focus-visible:bm-outline-none focus-visible:bm-ring-1 focus-visible:bm-ring-ring disabled:bm-pointer-events-none disabled:bm-opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
