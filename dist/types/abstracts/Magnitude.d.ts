import { IMagnitude } from '../types';
export declare class Magnitude implements IMagnitude {
    private _value;
    constructor(value: number);
    get value(): number;
    clone(): IMagnitude;
    replace(value: number): this;
    scale(factor: number): this;
    valueOf(): number;
}
