import { Calculator } from '../utilities/Calculator';
import { Angle } from './Angle';
export class Vector {
    _dx;
    _dy;
    constructor(values) {
        const fromPoints = values.some((value) => typeof value !== 'number');
        if (fromPoints) {
            const [P1, P2] = values;
            this._dx = +Calculator.sub(P2.x, P1.x);
            this._dy = +Calculator.sub(P2.y, P1.y);
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
        return +Calculator.pow(dx, 2).add(Calculator.pow(dy, 2)).sqrt();
    }
    get values() {
        return [this.dx, this.dy];
    }
    angleTo(vector) {
        const dotProd = this.dotProduct(vector);
        const magV1 = this.magnitude;
        const magV2 = vector.magnitude;
        const magProd = Calculator.mul(magV1, magV2);
        const cosAngle = Calculator.div(dotProd, magProd);
        const angle = cosAngle.acos();
        return new Angle(+angle, 'radians');
    }
    clone() {
        const { dx, dy } = this;
        return new Vector([dx, dy]);
    }
    dotProduct(vector) {
        const { dx, dy } = this;
        return +Calculator.mul(dx, vector.dx).add(Calculator.mul(dy, vector.dy));
    }
    reflect({ x, y }) {
        this._dx = x ? +Calculator.neg(this.dx) : this.dx;
        this._dy = y ? +Calculator.neg(this.dy) : this.dy;
        return this;
    }
    replace(vector) {
        this._dx = vector.dx;
        this._dy = vector.dy;
        return this;
    }
    rotate(phi) {
        const { dx, dy } = this;
        this._dx = +Calculator.mul(phi.cos, dx).sub(Calculator.mul(phi.sin, dy));
        this._dy = +Calculator.mul(phi.sin, dx).add(Calculator.mul(phi.cos, dy));
        return this;
    }
    scale(factor) {
        const { dx, dy } = this;
        this._dx = +Calculator.mul(dx, factor);
        this._dy = +Calculator.mul(dy, factor);
        return this;
    }
}
