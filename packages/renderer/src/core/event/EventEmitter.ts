import { Disposable, IDisposable } from './Disposable';

export interface IEvent<T> {
  (listener: (e: T) => unknown, thisArgs?: unknown[]): IDisposable;
}

export interface IEventEmitter<T> {
  event: IEvent<T>;
  fire(event: T): void;
}

export class EventEmitter<T> implements IEventEmitter<T> {
  private listeners: Array<{ listener: (e: T) => unknown; thisArgs?: unknown[] }> = [];

  get event(): IEvent<T> {
    return (listener: (e: T) => unknown, thisArgs?: unknown[]) => {
      const wrappedListener = { listener, thisArgs };

      this.listeners.push(wrappedListener);

      // 创建一个Disposable实例用于取消订阅
      const disposable = new Disposable(() => {
        this.listeners = this.listeners.filter((l) => l.listener !== wrappedListener.listener);
      });

      return disposable;
    };
  }

  fire(event: T): void {
    this.listeners.forEach(({ listener, thisArgs }) => listener.call(thisArgs, event));
  }
}
