import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'bm-inline-flex bm-items-center bm-justify-center bm-whitespace-nowrap bm-rounded-md bm-text-sm bm-font-medium bm-transition-colors focus-visible:bm-outline-none focus-visible:bm-ring-1 focus-visible:bm-ring-ring disabled:bm-pointer-events-none disabled:bm-opacity-50',
  {
    variants: {
      variant: {
        default: 'bm-bg-primary bm-text-primary-foreground bm-shadow hover:bm-bg-primary/90',
        destructive: 'bm-bg-destructive bm-text-destructive-foreground bm-shadow-sm hover:bm-bg-destructive/90',
        outline:
          'bm-border bm-border-input bm-bg-background bm-shadow-sm hover:bm-bg-accent hover:bm-text-accent-foreground',
        secondary: 'bm-bg-secondary bm-text-secondary-foreground bm-shadow-sm hover:bm-bg-secondary/80',
        ghost: 'hover:bm-bg-accent hover:bm-text-accent-foreground',
        link: 'bm-text-primary bm-underline-offset-4 hover:bm-underline',
      },
      size: {
        default: 'bm-h-9 bm-px-4 bm-py-2',
        sm: 'bm-h-8 bm-rounded-md bm-px-3 bm-text-xs',
        lg: 'bm-h-10 bm-rounded-md bm-px-8',
        icon: 'bm-h-9 bm-w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  text?: string;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {props.children || props.text}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
