import { useMemo } from 'react';
import classNames from 'classnames';
import type { SelectorToolOptions, SelectorToolState } from '../../hooks';

export interface SelectorToolProps {
  state: SelectorToolState;
  options?: SelectorToolOptions;
}

export const Selector = ({ state }: SelectorToolProps) => {
  const size = 24;

  const { x, y, visible, name, width, height, headerTop, isHeaderBottom } = useMemo(() => {
    const top = state.y - size + 2;
    const bottom = state.y + (state.height || 0) - 2;
    const calculatedHeaderTop = top - 10 < 0 ? bottom : top;
    const calculatedIsHeaderBottom = top - 10 < 0;
    return {
      ...state,
      headerTop: calculatedHeaderTop,
      isHeaderBottom: calculatedIsHeaderBottom,
      name: state.selectedNode?.name || '',
    };
  }, [state.x, state.y, state.width, state.height]); // 监听元素的坐标和宽高变化即可

  return (
    <>
      {/* 选择边框 */}
      <div
        className="bm-selector-tool"
        style={{
          transform: `translate(${x}px, ${y}px)`,
          width: width,
          height: `${height}px`,
          visibility: visible ? 'visible' : 'hidden',
        }}
      ></div>
      <div
        className={classNames('bm-selector-header-popover', { bottom: isHeaderBottom })}
        style={{
          transform: `translate(${x}px, ${headerTop}px)`,
          minWidth: width,
          visibility: visible ? 'visible' : 'hidden',
        }}
      >
        <div className="bm-selector-actions">
          <div className="bm-selector-action-item" style={{ padding: '0 8px' }}>
            {name}
          </div>
        </div>
      </div>
    </>
  );
};

export default Selector;
