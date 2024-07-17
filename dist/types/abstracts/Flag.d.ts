import { IFlag } from '../types';
export declare class Flag implements IFlag {
    private _value;
    constructor(value: boolean);
    get value(): boolean;
    clone(): IFlag;
    invert(): this;
    replace(value: boolean): this;
    valueOf(): number;
}
