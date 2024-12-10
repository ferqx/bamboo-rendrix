import type { ExtensionApi } from '@bamboo-rendrix/designer';
import { ComponentIcon } from 'lucide-react';
import { ComponentList } from './view';

const install = (context: ExtensionApi) => {
  context.addActivityBar({
    name: '组件列表',
    component: () => <ComponentList assets={context.assets} />,
    icon: ComponentIcon,
  });
  // context.addAction([
  //   {
  //     name: '保存',
  //     component: React.forwardRef<HTMLButtonElement>((props, ref) => (
  //       <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm" ref={ref}>
  //         <Save className="size-3.5" />
  //         保存
  //       </Button>
  //     )),
  //     placement: 'topRight',
  //   },
  //   {
  //     name: '设置',
  //     component: React.forwardRef((props, ref) => (
  //       <Button variant="ghost" size="icon" className="mt-auto rounded-lg" ref={ref as React.Ref<HTMLButtonElement>}>
  //         <LifeBuoy className="size-5" />
  //       </Button>
  //     )),
  //     placement: 'leftBottom',
  //   },
  // ]);
};

export default install;
