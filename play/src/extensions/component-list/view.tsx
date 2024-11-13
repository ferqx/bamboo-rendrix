import { withDrag } from '@bamboo/renderer';
import {} from '@bamboo/components';
import { Square } from 'lucide-react';

export const ComponentList = () => {
  const DragComponent = withDrag((props) => (
    <div
      {...props}
      className="text-sm font-medium flex flex-col items-center justify-between bg-popover p-4 hover:bg-accent hover:text-accent-foreground border-r border-b border-zinc-200 [&:nth-child(3n)]:border-r-0 select-none cursor-pointer"
    >
      <Square />
      <p className="mt-3">{props.data.componentName}</p>
    </div>
  ));

  return (
    <div className="grid grid-cols-3">
      <DragComponent data={{ componentName: 'button' }} dragType={'copy'} />
      <DragComponent data={{ componentName: 'inputNumber' }} dragType={'copy'} />
      <DragComponent data={{ componentName: 'input' }} dragType={'copy'} />
    </div>
  );
};
