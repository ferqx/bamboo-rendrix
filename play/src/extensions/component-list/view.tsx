import { withDrag } from '@bamboo-rendrix/renderer';
import type { AssetSchema } from '@bamboo-rendrix/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@bamboo-rendrix/components';
import { Square } from 'lucide-react';

export const ComponentList = ({ assets }: { assets: AssetSchema[] }) => {
  const DragComponent = withDrag((props) => (
    <div
      {...props}
      className="text-sm font-medium flex flex-col items-center justify-between bg-popover p-4 hover:bg-accent hover:text-accent-foreground border-r border-b border-zinc-200 [&:nth-child(3n)]:border-r-0 select-none cursor-pointer"
    >
      <Square />
      {props.children}
    </div>
  ));

  console.log(assets);

  return (
    <div>
      <Tabs defaultValue={String(assets[0]?.id || '')} orientation={'vertical'}>
        <TabsList className="py-0  bg-transparent border-b rounded-none w-full justify-start">
          {assets.map((item) => {
            return (
              <TabsTrigger
                key={item.id}
                value={String(item.id)}
                className="h-9 !shadow-none !rounded-none border-b-transparent border-b data-[state=active]:border-primary"
              >
                {item.name}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {assets
          .map((item) => ({ id: item.id, snippets: item.components.map((com) => com.snippets || []).flat() }))
          .map((item) => {
            return (
              <TabsContent key={String(item.id)} value={String(item.id)}>
                <div className="grid grid-cols-3 -mt-2">
                  {item.snippets.map((snippet, index) => {
                    return (
                      <DragComponent key={index} data={snippet.schema} dragType={'copy'}>
                        <p className="mt-3">{snippet.name}</p>
                      </DragComponent>
                    );
                  })}
                </div>
              </TabsContent>
            );
          })}
      </Tabs>
    </div>
  );
};
