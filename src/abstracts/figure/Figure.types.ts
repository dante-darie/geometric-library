import { IAngle, IFlag, IMagnitude, IPoint, IVector } from '@abstracts';
import { ILine } from '@figures';
import { IBoundingBox } from '@types';

export type TFigureValue = IFlag | IMagnitude | IAngle | IPoint | IVector;

export type TFigureValues = [IPoint, ...TFigureValue[]];

export interface IFigure {
  readonly boundingBox: IBoundingBox;
  readonly values: TFigureValues;
  reflect(about: IPoint | ILine): this;
  rotate(phi: IAngle, about?: IPoint): this;
  scale(factor: number, about?: IPoint): this;
  translate(vector: IVector): this;
}
