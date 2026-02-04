"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Magnitude = void 0;
const calculator_1 = require("@utilities/calculator");
class Magnitude {
    kind = 'magnitude';
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
        this._value = +calculator_1.Calculator.mul(+this, factor);
        return this;
    }
    valueOf() {
        return this._value;
    }
}
exports.Magnitude = Magnitude;
