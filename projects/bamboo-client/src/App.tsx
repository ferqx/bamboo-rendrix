import { DesignerComponent, useDesigner } from '@bamboo/designer';

function App() {
  const designer = useDesigner({
    canvas: {
      sandbox: {
        src: '/canvas.html',
        load(_, renderer) {
          renderer.onReloadChange(() => {
            console.log('onReloadChange');
          });
        },
      },
    },
  });

  return <DesignerComponent {...designer}></DesignerComponent>;
}

export default App;
