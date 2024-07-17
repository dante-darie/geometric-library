type TInput = Calculator | number;
export declare class Calculator {
    private _instance;
    constructor(arg: number);
    static abs(arg: TInput): Calculator;
    static acos(arg: TInput): Calculator;
    static add(first: TInput, second: TInput): Calculator;
    static atan(arg: TInput): Calculator;
    static atan2(first: TInput, second: TInput): Calculator;
    static cos(arg: TInput): Calculator;
    static div(first: TInput, second: TInput): Calculator;
    static max(args: TInput[]): Calculator;
    static min(args: TInput[]): Calculator;
    static mod(first: TInput, second: TInput): Calculator;
    static mul(first: TInput, second: TInput): Calculator;
    static neg(arg: TInput): Calculator;
    static pow(first: TInput, second: TInput): Calculator;
    static sin(arg: TInput): Calculator;
    static sqrt(arg: TInput): Calculator;
    static sub(first: TInput, second: TInput): Calculator;
    static tan(arg: TInput): Calculator;
    private static computeBinaryOperation;
    private static computeIndefiniteOperation;
    private static computeUnaryOperation;
    /**
     * @todo The precision calculation could be improved to test at what decimal point is the distance less
     * than epsilon, and then to round up to that point instead of choosing an arbitrary precision.
     */
    private static roundDecimalWithPrecision;
    private static toDecimalArgs;
    abs(): Calculator;
    acos(): Calculator;
    add(second: TInput): Calculator;
    atan(): Calculator;
    atan2(second: TInput): Calculator;
    cos(): Calculator;
    div(second: TInput): Calculator;
    isFinite(): boolean;
    mod(second: TInput): Calculator;
    mul(second: TInput): Calculator;
    neg(): Calculator;
    pow(second: TInput): Calculator;
    sin(): Calculator;
    sqrt(): Calculator;
    sub(second: TInput): Calculator;
    tan(): Calculator;
    valueOf(): number;
}
export {};
