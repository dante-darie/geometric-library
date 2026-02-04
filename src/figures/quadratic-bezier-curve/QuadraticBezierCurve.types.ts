import { IFigure, IPoint, IVector } from '@abstracts';
import { IClonable } from '@types';

export type TQuadraticBezierAbsoluteValues = [IPoint, IPoint, IPoint];
export type TQuadraticBezierRelativeValues = [IPoint, IVector, IVector];
export type TQuadraticBezierValues = TQuadraticBezierAbsoluteValues | TQuadraticBezierRelativeValues;

export interface IQuadraticBezierCurve extends IFigure, IClonable<IQuadraticBezierCurve> {
  readonly criticalPoints: IPoint[];
}
