import { Calculator } from '../utilities/Calculator';
const PI2 = +Calculator.mul(Math.PI, 2);
export class Angle {
    _radians;
    constructor(value, unit) {
        this._radians = unit === 'radians' ? value : Angle.toRadians(value);
    }
    get cos() {
        return +Calculator.cos(this.radians);
    }
    get cot() {
        return +Calculator.div(1, this.tan);
    }
    get degrees() {
        return Angle.toDegrees(this.radians);
    }
    get radians() {
        return this._radians;
    }
    get sin() {
        return +Calculator.sin(this.radians);
    }
    get tan() {
        return +Calculator.tan(this.radians);
    }
    static toDegrees(radians) {
        return +Calculator.mul(radians, 180).div(Math.PI);
    }
    static toRadians(degrees) {
        return +Calculator.mul(degrees, Math.PI).div(180);
    }
    clone() {
        return new Angle(this.radians, 'radians');
    }
    normalize() {
        const { radians } = this;
        if (radians < 0) {
            this._radians = +Calculator.add(radians, PI2);
        }
        else if (radians > 0) {
            this._radians = +Calculator.mod(radians, PI2);
        }
        return this;
    }
    replace(value, unit) {
        this._radians = unit === 'radians' ? value : Angle.toRadians(value);
        return this;
    }
    scale(factor) {
        this._radians = +Calculator.mul(this.radians, factor);
        return this;
    }
    valueOf() {
        return this.radians;
    }
}
