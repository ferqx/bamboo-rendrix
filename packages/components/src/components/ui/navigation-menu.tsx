import * as React from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn('bm-relative bm-z-10 bm-flex bm-max-w-max bm-flex-1 bm-items-center bm-justify-center', className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn('bm-group bm-flex bm-flex-1 bm-list-none bm-items-center bm-justify-center bm-space-x-1', className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  'bm-group bm-inline-flex bm-h-9 bm-w-max bm-items-center bm-justify-center bm-rounded-md bm-bg-background bm-px-4 bm-py-2 bm-text-sm bm-font-medium bm-transition-colors hover:bm-bg-accent hover:bm-text-accent-foreground focus:bm-bg-accent focus:bm-text-accent-foreground focus:bm-outline-none disabled:bm-pointer-events-none disabled:bm-opacity-50 data-[active]:bm-bg-accent/50 data-[state=open]:bm-bg-accent/50',
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), 'bm-group', className)}
    {...props}
  >
    {children}{' '}
    <ChevronDownIcon
      className="bm-relative bm-top-[1px] bm-ml-1 bm-h-3 bm-w-3 bm-transition bm-duration-300 group-data-[state=open]:bm-rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'bm-left-0 bm-top-0 bm-w-full data-[motion^=from-]:bm-animate-in data-[motion^=to-]:bm-animate-out data-[motion^=from-]:bm-fade-in data-[motion^=to-]:bm-fade-out data-[motion=from-end]:bm-slide-in-from-right-52 data-[motion=from-start]:bm-slide-in-from-left-52 data-[motion=to-end]:bm-slide-out-to-right-52 data-[motion=to-start]:bm-slide-out-to-left-52 md:bm-absolute md:bm-w-auto bm-',
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn('bm-absolute bm-left-0 bm-top-full bm-flex bm-justify-center')}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        'bm-origin-top-center bm-relative bm-mt-1.5 bm-h-[var(--radix-navigation-menu-viewport-height)] bm-w-full bm-overflow-hidden bm-rounded-md bm-border bm-bg-popover bm-text-popover-foreground bm-shadow data-[state=open]:bm-animate-in data-[state=closed]:bm-animate-out data-[state=closed]:bm-zoom-out-95 data-[state=open]:bm-zoom-in-90 md:bm-w-[var(--radix-navigation-menu-viewport-width)]',
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      'bm-top-full bm-z-[1] bm-flex bm-h-1.5 bm-items-end bm-justify-center bm-overflow-hidden data-[state=visible]:bm-animate-in data-[state=hidden]:bm-animate-out data-[state=hidden]:bm-fade-out data-[state=visible]:bm-fade-in',
      className,
    )}
    {...props}
  >
    <div className="bm-relative bm-top-[60%] bm-h-2 bm-w-2 bm-rotate-45 bm-rounded-tl-sm bm-bg-border bm-shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
