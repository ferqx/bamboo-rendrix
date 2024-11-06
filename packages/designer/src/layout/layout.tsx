import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@bamboo/components';
import { LifeBuoy, Share, SquareUser, Triangle } from 'lucide-react';
import classNames from 'classnames';
import { Layout } from '../core';
interface LayoutProps {
  layout: Layout;
  children: React.ReactNode;
}

export function LayoutComponent(props: LayoutProps) {
  const { activeBar, topToolBar } = props.layout;

  return (
    <div className="flex h-screen w-full">
      <aside className="z-20 flex h-full flex-col border-r">
        <div className="border-b h-[57px] p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          {activeBar.views.map((item) => {
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={classNames('rounded-lg', { 'bg-muted': false })}
                    aria-label="Models"
                  >
                    <item.icon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  {item.name}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="Help">
                <LifeBuoy className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Help
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="Account">
                <SquareUser className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Account
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Bamboo</h1>
          <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
            <Share className="size-3.5" />
            发布
          </Button>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3 relative bg-[#e5e5e5]">
          {props.children}
        </main>
      </div>
    </div>
  );
}
