import { IVector, TVectorValues, IAngle } from '@abstracts';
import type { TSegment } from '@figures';
export declare class Vector implements IVector {
    readonly kind: "vector";
    private _dx;
    private _dy;
    constructor(values: TVectorValues | TSegment);
    get dx(): number;
    get dy(): number;
    get magnitude(): number;
    get values(): TVectorValues;
    angleTo(vector: Vector): IAngle;
    clone(): Vector;
    dotProduct(vector: Vector): number;
    reflect({ x, y }: {
        x: boolean;
        y: boolean;
    }): this;
    replace(vector: Vector): this;
    rotate(phi: IAngle): this;
    scale(factor: number): this;
}
