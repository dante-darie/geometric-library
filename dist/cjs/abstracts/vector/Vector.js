"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
const _abstracts_1 = require("@abstracts");
const calculator_1 = require("@utilities/calculator");
class Vector {
    kind = 'vector';
    _dx;
    _dy;
    constructor(values) {
        const fromPoints = values.some((value) => typeof value !== 'number');
        if (fromPoints) {
            const [P1, P2] = values;
            this._dx = +calculator_1.Calculator.sub(P2.x, P1.x);
            this._dy = +calculator_1.Calculator.sub(P2.y, P1.y);
            return;
        }
        const [dx, dy] = values;
        this._dx = dx;
        this._dy = dy;
    }
    get dx() {
        return this._dx;
    }
    get dy() {
        return this._dy;
    }
    get magnitude() {
        const { dx, dy } = this;
        return +calculator_1.Calculator.pow(dx, 2).add(calculator_1.Calculator.pow(dy, 2)).sqrt();
    }
    get values() {
        return [this.dx, this.dy];
    }
    angleTo(vector) {
        const dotProd = this.dotProduct(vector);
        const magV1 = this.magnitude;
        const magV2 = vector.magnitude;
        const magProd = calculator_1.Calculator.mul(magV1, magV2);
        const cosAngle = calculator_1.Calculator.div(dotProd, magProd);
        const angle = cosAngle.acos();
        return new _abstracts_1.Angle(+angle, 'radians');
    }
    clone() {
        const { dx, dy } = this;
        return new Vector([dx, dy]);
    }
    dotProduct(vector) {
        const { dx, dy } = this;
        return +calculator_1.Calculator.mul(dx, vector.dx).add(calculator_1.Calculator.mul(dy, vector.dy));
    }
    reflect({ x, y }) {
        this._dx = x ? +calculator_1.Calculator.neg(this.dx) : this.dx;
        this._dy = y ? +calculator_1.Calculator.neg(this.dy) : this.dy;
        return this;
    }
    replace(vector) {
        this._dx = vector.dx;
        this._dy = vector.dy;
        return this;
    }
    rotate(phi) {
        const { dx, dy } = this;
        this._dx = +calculator_1.Calculator.mul(phi.cos, dx).sub(calculator_1.Calculator.mul(phi.sin, dy));
        this._dy = +calculator_1.Calculator.mul(phi.sin, dx).add(calculator_1.Calculator.mul(phi.cos, dy));
        return this;
    }
    scale(factor) {
        const { dx, dy } = this;
        this._dx = +calculator_1.Calculator.mul(dx, factor);
        this._dy = +calculator_1.Calculator.mul(dy, factor);
        return this;
    }
}
exports.Vector = Vector;
