import { IFigure, IMagnitude, IPoint } from '@abstracts';
import { TEllipseCriticalPoints } from '@figures';
import { IClonable } from '@types';
export type TCircleValues = [IPoint, IMagnitude];
export interface ICircle extends IFigure, IClonable<ICircle> {
    readonly center: IPoint;
    readonly criticalPoints: TEllipseCriticalPoints;
    readonly radius: IMagnitude;
}
