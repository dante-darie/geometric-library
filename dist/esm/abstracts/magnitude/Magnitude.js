import { Calculator } from '@utilities/calculator';
export class Magnitude {
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
        this._value = +Calculator.mul(+this, factor);
        return this;
    }
    valueOf() {
        return this._value;
    }
}
