import { useLayoutEffect } from 'react';

const nextTickQueue: Function[] = [];

/**
 * 在下次 UI 更新后执行回调
 */
export function nextTick(callback: (...args: any[]) => void) {
  nextTickQueue.push(callback);
}

/**
 * 用于触发 nextTick 队列中的回调
 */
export function useNextTick() {
  useLayoutEffect(() => {
    // 更新完成后，执行所有在 nextTick 中注册的回调
    if (nextTickQueue.length > 0) {
      const pendingCallbacks = [...nextTickQueue];
      nextTickQueue.length = 0; // 清空队列
      pendingCallbacks.forEach((callback) => callback());
      console.log('layout update end');
    }
  });
}
