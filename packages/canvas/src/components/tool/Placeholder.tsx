import { PlaceholderToolState } from '../../hooks/usePlaceholderTool';

export interface HoverProps {
  state: PlaceholderToolState;
}

export function Placeholder({ state }: HoverProps) {
  return (
    <div
      className="bm-dnd-placeholder"
      style={{
        transform: `translate(${state.x}px, ${state.y}px)`,
        width: state.width + 'px',
        height: state.height + 'px',
        display: state.visible ? 'block' : 'none',
      }}
    ></div>
  );
}
