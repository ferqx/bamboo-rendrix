import type { IDisposable } from './Disposable';

export class DisposableStore implements IDisposable {
  private disposables: IDisposable[] = [];

  add<T extends IDisposable>(disposable: T): T {
    this.disposables.push(disposable);
    return disposable;
  }

  dispose(): void {
    this.disposables.forEach((disposable) => {
      disposable.dispose();
    });
    this.disposables = [];
  }
}
