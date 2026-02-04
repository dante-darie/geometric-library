import { IClonable } from '@types';
export type TAngleUnit = 'radians' | 'degrees';
export interface IAngle extends IClonable<IAngle> {
    readonly cos: number;
    readonly cot: number;
    readonly degrees: number;
    readonly kind: 'angle';
    readonly radians: number;
    readonly sin: number;
    readonly tan: number;
    normalize(): this;
    replace(value: number, unit: TAngleUnit): this;
    scale(factor: number): this;
    valueOf(): number;
}
export type TAngleRange = [IAngle, IAngle];
