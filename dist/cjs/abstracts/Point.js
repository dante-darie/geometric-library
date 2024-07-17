"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
const Calculator_1 = require("../utilities/Calculator");
class Point {
    _x;
    _y;
    constructor([x, y]) {
        this._x = x;
        this._y = y;
    }
    get values() {
        return [this.x, this.y];
    }
    get x() {
        return +this._x;
    }
    get y() {
        return +this._y;
    }
    clone() {
        const { x, y } = this;
        return new Point([x, y]);
    }
    reflect(about) {
        const { x, y } = this;
        this._x = +Calculator_1.Calculator.sub(about.x, x).mul(2).add(x);
        this._y = +Calculator_1.Calculator.sub(about.y, y).mul(2).add(y);
        return this;
    }
    replace(point) {
        this._x = point.x;
        this._y = point.y;
        return this;
    }
    rotate(phi, about = new Point([0, 0])) {
        const dx = Calculator_1.Calculator.sub(this.x, about.x);
        const dy = Calculator_1.Calculator.sub(this.y, about.y);
        this._x = +dx.mul(phi.cos).sub(dy.mul(phi.sin)).add(about.x);
        this._y = +dy.mul(phi.cos).add(dx.mul(phi.sin)).add(about.y);
        return this;
    }
    translate(vector) {
        const { x, y } = this;
        this._x = +Calculator_1.Calculator.add(x, vector.dx);
        this._y = +Calculator_1.Calculator.add(y, vector.dy);
        return this;
    }
}
exports.Point = Point;
