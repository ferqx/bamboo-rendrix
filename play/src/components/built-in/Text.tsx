import { cn } from '@bamboo-rendrix/components';
import React from 'react';

interface TextProps extends React.ComponentPropsWithoutRef<'span'> {
  text: string;
}

export const Text = React.forwardRef<HTMLDivElement, TextProps>(({ className, ...props }, ref) => {
  return (
    <span className={cn('', className)} ref={ref} {...props}>
      {props.text}
    </span>
  );
});
