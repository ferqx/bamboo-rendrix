import { cn } from '@bamboo-rendrix/components';
import React from 'react';

export const Page = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn('page', className)} ref={ref} {...props}>
        {props.children}
      </div>
    );
  },
);
