import { IAngle, IVector } from '@abstracts';
import { IClonable } from '@types';

export type TPointValues = [number, number];

export interface IPoint extends IClonable<IPoint> {
  readonly kind: 'point';
  readonly values: TPointValues;
  readonly x: number;
  readonly y: number;
  reflect(about: IPoint): this;
  replace(point: IPoint): this;
  rotate(phi: IAngle, about?: IPoint): this;
  translate(vector: IVector): this;
}
