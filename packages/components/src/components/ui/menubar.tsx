import * as React from "react"
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons"
import * as MenubarPrimitive from "@radix-ui/react-menubar"

import { cn } from "../../lib/utils"

import { Menu } from "@radix-ui/react-menu";

const MenubarMenu: React.FC = Menu;

const MenubarGroup = MenubarPrimitive.Group

const MenubarPortal = MenubarPrimitive.Portal

const MenubarSub = MenubarPrimitive.Sub

const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "bm-flex bm-h-9 bm-items-center bm-space-x-1 bm-rounded-md bm-border bm-bg-background bm-p-1 bm-shadow-sm",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "bm-flex bm-cursor-default bm-select-none bm-items-center bm-rounded-sm bm-px-3 bm-py-1 bm-text-sm bm-font-medium bm-outline-none focus:bm-bg-accent focus:bm-text-accent-foreground data-[state=open]:bm-bg-accent data-[state=open]:bm-text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "bm-flex bm-cursor-default bm-select-none bm-items-center bm-rounded-sm bm-px-2 bm-py-1.5 bm-text-sm bm-outline-none focus:bm-bg-accent focus:bm-text-accent-foreground data-[state=open]:bm-bg-accent data-[state=open]:bm-text-accent-foreground",
      inset && "bm-pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="bm-ml-auto bm-h-4 bm-w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "bm-z-50 bm-min-w-[8rem] bm-overflow-hidden bm-rounded-md bm-border bm-bg-popover bm-p-1 bm-text-popover-foreground bm-shadow-lg data-[state=open]:bm-animate-in data-[state=closed]:bm-animate-out data-[state=closed]:bm-fade-out-0 data-[state=open]:bm-fade-in-0 data-[state=closed]:bm-zoom-out-95 data-[state=open]:bm-zoom-in-95 data-[side=bottom]:bm-slide-in-from-top-2 data-[side=left]:bm-slide-in-from-right-2 data-[side=right]:bm-slide-in-from-left-2 data-[side=top]:bm-slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "bm-z-50 bm-min-w-[12rem] bm-overflow-hidden bm-rounded-md bm-border bm-bg-popover bm-p-1 bm-text-popover-foreground bm-shadow-md data-[state=open]:bm-animate-in data-[state=closed]:bm-fade-out-0 data-[state=open]:bm-fade-in-0 data-[state=closed]:bm-zoom-out-95 data-[state=open]:bm-zoom-in-95 data-[side=bottom]:bm-slide-in-from-top-2 data-[side=left]:bm-slide-in-from-right-2 data-[side=right]:bm-slide-in-from-left-2 data-[side=top]:bm-slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "bm-relative bm-flex bm-cursor-default bm-select-none bm-items-center bm-rounded-sm bm-px-2 bm-py-1.5 bm-text-sm bm-outline-none focus:bm-bg-accent focus:bm-text-accent-foreground data-[disabled]:bm-pointer-events-none data-[disabled]:bm-opacity-50",
      inset && "bm-pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "bm-relative bm-flex bm-cursor-default bm-select-none bm-items-center bm-rounded-sm bm-py-1.5 bm-pl-8 bm-pr-2 bm-text-sm bm-outline-none focus:bm-bg-accent focus:bm-text-accent-foreground data-[disabled]:bm-pointer-events-none data-[disabled]:bm-opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="bm-absolute bm-left-2 bm-flex bm-h-3.5 bm-w-3.5 bm-items-center bm-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <CheckIcon className="bm-h-4 bm-w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "bm-relative bm-flex bm-cursor-default bm-select-none bm-items-center bm-rounded-sm bm-py-1.5 bm-pl-8 bm-pr-2 bm-text-sm bm-outline-none focus:bm-bg-accent focus:bm-text-accent-foreground data-[disabled]:bm-pointer-events-none data-[disabled]:bm-opacity-50",
      className
    )}
    {...props}
  >
    <span className="bm-absolute bm-left-2 bm-flex bm-h-3.5 bm-w-3.5 bm-items-center bm-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <DotFilledIcon className="bm-h-4 bm-w-4 bm-fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "bm-px-2 bm-py-1.5 bm-text-sm bm-font-semibold",
      inset && "bm-pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("bm--mx-1 bm-my-1 bm-h-px bm-bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "bm-ml-auto bm-text-xs bm-tracking-widest bm-text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
