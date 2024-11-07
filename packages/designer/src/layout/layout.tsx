import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@bamboo/components';
import { LifeBuoy, Share, SquareUser, Triangle, X } from 'lucide-react';
import classNames from 'classnames';
import { Layout } from '../core';
import { useActiveBar } from '../hooks/useActiveBar';

interface LayoutProps {
  layout: Layout;
  children: React.ReactNode;
}

export function LayoutComponent(props: LayoutProps) {
  const { activeBar, topToolBar } = props.layout;

  const { activatedBar, activatedView, closeView } = useActiveBar(activeBar.views);

  const ActivatedView = () => {
    if (activatedBar) {
      return (
        <div className="w-80 top-0 left-0">
          <div className="relative p-4 flex justify-between items-center">
            <p className="text-lg">{activatedBar.name}</p>
            <Button variant="outline" size="icon" className="size-7 border-0" onClick={() => closeView()}>
              <X className="size-4 fill-foreground" />
            </Button>
          </div>
          <activatedBar.component />
        </div>
      );
    }
    return null;
  };

  const ActiveBarNavButtons = () => {
    return (
      <>
        {activeBar.views.map((item) => {
          return (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={classNames('rounded-lg', { 'bg-muted': activatedBar?.id === item.id })}
                  onClick={() => activatedView(item.id)}
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
      </>
    );
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background pr-4 pl-0.5">
        <div className=" h-[57px] p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <h1 className="text-xl font-semibold">Bamboo</h1>
        <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
          <Share className="size-3.5" />
          发布
        </Button>
      </header>
      <div className="flex flex-1">
        <aside className="relative z-20 flex h-full border-r">
          <div className="flex flex-col flex-1 border-r border-t-slate-300">
            <nav className="p-2">
              <ActiveBarNavButtons />
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
          </div>
          <ActivatedView />
        </aside>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3 relative bg-[#e5e5e5]">
          {props.children}
        </main>
      </div>
    </div>
  );
}
