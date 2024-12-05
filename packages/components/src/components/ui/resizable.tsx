import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import * as ResizablePrimitive from 'react-resizable-panels';

import { cn } from '../../lib/utils';

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn('bm-flex bm-h-full bm-w-full data-[panel-group-direction=vertical]:bm-flex-col', className)}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      'bm-relative bm-flex bm-w-px bm-items-center bm-justify-center bm-bg-border after:bm-absolute after:bm-inset-y-0 after:bm-left-1/2 after:bm-w-1 after:bm--translate-x-1/2 focus-visible:bm-outline-none focus-visible:bm-ring-1 focus-visible:bm-ring-ring focus-visible:bm-ring-offset-1 data-[panel-group-direction=vertical]:bm-h-px data-[panel-group-direction=vertical]:bm-w-full data-[panel-group-direction=vertical]:after:bm-left-0 data-[panel-group-direction=vertical]:after:bm-h-1 data-[panel-group-direction=vertical]:after:bm-w-full data-[panel-group-direction=vertical]:after:bm--translate-y-1/2 data-[panel-group-direction=vertical]:after:bm-translate-x-0 [&[data-panel-group-direction=vertical]>div]:bm-rotate-90',
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="bm-z-10 bm-flex bm-h-4 bm-w-3 bm-items-center bm-justify-center bm-rounded-sm bm-border bm-bg-border">
        <DragHandleDots2Icon className="bm-h-2.5 bm-w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
