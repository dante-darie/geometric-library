import { ICircle, IEllipse, IMagnitude, TCircleValues, TEllipseCriticalPoints, TFigureValues } from '../types';
import { Ellipse } from './Ellipse';
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
