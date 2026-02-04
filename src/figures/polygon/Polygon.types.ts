import { IFigure, IPoint } from '@abstracts';
import { IClonable } from '@types';

export type TPolygonValues = [IPoint, IPoint, IPoint, ...IPoint[]];

export interface IPolygon extends IFigure, IClonable<IPolygon> {
  readonly sides: number;
}
