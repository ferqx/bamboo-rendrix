import * as React from 'react';
import { type DialogProps } from '@radix-ui/react-dialog';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Command as CommandPrimitive } from 'cmdk';

import { cn } from '../../lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'bm-flex bm-h-full bm-w-full bm-flex-col bm-overflow-hidden bm-rounded-md bm-bg-popover bm-text-popover-foreground',
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

type CommandDialogProps = DialogProps;

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="bm-overflow-hidden bm-p-0">
        <Command className="[&_[cmdk-group-heading]]:bm-px-2 [&_[cmdk-group-heading]]:bm-font-medium [&_[cmdk-group-heading]]:bm-text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:bm-pt-0 [&_[cmdk-group]]:bm-px-2 [&_[cmdk-input-wrapper]_svg]:bm-h-5 [&_[cmdk-input-wrapper]_svg]:bm-w-5 [&_[cmdk-input]]:bm-h-12 [&_[cmdk-item]]:bm-px-2 [&_[cmdk-item]]:bm-py-3 [&_[cmdk-item]_svg]:bm-h-5 [&_[cmdk-item]_svg]:bm-w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="bm-flex bm-items-center bm-border-b bm-px-3">
    <MagnifyingGlassIcon className="bm-mr-2 bm-h-4 bm-w-4 bm-shrink-0 bm-opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'bm-flex bm-h-10 bm-w-full bm-rounded-md bm-bg-transparent bm-py-3 bm-text-sm bm-outline-none placeholder:bm-text-muted-foreground disabled:bm-cursor-not-allowed disabled:bm-opacity-50',
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('bm-max-h-[300px] bm-overflow-y-auto bm-overflow-x-hidden', className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => <CommandPrimitive.Empty ref={ref} className="bm-py-6 bm-text-center bm-text-sm" {...props} />);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'bm-overflow-hidden bm-p-1 bm-text-foreground [&_[cmdk-group-heading]]:bm-px-2 [&_[cmdk-group-heading]]:bm-py-1.5 [&_[cmdk-group-heading]]:bm-text-xs [&_[cmdk-group-heading]]:bm-font-medium [&_[cmdk-group-heading]]:bm-text-muted-foreground',
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn('bm--mx-1 bm-h-px bm-bg-border', className)} {...props} />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'bm-relative bm-flex bm-cursor-default bm-select-none bm-items-center bm-rounded-sm bm-px-2 bm-py-1.5 bm-text-sm bm-outline-none data-[disabled=true]:bm-pointer-events-none data-[selected=true]:bm-bg-accent data-[selected=true]:bm-text-accent-foreground data-[disabled=true]:bm-opacity-50',
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={cn('bm-ml-auto bm-text-xs bm-tracking-widest bm-text-muted-foreground', className)} {...props} />
  );
};
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
