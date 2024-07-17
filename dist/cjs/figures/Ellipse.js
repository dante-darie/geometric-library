"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ellipse = void 0;
const Calculator_1 = require("../utilities/Calculator");
const Angle_1 = require("../abstracts/Angle");
const Point_1 = require("../abstracts/Point");
const Figure_1 = require("../abstracts/Figure");
const utilities_1 = require("../utilities");
class Ellipse extends Figure_1.Figure {
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
        return Figure_1.Figure.computeBoundingBox(this.criticalPoints);
    }
    get center() {
        return this._center;
    }
    get criticalPoints() {
        return this._criticalPoints;
    }
    get isCircle() {
        return +this.rx === +this.ry;
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
        const x = +Calculator_1.Calculator.mul(+rx, phi.cos).mul(theta.cos).sub(Calculator_1.Calculator.mul(+ry, phi.sin).mul(theta.sin)).add(center.x);
        const y = +Calculator_1.Calculator.mul(+rx, phi.sin).mul(theta.cos).add(Calculator_1.Calculator.mul(+ry, phi.cos).mul(theta.sin)).add(center.y);
        return new Point_1.Point([x, y]);
    }
    computeThetaForPoint({ x, y }) {
        const { center, phi, rx, ry } = this;
        const { x: cx, y: cy } = center;
        const dy = Calculator_1.Calculator.sub(y, cy);
        const dx = Calculator_1.Calculator.sub(x, cx);
        const sinTheta = dy.mul(phi.cos).sub(dx.mul(phi.sin)).div(+ry);
        const cosTheta = dx.mul(phi.cos).add(dy.mul(phi.sin)).div(+rx);
        const theta = new Angle_1.Angle(+Calculator_1.Calculator.atan2(sinTheta, cosTheta), 'radians').normalize();
        return theta;
    }
    reflect(about) {
        super.reflect(about);
        if (!this.isCircle && 'V' in about) {
            const alpha = about.angleTo(utilities_1.xAxis);
            this._phi.replace(+Calculator_1.Calculator.mul(2, alpha.radians).sub(this.phi.radians), 'radians');
            this._phi.normalize();
        }
        this.recompute();
        return this;
    }
    rotate(alpha, about) {
        this._center.rotate(alpha, about);
        if (!this.isCircle) {
            this._phi.replace(+Calculator_1.Calculator.add(this.phi.radians, alpha.radians), 'radians');
            this._phi.normalize();
        }
        this.recompute();
        return this;
    }
    scale(factor, about = new Point_1.Point([0, 0])) {
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
        const xThetaPrincipal = new Angle_1.Angle(+Calculator_1.Calculator.neg(+ry).mul(phi.tan).div(+rx).atan(), 'radians');
        const yThetaPrincipal = new Angle_1.Angle(+Calculator_1.Calculator.mul(+ry, phi.cot).div(+rx).atan(), 'radians');
        const xThetaSecondary = new Angle_1.Angle(+Calculator_1.Calculator.add(+xThetaPrincipal, Math.PI), 'radians');
        const yThetaSecondary = new Angle_1.Angle(+Calculator_1.Calculator.add(+yThetaPrincipal, Math.PI), 'radians');
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
