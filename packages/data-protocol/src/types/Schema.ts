export interface RenderSchema {
  id?: string | number;
  componentName: string;
  props?: Record<string, unknown>;
  children?: (RenderSchema | string)[];
}
