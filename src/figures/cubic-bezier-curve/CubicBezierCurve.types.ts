import { IFigure, IPoint, IVector } from '@abstracts';
import { IClonable } from '@types';

export type TCubicBezierAbsoluteValues = [IPoint, IPoint, IPoint, IPoint];
export type TCubicBezierRelativeValues = [IPoint, IVector, IVector, IVector];
export type TCubicBezierValues = TCubicBezierAbsoluteValues | TCubicBezierRelativeValues;

export interface ICubicBezierCurve extends IFigure, IClonable<ICubicBezierCurve> {
  readonly criticalPoints: IPoint[];
}
