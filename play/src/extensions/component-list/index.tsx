import type { ExtensionApi } from '@bamboo-code/designer';
import { Button } from '@bamboo-code/components';
import { ComponentIcon, LifeBuoy, Save } from 'lucide-react';
import { ComponentList } from './view';
import React from 'react';

const install = (context: ExtensionApi) => {
  context.addActivityBar({
    name: '组件列表',
    component: ComponentList,
    icon: ComponentIcon,
  });
  context.addAction([
    {
      name: '保存',
      component: React.forwardRef<HTMLButtonElement>((props, ref) => (
        <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm" ref={ref}>
          <Save className="size-3.5" />
          保存
        </Button>
      )),
      placement: 'topRight',
    },
    {
      name: '设置',
      component: React.forwardRef((props, ref) => (
        <Button variant="ghost" size="icon" className="mt-auto rounded-lg" ref={ref as React.Ref<HTMLButtonElement>}>
          <LifeBuoy className="size-5" />
        </Button>
      )),
      placement: 'leftBottom',
    },
  ]);
};

export default install;
