import { DesignerComponent, useDesigner } from '@bamboo/designer';
import componentList from './extensions/component-list';

function App() {
  const { designer } = useDesigner({
    canvas: {
      sandbox: {
        src: '/canvas.html',
      },
    },
  });

  designer.extensionManage.registerExtension('componentList', componentList);

  return <DesignerComponent designer={designer}></DesignerComponent>;
}

export default App;
