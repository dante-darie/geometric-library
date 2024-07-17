"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Angle = void 0;
const Calculator_1 = require("../utilities/Calculator");
const PI2 = +Calculator_1.Calculator.mul(Math.PI, 2);
class Angle {
    _radians;
    constructor(value, unit) {
        this._radians = unit === 'radians' ? value : Angle.toRadians(value);
    }
    get cos() {
        return +Calculator_1.Calculator.cos(this.radians);
    }
    get cot() {
        return +Calculator_1.Calculator.div(1, this.tan);
    }
    get degrees() {
        return Angle.toDegrees(this.radians);
    }
    get radians() {
        return this._radians;
    }
    get sin() {
        return +Calculator_1.Calculator.sin(this.radians);
    }
    get tan() {
        return +Calculator_1.Calculator.tan(this.radians);
    }
    static toDegrees(radians) {
        return +Calculator_1.Calculator.mul(radians, 180).div(Math.PI);
    }
    static toRadians(degrees) {
        return +Calculator_1.Calculator.mul(degrees, Math.PI).div(180);
    }
    clone() {
        return new Angle(this.radians, 'radians');
    }
    normalize() {
        const { radians } = this;
        if (radians < 0) {
            this._radians = +Calculator_1.Calculator.add(radians, PI2);
        }
        else if (radians > 0) {
            this._radians = +Calculator_1.Calculator.mod(radians, PI2);
        }
        return this;
    }
    replace(value, unit) {
        this._radians = unit === 'radians' ? value : Angle.toRadians(value);
        return this;
    }
    scale(factor) {
        this._radians = +Calculator_1.Calculator.mul(this.radians, factor);
        return this;
    }
    valueOf() {
        return this.radians;
    }
}
exports.Angle = Angle;
