import { IAngle, IFigure, IMagnitude, IPoint } from '@abstracts';
import { IClonable } from '@types';

export type TEllipseValues = [IPoint, IMagnitude, IMagnitude, IAngle];

export type TEllipseCriticalPoints = [IPoint, IPoint, IPoint, IPoint];

export interface IEllipse extends IFigure, IClonable<IEllipse> {
  readonly center: IPoint;
  readonly criticalPoints: TEllipseCriticalPoints;
  readonly phi: IAngle;
  readonly rx: IMagnitude;
  readonly ry: IMagnitude;
  computePointForTheta(theta: IAngle): IPoint;
  computeThetaForPoint(point: IPoint): IAngle;
}
