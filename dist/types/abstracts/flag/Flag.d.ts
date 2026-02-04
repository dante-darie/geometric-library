import { IFlag } from './Flag.types';
export declare class Flag implements IFlag {
    readonly kind: "flag";
    private _value;
    constructor(value: boolean);
    get value(): boolean;
    clone(): IFlag;
    invert(): this;
    replace(value: boolean): this;
    valueOf(): number;
}
