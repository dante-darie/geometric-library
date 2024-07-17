import { IVector, TVectorValues, TSegment, IAngle } from '../types';
export declare class Vector implements IVector {
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
