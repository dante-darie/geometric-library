export class Flag {
    _value;
    constructor(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
    clone() {
        return new Flag(this._value);
    }
    invert() {
        this._value = !this._value;
        return this;
    }
    replace(value) {
        this._value = value;
        return this;
    }
    valueOf() {
        return +this._value;
    }
}
