import { IAngle, TAngleUnit } from './Angle.types';
export declare class Angle implements IAngle {
    readonly kind: "angle";
    private _radians;
    constructor(value: number, unit: TAngleUnit);
    get cos(): number;
    get cot(): number;
    get degrees(): number;
    get radians(): number;
    get sin(): number;
    get tan(): number;
    static toDegrees(radians: number): number;
    static toRadians(degrees: number): number;
    clone(): IAngle;
    normalize(): this;
    replace(value: number, unit: TAngleUnit): this;
    scale(factor: number): this;
    valueOf(): number;
}
