import { Figure, Point } from '@abstracts';
import { Calculator } from '@utilities/calculator';
export class QuadraticBezierCurve extends Figure {
    _criticalPoints;
    constructor(values) {
        super(values);
        this._criticalPoints = this.computeCriticalPoints();
    }
    get boundingBox() {
        const [P0, , P2] = this.values;
        const points = [P0, P2, ...this._criticalPoints];
        return Figure.computeBoundingBox(points);
    }
    get criticalPoints() {
        return this._criticalPoints;
    }
    get P0() {
        return this.points[0];
    }
    get P1() {
        if (this.isRelative) {
            return this.P0.clone().translate(this.vectors[0]);
        }
        return this.points[1];
    }
    get P2() {
        if (this.isRelative) {
            return this.P0.clone().translate(this.vectors[1]);
        }
        return this.points[2];
    }
    clone() {
        const values = this.values.map((value) => value.clone());
        return new QuadraticBezierCurve(values);
    }
    recompute() {
        this._criticalPoints = this.computeCriticalPoints();
    }
    reflect(about) {
        super.reflect(about);
        this.recompute();
        return this;
    }
    rotate(phi, about) {
        super.rotate(phi, about);
        this.recompute();
        return this;
    }
    scale(factor, about) {
        super.scale(factor, about);
        this.recompute();
        return this;
    }
    translate(vector) {
        super.translate(vector);
        this.recompute();
        return this;
    }
    computeCriticalPoints() {
        const t = this.getCriticalPointTValue();
        if (typeof t === 'undefined') {
            return [];
        }
        const point = this.getPointAtParameter(t);
        if (!point) {
            return [];
        }
        return [point];
    }
    getCoordinateAtParameter(t, axis) {
        const { P0, P1, P2 } = this;
        const coordinate = Calculator.sub(1, t).pow(2).mul(P0[axis]).add(Calculator.sub(1, t).mul(2).mul(t).mul(P1[axis])).add(t.pow(2).mul(P2[axis]));
        if (coordinate.isFinite()) {
            return coordinate;
        }
    }
    getCriticalPointTValue() {
        const axii = ['x', 'y'];
        const { P0, P1, P2 } = this;
        let value;
        for (let i = 0; i < axii.length; i++) {
            const axis = axii[i];
            const potentialValue = Calculator.sub(P0[axis], P1[axis]).div(Calculator.sub(P0[axis], Calculator.mul(P1[axis], 2)).add(P2[axis]));
            if (+potentialValue > 0 && +potentialValue < 1) {
                value = potentialValue;
                break;
            }
        }
        return value;
    }
    getPointAtParameter(t) {
        const x = this.getCoordinateAtParameter(t, 'x');
        const y = this.getCoordinateAtParameter(t, 'y');
        if (typeof x === 'undefined' || typeof y === 'undefined') {
            return;
        }
        return new Point([+x, +y]);
    }
}
