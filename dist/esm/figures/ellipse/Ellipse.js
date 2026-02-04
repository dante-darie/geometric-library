import { Angle, Figure, Point } from '@abstracts';
import { Calculator } from '@utilities/calculator';
import { Line } from '../line/Line';
const xAxis = new Line([new Point([0, 0]), new Point([1, 0])]);
export class Ellipse extends Figure {
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
        return Figure.computeBoundingBox(this.criticalPoints);
    }
    get center() {
        return this._center;
    }
    get criticalPoints() {
        return this._criticalPoints;
    }
    get isCircle() {
        return Calculator.isEqual(+this.rx, +this.ry);
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
        const x = +Calculator.mul(+rx, phi.cos).mul(theta.cos).sub(Calculator.mul(+ry, phi.sin).mul(theta.sin)).add(center.x);
        const y = +Calculator.mul(+rx, phi.sin).mul(theta.cos).add(Calculator.mul(+ry, phi.cos).mul(theta.sin)).add(center.y);
        return new Point([x, y]);
    }
    computeThetaForPoint({ x, y }) {
        const { center, phi, rx, ry } = this;
        const { x: cx, y: cy } = center;
        const dy = Calculator.sub(y, cy);
        const dx = Calculator.sub(x, cx);
        const sinTheta = dy.mul(phi.cos).sub(dx.mul(phi.sin)).div(+ry);
        const cosTheta = dx.mul(phi.cos).add(dy.mul(phi.sin)).div(+rx);
        const theta = new Angle(+Calculator.atan2(sinTheta, cosTheta), 'radians').normalize();
        return theta;
    }
    reflect(about) {
        super.reflect(about);
        if (!this.isCircle && 'V' in about) {
            const alpha = about.angleTo(xAxis);
            this._phi.replace(+Calculator.mul(2, alpha.radians).sub(this.phi.radians), 'radians');
            this._phi.normalize();
        }
        this.recompute();
        return this;
    }
    rotate(alpha, about) {
        this._center.rotate(alpha, about);
        if (!this.isCircle) {
            this._phi.replace(+Calculator.add(this.phi.radians, alpha.radians), 'radians');
            this._phi.normalize();
        }
        this.recompute();
        return this;
    }
    scale(factor, about = new Point([0, 0])) {
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
        const xThetaPrincipal = new Angle(+Calculator.neg(+ry).mul(phi.tan).div(+rx).atan(), 'radians');
        const yThetaPrincipal = new Angle(+Calculator.mul(+ry, phi.cot).div(+rx).atan(), 'radians');
        const xThetaSecondary = new Angle(+Calculator.add(+xThetaPrincipal, Math.PI), 'radians');
        const yThetaSecondary = new Angle(+Calculator.add(+yThetaPrincipal, Math.PI), 'radians');
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
