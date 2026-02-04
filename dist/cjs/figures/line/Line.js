"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = void 0;
const _abstracts_1 = require("@abstracts");
const calculator_1 = require("@utilities/calculator");
class Line extends _abstracts_1.Figure {
    _P0;
    _P1;
    _V;
    _dirty = true;
    _reciprocal;
    _slope;
    _xIntercept;
    _yIntercept;
    constructor(values) {
        super(values);
        const [P0, anchor] = values;
        if (anchor instanceof _abstracts_1.Vector) {
            this._V = anchor;
            this._P1 = P0.clone().translate(anchor);
            // anchor instanceof Point
        }
        else {
            this._V = new _abstracts_1.Vector([P0, anchor]);
            this._P1 = anchor;
        }
        this._P0 = P0;
        this.points = [this.P0, this.P1];
        this.vectors = [this.V];
    }
    get P0() {
        return this._P0;
    }
    get P1() {
        return this._P1;
    }
    get V() {
        return this._V;
    }
    // STANDARD EQUATION PARAMETERS (ax + by - c = 0)
    get a() {
        const { slope, isVertical, isHorizontal } = this;
        if (isVertical) {
            return 1;
        }
        if (isHorizontal) {
            return 0;
        }
        return slope >= 0 ? slope : -slope;
    }
    get b() {
        const { slope, isVertical, isHorizontal } = this;
        if (isVertical) {
            return 0;
        }
        if (isHorizontal) {
            return 1;
        }
        return slope >= 0 ? -1 : 1;
    }
    get c() {
        const { slope, isVertical, isHorizontal, yIntercept, xIntercept } = this;
        if (isVertical) {
            return xIntercept;
        }
        if (isHorizontal) {
            return yIntercept;
        }
        return slope >= 0 ? -yIntercept : yIntercept;
    }
    get isHorizontal() {
        const { slope, isVertical } = this;
        return !isVertical && slope === 0;
    }
    get isVertical() {
        const { slope } = this;
        return typeof slope === 'undefined';
    }
    get reciprocal() {
        this.ensureComputed();
        return this._reciprocal;
    }
    get slope() {
        this.ensureComputed();
        return this._slope;
    }
    get xIntercept() {
        this.ensureComputed();
        return this._xIntercept;
    }
    get yIntercept() {
        this.ensureComputed();
        return this._yIntercept;
    }
    angleTo(reference) {
        if ('slope' in reference) {
            const line = reference;
            if (this.isParallelTo(line)) {
                return new _abstracts_1.Angle(0, 'radians');
            }
            if (this.isPerpendicularTo(line)) {
                return new _abstracts_1.Angle(+calculator_1.Calculator.div(Math.PI, 2), 'radians');
            }
            if (typeof this.slope === 'undefined') {
                return new _abstracts_1.Angle(+calculator_1.Calculator.atan(line.slope), 'radians');
            }
            if (typeof line.slope === 'undefined') {
                return new _abstracts_1.Angle(+calculator_1.Calculator.atan(this.slope), 'radians');
            }
            const thisSlope = new calculator_1.Calculator(this.slope);
            const lineSlope = new calculator_1.Calculator(line.slope);
            return new _abstracts_1.Angle(+lineSlope.sub(thisSlope).div(thisSlope.mul(lineSlope).add(1)).abs().atan(), 'radians');
        }
        return this.V.angleTo(reference);
    }
    clone() {
        const values = this.values.map((value) => value.clone());
        return new Line(values);
    }
    getIntersectionPoint(line) {
        if (this.isParallelTo(line)) {
            return;
        }
        const denominator = calculator_1.Calculator.mul(this.a, line.b).sub(calculator_1.Calculator.mul(line.a, this.b));
        const x = +calculator_1.Calculator.mul(this.b, line.c).sub(calculator_1.Calculator.mul(line.b, this.c)).div(denominator);
        const y = +calculator_1.Calculator.mul(this.c, line.a).sub(calculator_1.Calculator.mul(line.c, this.a)).div(denominator);
        return new _abstracts_1.Point([x, y]);
    }
    getPerpendicularProjection(point) {
        const { P0, slope, isVertical, isHorizontal } = this;
        let perpendicularProjection;
        if (this.hasPoint(point)) {
            return point.clone();
        }
        if (isVertical) {
            perpendicularProjection = new _abstracts_1.Point([P0.x, point.y]);
        }
        else if (isHorizontal) {
            perpendicularProjection = new _abstracts_1.Point([point.x, P0.y]);
        }
        else {
            const perpendicularSlope = +calculator_1.Calculator.div(-1, slope);
            const perpendicularYIntercept = +calculator_1.Calculator.sub(point.y, calculator_1.Calculator.mul(perpendicularSlope, point.x));
            const x = +calculator_1.Calculator.sub(perpendicularYIntercept, this.yIntercept).div(calculator_1.Calculator.sub(slope, perpendicularSlope));
            const y = +calculator_1.Calculator.mul(slope, x).add(this.yIntercept);
            perpendicularProjection = new _abstracts_1.Point([x, y]);
        }
        return perpendicularProjection;
    }
    getPerpendicularThrough(point) {
        if (this.hasPoint(point)) {
            const phi = new _abstracts_1.Angle(+calculator_1.Calculator.div(Math.PI, 2), 'radians');
            return this.clone().rotate(phi, point);
        }
        return new Line([point, this.getPerpendicularProjection(point)]);
    }
    getPointAtParameter(t) {
        const { P0, V } = this;
        const x = +calculator_1.Calculator.add(P0.x, calculator_1.Calculator.mul(V.dx, t));
        const y = +calculator_1.Calculator.add(P0.y, calculator_1.Calculator.mul(V.dy, t));
        return new _abstracts_1.Point([x, y]);
    }
    getXValueAtY(y) {
        const { reciprocal, xIntercept } = this;
        if (typeof reciprocal === 'undefined') {
            return;
        }
        if (typeof xIntercept === 'undefined') {
            return +calculator_1.Calculator.mul(reciprocal, y);
        }
        return +calculator_1.Calculator.mul(reciprocal, y).add(xIntercept);
    }
    getYValueAtX(x) {
        const { slope, yIntercept } = this;
        if (typeof slope === 'undefined') {
            return;
        }
        if (typeof yIntercept === 'undefined') {
            return +calculator_1.Calculator.mul(slope, x);
        }
        return +calculator_1.Calculator.mul(slope, x).add(yIntercept);
    }
    hasPoint(P) {
        if (this.isVertical) {
            return calculator_1.Calculator.isEqual(P.x, this.P0.x);
        }
        const potentialY = this.getYValueAtX(P.x);
        return typeof potentialY === 'number' && calculator_1.Calculator.isEqual(potentialY, P.y);
    }
    isParallelTo(line) {
        if (typeof this.slope === 'undefined' || typeof line.slope === 'undefined') {
            return typeof this.slope === typeof line.slope;
        }
        return calculator_1.Calculator.isEqual(this.slope, line.slope);
    }
    isPerpendicularTo(line) {
        if (this.isVertical) {
            return line.isHorizontal;
        }
        if (this.isHorizontal) {
            return line.isVertical;
        }
        /* v8 ignore next 3 */
        if (line.isVertical) {
            return this.isHorizontal;
        }
        /* v8 ignore next 3 */
        if (line.isHorizontal) {
            return this.isVertical;
        }
        return calculator_1.Calculator.isEqual(this.slope, +calculator_1.Calculator.div(-1, line.slope));
    }
    reflect(about) {
        super.reflect(about);
        this._dirty = true;
        return this;
    }
    rotate(phi, about) {
        super.rotate(phi, about);
        this._dirty = true;
        return this;
    }
    scale(factor, about) {
        super.scale(factor, about);
        this._dirty = true;
        return this;
    }
    translate(vector) {
        super.translate(vector);
        this._dirty = true;
        return this;
    }
    computeReciprocal() {
        const { P0, P1 } = this;
        const reciprocal = calculator_1.Calculator.sub(P1.x, P0.x).div(calculator_1.Calculator.sub(P1.y, P0.y));
        if (reciprocal.isFinite()) {
            return +reciprocal;
        }
    }
    computeSlope() {
        const { P0, P1 } = this;
        const slope = calculator_1.Calculator.sub(P1.y, P0.y).div(calculator_1.Calculator.sub(P1.x, P0.x));
        if (slope.isFinite()) {
            return +slope;
        }
    }
    computeXIntercept() {
        const { P0, reciprocal, isHorizontal, isVertical } = this;
        if (isVertical) {
            return P0.x;
        }
        if (isHorizontal) {
            return;
        }
        return +calculator_1.Calculator.sub(P0.x, calculator_1.Calculator.mul(reciprocal, P0.y));
    }
    computeYIntercept() {
        const { P0, slope, isVertical, isHorizontal } = this;
        if (isVertical) {
            return;
        }
        if (isHorizontal) {
            return P0.y;
        }
        return +calculator_1.Calculator.sub(P0.y, calculator_1.Calculator.mul(slope, P0.x));
    }
    ensureComputed() {
        if (!this._dirty) {
            return;
        }
        this._dirty = false;
        this._slope = this.computeSlope();
        this._yIntercept = this.computeYIntercept();
        this._reciprocal = this.computeReciprocal();
        this._xIntercept = this.computeXIntercept();
    }
}
exports.Line = Line;
