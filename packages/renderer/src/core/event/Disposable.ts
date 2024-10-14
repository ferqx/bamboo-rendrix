export interface IDisposable {
  dispose(): void;
}

export class Disposable implements IDisposable {
  private _isDisposed: boolean = false;

  private _callback: (() => void) | null;

  constructor(callback?: () => void) {
    this._callback = callback || null;
  }

  dispose(): void {
    if (!this._isDisposed) {
      this._isDisposed = true;

      // 执行释放资源的逻辑

      if (this._callback) {
        this._callback();
        this._callback = null;
      }
    }
  }

  get isDisposed(): boolean {
    return this._isDisposed;
  }
}
