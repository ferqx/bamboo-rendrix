import { IDisposable } from './Disposable';
import { DisposableStore } from './DisposableStore';
import { EventEmitter } from './EventEmitter';

export interface Emitter<T> {
  onEvent: (listener: (e: T) => void) => IDisposable;
  triggerEvent: (e: T) => void;
}

export class EmitterStore extends DisposableStore {
  createEmitter<T>(): Emitter<T> {
    const emitter = new EventEmitter<T>();

    const onEvent = (listener: (e: T) => void) => {
      return this.add(emitter.event(listener));
    };

    /**
     * 触发节点选中事件
     */
    const triggerEvent = (e: T) => {
      emitter.fire(e);
    };

    return {
      onEvent,
      triggerEvent,
    };
  }
}
