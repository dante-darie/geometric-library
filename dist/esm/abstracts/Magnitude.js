import { Calculator } from '../utilities/Calculator';
export class Magnitude {
    _value;
    constructor(value) {
        this._value = value;
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
