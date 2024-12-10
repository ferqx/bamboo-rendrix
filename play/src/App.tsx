import { DesignerComponent, useDesigner } from '@bamboo-rendrix/designer';
import componentList from './extensions/component-list';
import { assets } from './components/built-in';
import shadcn from './components/shadcn';

function App() {
  const { designer } = useDesigner({
    canvas: {
      sandbox: {
        src: '/canvas.html',
      },
    },
  });

  designer.extensionManage.registerExtension('componentList', componentList);

  designer.assetsMange.add(assets);
  designer.assetsMange.add(shadcn.assets);

  return <DesignerComponent designer={designer}></DesignerComponent>;
}

export default App;
