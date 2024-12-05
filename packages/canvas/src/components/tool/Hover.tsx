import type { HoverToolState } from '../../hooks/useHoverTool';

export interface HoverProps {
  state: HoverToolState;
}

export function Hover({ state }: HoverProps) {
  return (
    <div
      className="bm-hover-tool"
      style={{
        transform: `translate(${state.x}px, ${state.y}px)`,
        width: state.width + 'px',
        height: state.height + 'px',
        display: state.visible ? 'block' : 'none',
      }}
    ></div>
  );
}
