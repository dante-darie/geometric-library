"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CubicBezierCurve = void 0;
const _abstracts_1 = require("@abstracts");
const calculator_1 = require("@utilities/calculator");
class CubicBezierCurve extends _abstracts_1.Figure {
    _criticalPoints;
    constructor(values) {
        super(values);
        this._criticalPoints = this.computeCriticalPoints();
    }
    get boundingBox() {
        const [P0, , , P3] = this.values;
        const points = [P0, P3, ...this._criticalPoints];
        return _abstracts_1.Figure.computeBoundingBox(points);
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
    get P3() {
        if (this.isRelative) {
            return this.P0.clone().translate(this.vectors[2]);
        }
        return this.points[3];
    }
    clone() {
        const values = this.values.map((value) => value.clone());
        return new CubicBezierCurve(values);
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
        const tValues = this.computeCriticalPointsTValues();
        if (!tValues) {
            return [];
        }
        const criticalPoints = tValues.reduce((criticalPoints, t) => {
            const criticalPoint = this.getPointAtParameter(t);
            if (criticalPoint)
                criticalPoints.push(criticalPoint);
            return criticalPoints;
        }, []);
        return criticalPoints;
    }
    computeCriticalPointsTValues() {
        const axii = ['x', 'y'];
        const { P0, P1, P2, P3 } = this;
        const signs = [1, -1];
        const tValues = [];
        for (let i = 0; i < axii.length; i++) {
            const axis = axii[i];
            const p0 = new calculator_1.Calculator(P0[axis]);
            const p1 = new calculator_1.Calculator(P1[axis]);
            const p2 = new calculator_1.Calculator(P2[axis]);
            const p3 = new calculator_1.Calculator(P3[axis]);
            const a = p3.sub(p2.mul(3)).add(p1.mul(3)).sub(p0).mul(3);
            const b = p2.sub(p1.mul(2)).add(p0).mul(6);
            const c = p1.sub(p0).mul(3);
            for (let n = 0; n < signs.length; n++) {
                const sign = signs[n];
                let tValue;
                if (calculator_1.Calculator.isNearZero(+a)) {
                    // 1st degree equation to avoid n/0
                    tValue = c.neg().div(b);
                }
                else {
                    // 2nd degree equation
                    tValue = b
                        .neg()
                        .add(calculator_1.Calculator.mul(sign, b.pow(2).sub(a.mul(c).mul(4)).sqrt()))
                        .div(a.mul(2));
                }
                if (this.isValidParameter(tValue)) {
                    tValues.push(tValue);
                }
            }
        }
        if (!tValues.length) {
            return;
        }
        return tValues.filter((value, index, array) => index === array.findIndex((v) => calculator_1.Calculator.isEqual(+value, +v)));
    }
    getCoordinateAtParameter(t, axis) {
        const { P0, P1, P2, P3 } = this;
        const p0 = P0[axis];
        const p1 = P1[axis];
        const p2 = P2[axis];
        const p3 = P3[axis];
        // parametric cubic bezier equation
        const coordinate = calculator_1.Calculator.sub(1, t)
            .pow(3)
            .mul(p0)
            .add(calculator_1.Calculator.sub(1, t).pow(2).mul(3).mul(t).mul(p1))
            .add(calculator_1.Calculator.sub(1, t).mul(3).mul(t.pow(2)).mul(p2))
            .add(t.pow(3).mul(p3));
        if (!coordinate.isFinite()) {
            return;
        }
        return coordinate;
    }
    getPointAtParameter(t) {
        const x = this.getCoordinateAtParameter(t, 'x');
        const y = this.getCoordinateAtParameter(t, 'y');
        if (typeof x === 'undefined' || typeof y === 'undefined') {
            return;
        }
        return new _abstracts_1.Point([+x, +y]);
    }
    isValidParameter(t) {
        return t.isFinite() && +t > 0 && +t < 1;
    }
}
exports.CubicBezierCurve = CubicBezierCurve;
