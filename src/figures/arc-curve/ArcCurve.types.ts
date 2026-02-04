import { IAngle, IFigure, IFlag, IMagnitude, IPoint, IVector } from '@abstracts';
import { IClonable } from '@types';

export type TArcAbsoluteValues = [IPoint, IMagnitude, IMagnitude, IAngle, IFlag, IFlag, IPoint];

export type TArcRelativeValues = [IPoint, IMagnitude, IMagnitude, IAngle, IFlag, IFlag, IVector];

export type TArcValues = TArcAbsoluteValues | TArcRelativeValues;

export interface IArcCurve extends IFigure, IClonable<IArcCurve> {
  readonly center: IPoint;
  readonly criticalPoints: IPoint[];
}
