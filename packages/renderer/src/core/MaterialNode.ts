import type { MaterialSchema } from '@bamboo-code/types';

/**
 * 物料节点
 */
export class MaterialNode {
  material?: MaterialSchema;

  private _manifest: MaterialSchema['manifest'];
  public get manifest(): MaterialSchema['manifest'] {
    return this._manifest;
  }
  public set manifest(value: MaterialSchema['manifest']) {
    this._manifest = value;
  }

  private _allowChoice!: boolean;
  public get allowChoice(): boolean {
    if (this.material) {
      return !this.disableAll && !this.material?.disableOperation?.includes('choice');
    }
    return this._allowChoice;
  }
  public set allowChoice(value: boolean) {
    this._allowChoice = value;
  }

  private _allowDelete!: boolean;
  public get allowDelete(): boolean {
    return this._allowDelete;
  }
  public set allowDelete(value: boolean) {
    this._allowDelete = value;
  }

  private _allowMove!: boolean;
  public get allowMove(): boolean {
    return this._allowMove;
  }
  public set allowMove(value: boolean) {
    this._allowMove = value;
  }

  private _allowCopy!: boolean;
  public get allowCopy(): boolean {
    return this._allowCopy;
  }
  public set allowCopy(value: boolean) {
    this._allowCopy = value;
  }

  private _disableAll!: boolean;
  public get disableAll(): boolean {
    return this._disableAll;
  }
  public set disableAll(value: boolean) {
    this._disableAll = value;
  }

  private _isContainer!: boolean;
  public get isContainer(): boolean {
    return this._isContainer;
  }
  public set isContainer(value: boolean) {
    this._isContainer = value;
  }

  private _childLimit!: number;
  public get childLimit(): number {
    return this._childLimit;
  }
  public set childLimit(value: number) {
    this._childLimit = value;
  }

  private _allowToParents!: string[];
  public get allowToParents(): string[] {
    return this._allowToParents;
  }
  public set allowToParents(value: string[]) {
    this._allowToParents = value;
  }

  private _allowChildren!: string[];
  public get allowChildren(): string[] {
    return this._allowChildren;
  }
  public set allowChildren(value: string[]) {
    this._allowChildren = value;
  }

  constructor() {}

  protected initMaterial(material?: MaterialSchema) {
    this.material = material;
    this.manifest = material?.manifest;
    this.disableAll = !!this.material?.disableOperation?.includes('all');
    this.allowDelete = !this.disableAll && !this.material?.disableOperation?.includes('delete');
    this.allowMove = !this.disableAll && !this.material?.disableOperation?.includes('move');
    this.allowCopy = !this.disableAll && !this.material?.disableOperation?.includes('copy');
    this.allowChoice = !this.disableAll && !this.material?.disableOperation?.includes('choice');
    this.isContainer = !!this.material?.isContainer;
    this.childLimit = this.material?.childLimit || Number.MAX_VALUE;
    this.allowToParents = this.material?.allowToParents || [];
    this.allowChildren = this.material?.allowChildren || [];
  }
}
