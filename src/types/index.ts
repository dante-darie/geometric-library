export type TAxis = 'x' | 'y';
export type TAxii = ['x', 'y'];

export interface IBoundingBox {
  xMax: number;
  xMin: number;
  yMax: number;
  yMin: number;
}

export interface ISize {
  height: number;
  width: number;
}

export interface IClonable<T> {
  clone(): T;
}
