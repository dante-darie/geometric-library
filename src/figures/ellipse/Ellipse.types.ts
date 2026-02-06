import { IAngle, IFigure, IMagnitude, IPoint } from '@abstracts';
import { CubicBezierCurve } from '@figures/cubic-bezier-curve';
import { IClonable } from '@types';

export type TEllipseValues = [IPoint, IMagnitude, IMagnitude, IAngle];

export type TEllipseCriticalPoints = [IPoint, IPoint, IPoint, IPoint];

export type TEllipseCubicBezierCurves = [CubicBezierCurve, CubicBezierCurve, CubicBezierCurve, CubicBezierCurve];

export interface IEllipse extends IFigure, IClonable<IEllipse> {
  readonly center: IPoint;
  readonly criticalPoints: TEllipseCriticalPoints;
  readonly phi: IAngle;
  readonly rx: IMagnitude;
  readonly ry: IMagnitude;
  computePointForTheta(theta: IAngle): IPoint;
  computeThetaForPoint(point: IPoint): IAngle;
  toCubicBezierCurves(): TEllipseCubicBezierCurves;
}
