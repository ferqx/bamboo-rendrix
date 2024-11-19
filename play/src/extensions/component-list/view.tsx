import { withDrag } from '@bamboo/renderer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@bamboo/components';
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
    <div>
      <Tabs defaultValue="base" orientation={'vertical'}>
        <TabsList className="py-0  bg-transparent border-b rounded-none w-full justify-start">
          <TabsTrigger
            value="base"
            className="h-9 !shadow-none !rounded-none border-b-transparent border-b data-[state=active]:border-primary"
          >
            基础
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="h-9 !shadow-none !rounded-none border-b-transparent border-b data-[state=active]:border-primary"
          >
            高级
          </TabsTrigger>
        </TabsList>
        <TabsContent value="base">
          <div className="grid grid-cols-3 -mt-2">
            <DragComponent data={{ componentName: 'button' }} dragType={'copy'} />
            <DragComponent data={{ componentName: 'inputNumber' }} dragType={'copy'} />
            <DragComponent data={{ componentName: 'input' }} dragType={'copy'} />
          </div>
        </TabsContent>
        <TabsContent value="advanced"></TabsContent>
      </Tabs>
    </div>
  );
};
