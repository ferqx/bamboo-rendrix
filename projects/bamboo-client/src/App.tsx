import { DesignerComponent, useDesigner } from '@bamboo/designer';

function App() {
  const designer = useDesigner({
    canvas: {
      sandbox: {
        src: '/canvas.html',
      },
    },
  });

  return <DesignerComponent {...designer}></DesignerComponent>;
}

export default App;
