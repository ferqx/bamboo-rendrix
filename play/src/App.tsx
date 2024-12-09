import { DesignerComponent, useDesigner } from '@bamboo-rendrix/designer';
import componentList from './extensions/component-list';
import { assets } from './components';

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

  return <DesignerComponent designer={designer}></DesignerComponent>;
}

export default App;
