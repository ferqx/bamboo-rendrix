import { useMemo } from 'react';
import classNames from 'classnames';
import type { SelectorToolOptions, SelectorToolState } from '../../hooks';

export interface SelectorToolProps {
  state: SelectorToolState;
  options?: SelectorToolOptions;
}

export const Selector = ({ state }: SelectorToolProps) => {
  const size = 24;

  const { headerTop, isHeaderBottom } = useMemo(() => {
    const top = state.y - size + 2;
    const bottom = state.y + (state.height || 0) - 2;
    const calculatedHeaderTop = top - 10 < 0 ? bottom : top;
    const calculatedIsHeaderBottom = top - 10 < 0;
    return {
      headerTop: calculatedHeaderTop,
      isHeaderBottom: calculatedIsHeaderBottom,
    };
  }, [state.height, state.y]); // 监听元素的坐标和宽高变化即可

  return (
    <>
      {/* 选择边框 */}
      <div
        className="bm-selector-tool"
        style={{
          transform: `translate(${state.x}px, ${state.y}px)`,
          width: state.width,
          height: `${state.height}px`,
          visibility: state.visible ? 'visible' : 'hidden',
        }}
      ></div>
      <div
        className={classNames('bm-selector-header-popover', { bottom: isHeaderBottom })}
        style={{
          transform: `translate(${state.x}px, ${headerTop}px)`,
          minWidth: state.width,
          visibility: state.visible ? 'visible' : 'hidden',
        }}
      >
        <div className="bm-selector-actions">
          <div className="bm-selector-action-item" style={{ padding: '0 8px' }}>
            {state.selectedNode?.name}
          </div>
        </div>
      </div>
    </>
  );
};

export default Selector;
