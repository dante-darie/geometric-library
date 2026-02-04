"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
const decimal_js_1 = require("decimal.js");
class Calculator {
    static EPSILON = 1e-8;
    static PI2 = +Calculator.mul(Math.PI, 2);
    _instance;
    constructor(arg) {
        this._instance = new decimal_js_1.Decimal(arg);
    }
    // STATIC METHODS
    static abs(arg) {
        return Calculator.computeUnaryOperation('abs', arg);
    }
    static acos(arg) {
        return Calculator.computeUnaryOperation('acos', arg);
    }
    static add(first, second) {
        return Calculator.computeBinaryOperation('add', [first, second]);
    }
    static atan(arg) {
        return Calculator.computeUnaryOperation('atan', arg);
    }
    static atan2(first, second) {
        return Calculator.computeBinaryOperation('atan2', [first, second]);
    }
    static cos(arg) {
        return Calculator.computeUnaryOperation('cos', arg);
    }
    static div(first, second) {
        return Calculator.computeBinaryOperation('div', [first, second]);
    }
    static isEqual(a, b) {
        return Math.abs(a - b) <= Calculator.EPSILON;
    }
    static isNearZero(a) {
        return Math.abs(a) <= Calculator.EPSILON;
    }
    static max(args) {
        return Calculator.computeIndefiniteOperation('max', args);
    }
    static min(args) {
        return Calculator.computeIndefiniteOperation('min', args);
    }
    static mod(first, second) {
        return Calculator.computeBinaryOperation('mod', [first, second]);
    }
    static mul(first, second) {
        return Calculator.computeBinaryOperation('mul', [first, second]);
    }
    static neg(arg) {
        return Calculator.computeUnaryOperation('neg', arg);
    }
    static pow(first, second) {
        return Calculator.computeBinaryOperation('pow', [first, second]);
    }
    static sin(arg) {
        return Calculator.computeUnaryOperation('sin', arg);
    }
    static sqrt(arg) {
        return Calculator.computeUnaryOperation('sqrt', arg);
    }
    static sub(first, second) {
        return Calculator.computeBinaryOperation('sub', [first, second]);
    }
    static tan(arg) {
        return Calculator.computeUnaryOperation('tan', arg);
    }
    // PRIVATE METHODS
    static computeBinaryOperation(operation, args) {
        const [a, b] = Calculator.toDecimalArgs(args);
        const result = decimal_js_1.Decimal[operation](a, b);
        const roundedResult = this.roundDecimalWithPrecision(result);
        return new Calculator(roundedResult);
    }
    static computeIndefiniteOperation(operation, args) {
        const nargs = Calculator.toDecimalArgs(args);
        const result = decimal_js_1.Decimal[operation](...nargs);
        const roundedResult = this.roundDecimalWithPrecision(result);
        return new Calculator(roundedResult);
    }
    static computeUnaryOperation(operation, arg) {
        const [a] = Calculator.toDecimalArgs([arg]);
        const result = new decimal_js_1.Decimal(a)[operation]();
        const roundedResult = this.roundDecimalWithPrecision(result);
        return new Calculator(roundedResult);
    }
    /**
     * @todo The precision calculation could be improved to test at what decimal point is the distance less
     * than epsilon, and then to round up to that point instead of choosing an arbitrary precision.
     */
    static roundDecimalWithPrecision(value) {
        const epsilon = new decimal_js_1.Decimal(Calculator.EPSILON);
        const distanceToLowerInt = value.sub(value.floor());
        const distanceToUpperInt = value.ceil().sub(value);
        if (distanceToLowerInt.lte(epsilon)) {
            return value.floor().toNumber();
        }
        if (distanceToUpperInt.lte(epsilon)) {
            return value.ceil().toNumber();
        }
        return value.toNumber();
    }
    static toDecimalArgs(args) {
        return args.map((arg) => +arg);
    }
    // INSTANCE METHODS
    abs() {
        return Calculator.computeUnaryOperation('abs', this);
    }
    acos() {
        return Calculator.computeUnaryOperation('acos', this);
    }
    add(second) {
        return Calculator.computeBinaryOperation('add', [this, second]);
    }
    atan() {
        return Calculator.computeUnaryOperation('atan', this);
    }
    atan2(second) {
        return Calculator.computeBinaryOperation('atan2', [this, second]);
    }
    cos() {
        return Calculator.computeUnaryOperation('cos', this);
    }
    div(second) {
        return Calculator.computeBinaryOperation('div', [this, second]);
    }
    isFinite() {
        return this._instance.isFinite();
    }
    mod(second) {
        return Calculator.computeBinaryOperation('mod', [this, second]);
    }
    mul(second) {
        return Calculator.computeBinaryOperation('mul', [this, second]);
    }
    neg() {
        return Calculator.computeUnaryOperation('neg', this);
    }
    pow(second) {
        return Calculator.computeBinaryOperation('pow', [this, second]);
    }
    sin() {
        return Calculator.computeUnaryOperation('sin', this);
    }
    sqrt() {
        return Calculator.computeUnaryOperation('sqrt', this);
    }
    sub(second) {
        return Calculator.computeBinaryOperation('sub', [this, second]);
    }
    tan() {
        return Calculator.computeUnaryOperation('tan', this);
    }
    valueOf() {
        return this._instance.toNumber();
    }
}
exports.Calculator = Calculator;
