"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ellipse = void 0;
const _abstracts_1 = require("@abstracts");
const calculator_1 = require("@utilities/calculator");
const Line_1 = require("../line/Line");
const xAxis = new Line_1.Line([new _abstracts_1.Point([0, 0]), new _abstracts_1.Point([1, 0])]);
class Ellipse extends _abstracts_1.Figure {
    _center;
    _criticalPoints;
    _phi;
    _rx;
    _ry;
    constructor(values) {
        super(values);
        const [center, rx, ry, phi] = values;
        this._center = center;
        this._rx = rx;
        this._ry = ry;
        this._phi = phi;
        this._criticalPoints = this.computeCriticalPoints({ center, rx, ry, phi });
    }
    get boundingBox() {
        return _abstracts_1.Figure.computeBoundingBox(this.criticalPoints);
    }
    get center() {
        return this._center;
    }
    get criticalPoints() {
        return this._criticalPoints;
    }
    get isCircle() {
        return calculator_1.Calculator.isEqual(+this.rx, +this.ry);
    }
    get phi() {
        return this._phi;
    }
    get rx() {
        return this._rx;
    }
    get ry() {
        return this._ry;
    }
    clone() {
        const values = this.values.map((value) => value.clone());
        return new Ellipse(values);
    }
    computePointForTheta(theta, ellipse = this) {
        const { center, rx, ry, phi } = ellipse;
        const x = +calculator_1.Calculator.mul(+rx, phi.cos).mul(theta.cos).sub(calculator_1.Calculator.mul(+ry, phi.sin).mul(theta.sin)).add(center.x);
        const y = +calculator_1.Calculator.mul(+rx, phi.sin).mul(theta.cos).add(calculator_1.Calculator.mul(+ry, phi.cos).mul(theta.sin)).add(center.y);
        return new _abstracts_1.Point([x, y]);
    }
    computeThetaForPoint({ x, y }) {
        const { center, phi, rx, ry } = this;
        const { x: cx, y: cy } = center;
        const dy = calculator_1.Calculator.sub(y, cy);
        const dx = calculator_1.Calculator.sub(x, cx);
        const sinTheta = dy.mul(phi.cos).sub(dx.mul(phi.sin)).div(+ry);
        const cosTheta = dx.mul(phi.cos).add(dy.mul(phi.sin)).div(+rx);
        const theta = new _abstracts_1.Angle(+calculator_1.Calculator.atan2(sinTheta, cosTheta), 'radians').normalize();
        return theta;
    }
    reflect(about) {
        super.reflect(about);
        if (!this.isCircle && 'V' in about) {
            const alpha = about.angleTo(xAxis);
            this._phi.replace(+calculator_1.Calculator.mul(2, alpha.radians).sub(this.phi.radians), 'radians');
            this._phi.normalize();
        }
        this.recompute();
        return this;
    }
    rotate(alpha, about) {
        this._center.rotate(alpha, about);
        if (!this.isCircle) {
            this._phi.replace(+calculator_1.Calculator.add(this.phi.radians, alpha.radians), 'radians');
            this._phi.normalize();
        }
        this.recompute();
        return this;
    }
    scale(factor, about = new _abstracts_1.Point([0, 0])) {
        super.scale(factor, about);
        this.recompute();
        return this;
    }
    translate(vector) {
        this._center.translate(vector);
        this.recompute();
        return this;
    }
    computeCriticalPoints(ellipse = this) {
        const { rx, ry, phi } = ellipse;
        const { computePointForTheta } = this;
        const xThetaPrincipal = new _abstracts_1.Angle(+calculator_1.Calculator.neg(+ry).mul(phi.tan).div(+rx).atan(), 'radians');
        const yThetaPrincipal = new _abstracts_1.Angle(+calculator_1.Calculator.mul(+ry, phi.cot).div(+rx).atan(), 'radians');
        const xThetaSecondary = new _abstracts_1.Angle(+calculator_1.Calculator.add(+xThetaPrincipal, Math.PI), 'radians');
        const yThetaSecondary = new _abstracts_1.Angle(+calculator_1.Calculator.add(+yThetaPrincipal, Math.PI), 'radians');
        const firstPoint = computePointForTheta(xThetaPrincipal, ellipse);
        const secondPoint = computePointForTheta(yThetaPrincipal, ellipse);
        const thirdPoint = computePointForTheta(xThetaSecondary, ellipse);
        const fourthPoint = computePointForTheta(yThetaSecondary, ellipse);
        return [firstPoint, secondPoint, thirdPoint, fourthPoint];
    }
    recompute() {
        this._criticalPoints = this.computeCriticalPoints();
    }
}
exports.Ellipse = Ellipse;
