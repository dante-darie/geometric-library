import { IAngle } from '@abstracts';
import { IClonable } from '@types';
export type TVectorValues = [number, number];
export interface IVector extends IClonable<IVector> {
    readonly dx: number;
    readonly dy: number;
    readonly kind: 'vector';
    readonly magnitude: number;
    readonly values: TVectorValues;
    angleTo(vector: IVector): IAngle;
    dotProduct(vector: IVector): number;
    reflect(about: {
        x: boolean;
        y: boolean;
    }): this;
    replace(vector: IVector): this;
    rotate(phi: IAngle): this;
    scale(factor: number): this;
}
