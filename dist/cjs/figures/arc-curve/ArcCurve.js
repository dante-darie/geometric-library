"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArcCurve = void 0;
const _abstracts_1 = require("@abstracts");
const Ellipse_1 = require("../ellipse/Ellipse");
const calculator_1 = require("@utilities/calculator");
class ArcCurve extends _abstracts_1.Figure {
    ellipse;
    largeArcFlag;
    phi;
    rx;
    ry;
    sweepFlag;
    constructor(values) {
        super(values);
        const [, rx, ry, phi, largeArcFlag, sweepFlag] = values;
        this.rx = rx;
        this.ry = ry;
        this.phi = phi;
        this.largeArcFlag = largeArcFlag;
        this.sweepFlag = sweepFlag;
        this.adjustRadii();
        const center = this.computeCenter();
        this.ellipse = new Ellipse_1.Ellipse([center, rx, ry, phi]);
    }
    get boundingBox() {
        const { P0, P1 } = this;
        const points = [P0, P1, ...this.criticalPoints];
        return _abstracts_1.Figure.computeBoundingBox(points);
    }
    get center() {
        return this.ellipse.center;
    }
    get criticalPoints() {
        const { ellipse } = this;
        const [minTheta, maxTheta] = this.computeThetaRange();
        return ellipse.criticalPoints.filter((point) => {
            const { P0, P1 } = this;
            if ((calculator_1.Calculator.isEqual(point.x, P0.x) && calculator_1.Calculator.isEqual(point.y, P0.y)) || (calculator_1.Calculator.isEqual(point.x, P1.x) && calculator_1.Calculator.isEqual(point.y, P1.y))) {
                return false;
            }
            const theta = ellipse.computeThetaForPoint(point);
            return +theta >= +minTheta && +theta <= +maxTheta;
        });
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
    clone() {
        const values = this.values.map((value) => (typeof value === 'object' && 'clone' in value ? value.clone() : /* v8 ignore next */ value));
        return new ArcCurve(values);
    }
    reflect(about) {
        super.reflect(about);
        this.sweepFlag.invert();
        return this;
    }
    adjustRadii() {
        const { rx, ry } = this;
        const P0_prime = this.computeP0Prime();
        const { x: x1_prime, y: y1_prime } = P0_prime;
        const rx_sq = calculator_1.Calculator.pow(+rx, 2);
        const ry_sq = calculator_1.Calculator.pow(+ry, 2);
        const x1_prime_sq = calculator_1.Calculator.pow(x1_prime, 2);
        const y1_prime_sq = calculator_1.Calculator.pow(y1_prime, 2);
        const radii_check = x1_prime_sq.div(rx_sq).add(y1_prime_sq.div(ry_sq));
        if (+radii_check > 1) {
            rx.replace(+calculator_1.Calculator.mul(+rx, radii_check.sqrt()));
            ry.replace(+calculator_1.Calculator.mul(+ry, radii_check.sqrt()));
        }
    }
    computeCenter() {
        const { P0, P1, phi } = this;
        const center_prime = this.computeCenterPrime();
        const { x: x1, y: y1 } = P0;
        const { x: x2, y: y2 } = P1;
        const { x: cx_prime, y: cy_prime } = center_prime;
        const dx = calculator_1.Calculator.add(x1, x2).div(2);
        const dy = calculator_1.Calculator.add(y1, y2).div(2);
        const cx = calculator_1.Calculator.mul(phi.cos, cx_prime).sub(calculator_1.Calculator.mul(phi.sin, cy_prime)).add(dx);
        const cy = calculator_1.Calculator.mul(phi.sin, cx_prime).add(calculator_1.Calculator.mul(phi.cos, cy_prime)).add(dy);
        return new _abstracts_1.Point([+cx, +cy]);
    }
    computeCenterPrime() {
        const { largeArcFlag, sweepFlag, rx, ry } = this;
        const P0_prime = this.computeP0Prime();
        const { x: x1_prime, y: y1_prime } = P0_prime;
        const rx_sq = calculator_1.Calculator.pow(+rx, 2);
        const ry_sq = calculator_1.Calculator.pow(+ry, 2);
        const x1_prime_sq = calculator_1.Calculator.pow(x1_prime, 2);
        const y1_prime_sq = calculator_1.Calculator.pow(y1_prime, 2);
        const sign = new calculator_1.Calculator(+largeArcFlag === +sweepFlag ? -1 : 1);
        let sq = rx_sq
            .mul(ry_sq)
            .sub(rx_sq.mul(y1_prime_sq))
            .sub(ry_sq.mul(x1_prime_sq))
            .div(rx_sq.mul(y1_prime_sq).add(ry_sq.mul(x1_prime_sq)));
        sq = +sq < 0 ? /* v8 ignore next */ new calculator_1.Calculator(0) : sq;
        const coef = sign.mul(sq.sqrt());
        const cx_prime = coef.mul(calculator_1.Calculator.mul(+rx, y1_prime).div(+ry));
        const cy_prime = coef.mul(calculator_1.Calculator.mul(+ry, x1_prime).div(+rx).neg());
        return new _abstracts_1.Point([+cx_prime, +cy_prime]);
    }
    computeP0Prime() {
        const { P0, P1, phi } = this;
        const { x: x1, y: y1 } = P0;
        const { x: x2, y: y2 } = P1;
        const mx = calculator_1.Calculator.sub(x1, x2).div(2);
        const my = calculator_1.Calculator.sub(y1, y2).div(2);
        const x1_prime = calculator_1.Calculator.mul(phi.cos, mx).add(calculator_1.Calculator.mul(phi.sin, my));
        const y1_prime = calculator_1.Calculator.mul(phi.sin, mx).neg().add(calculator_1.Calculator.mul(phi.cos, my));
        return new _abstracts_1.Point([+x1_prime, +y1_prime]);
    }
    computeThetaRange() {
        const { P0, P1, ellipse, sweepFlag } = this;
        const theta1 = ellipse.computeThetaForPoint(P0);
        const theta2 = ellipse.computeThetaForPoint(P1);
        if (calculator_1.Calculator.isNearZero(+theta2) && !sweepFlag.value) {
            theta2.replace(360, 'degrees');
        }
        const thetaRange = [theta1, theta2].sort((a, b) => +calculator_1.Calculator.sub(a.radians, b.radians));
        return thetaRange;
    }
}
exports.ArcCurve = ArcCurve;
