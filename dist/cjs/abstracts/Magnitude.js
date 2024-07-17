"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Magnitude = void 0;
const Calculator_1 = require("../utilities/Calculator");
class Magnitude {
    _value;
    constructor(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
    clone() {
        return new Magnitude(+this);
    }
    replace(value) {
        this._value = value;
        return this;
    }
    scale(factor) {
        this._value = +Calculator_1.Calculator.mul(+this, factor);
        return this;
    }
    valueOf() {
        return this._value;
    }
}
exports.Magnitude = Magnitude;
