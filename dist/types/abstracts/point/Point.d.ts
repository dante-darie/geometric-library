import { IAngle, IPoint, IVector, TPointValues } from '@abstracts';
export declare class Point implements IPoint {
    readonly kind: "point";
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
