import { Calculator } from 'utilities/Calculator';
export class Point {
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
        this._x = +Calculator.sub(about.x, x).mul(2).add(x);
        this._y = +Calculator.sub(about.y, y).mul(2).add(y);
        return this;
    }
    replace(point) {
        this._x = point.x;
        this._y = point.y;
        return this;
    }
    rotate(phi, about = new Point([0, 0])) {
        const dx = Calculator.sub(this.x, about.x);
        const dy = Calculator.sub(this.y, about.y);
        this._x = +dx.mul(phi.cos).sub(dy.mul(phi.sin)).add(about.x);
        this._y = +dy.mul(phi.cos).add(dx.mul(phi.sin)).add(about.y);
        return this;
    }
    translate(vector) {
        const { x, y } = this;
        this._x = +Calculator.add(x, vector.dx);
        this._y = +Calculator.add(y, vector.dy);
        return this;
    }
}
