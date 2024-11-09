import { ExtensionApi } from '@bamboo/designer';
import { ComponentIcon } from 'lucide-react';
import { ComponentList } from './view';

const install = (context: ExtensionApi) => {
  context.addActivityBar({
    name: '组件列表',
    component: ComponentList,
    icon: ComponentIcon,
  });
};

export default install;
