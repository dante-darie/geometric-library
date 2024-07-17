import { IAngle, IPoint, IVector, TPointValues } from '../types';
export declare class Point implements IPoint {
    private _x;
    private _y;
    constructor([x, y]: TPointValues);
    get values(): TPointValues;
    get x(): number;
    get y(): number;
    clone(): Point;
    reflect(about: IPoint): this;
    replace(point: Point): this;
    rotate(phi: IAngle, about?: IPoint): this;
    translate(vector: IVector): this;
}
