import { IFigure, IPoint } from '@abstracts';
import type { ILine } from '../line/Line.types';
import { IClonable } from '@types';

export type TPolygonValues = [IPoint, IPoint, IPoint, ...IPoint[]];

export interface IPolygon extends IFigure, IClonable<IPolygon> {
  readonly lines: ILine[];
  readonly sides: number;
}
