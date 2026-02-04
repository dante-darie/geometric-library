import { IMagnitude, TFigureValues } from '@abstracts';
import { Ellipse } from '../ellipse/Ellipse';
import type { ICircle, IEllipse, TCircleValues, TEllipseCriticalPoints } from '@figures';
export declare class Circle extends Ellipse implements ICircle {
    private _radius;
    constructor(values: TCircleValues);
    get isCircle(): boolean;
    get radius(): IMagnitude;
    get values(): TFigureValues;
    set values(values: TFigureValues);
    clone(): Circle;
    protected computeCriticalPoints(ellipse?: IEllipse): TEllipseCriticalPoints;
}
