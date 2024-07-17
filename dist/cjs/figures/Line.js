"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = void 0;
const Calculator_1 = require("../utilities/Calculator");
const Angle_1 = require("../abstracts/Angle");
const Point_1 = require("../abstracts/Point");
const Vector_1 = require("../abstracts/Vector");
const Figure_1 = require("../abstracts/Figure");
class Line extends Figure_1.Figure {
    _P0;
    _P1;
    _V;
    _reciprocal;
    _slope;
    _xIntercept;
    _yIntercept;
    constructor(values) {
        super(values);
        const [P0, anchor] = values;
        if (anchor instanceof Vector_1.Vector) {
            this._V = anchor;
            this._P1 = P0.clone().translate(anchor);
            // anchor instanceof Point
        }
        else {
            this._V = new Vector_1.Vector([P0, anchor]);
            this._P1 = anchor;
        }
        this._P0 = P0;
        this._slope = this.computeSlope();
        this._yIntercept = this.computeYIntercept();
        this._reciprocal = this.computeReciprocal();
        this._xIntercept = this.computeXIntercept();
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
        return this._reciprocal;
    }
    get slope() {
        return this._slope;
    }
    get xIntercept() {
        return this._xIntercept;
    }
    get yIntercept() {
        return this._yIntercept;
    }
    angleTo(line) {
        if (this.isParallelTo(line)) {
            return new Angle_1.Angle(0, 'radians');
        }
        if (this.isPerpendicularTo(line)) {
            return new Angle_1.Angle(+Calculator_1.Calculator.div(Math.PI, 2), 'radians');
        }
        if (typeof this.slope === 'undefined') {
            return new Angle_1.Angle(+Calculator_1.Calculator.atan(line.slope), 'radians');
        }
        if (typeof line.slope === 'undefined') {
            return new Angle_1.Angle(+Calculator_1.Calculator.atan(this.slope), 'radians');
        }
        const thisSlope = new Calculator_1.Calculator(this.slope);
        const lineSlope = new Calculator_1.Calculator(line.slope);
        return new Angle_1.Angle(+lineSlope.sub(thisSlope).div(thisSlope.mul(lineSlope).add(1)).abs().atan(), 'radians');
    }
    clone() {
        const values = this.values.map((value) => value.clone());
        return new Line(values);
    }
    getIntersectionPoint(line) {
        if (this.isParallelTo(line)) {
            return;
        }
        const denominator = Calculator_1.Calculator.mul(this.a, line.b).sub(Calculator_1.Calculator.mul(line.a, this.b));
        const x = +Calculator_1.Calculator.mul(this.b, line.c).sub(Calculator_1.Calculator.mul(line.b, this.c)).div(denominator);
        const y = +Calculator_1.Calculator.mul(this.c, line.a).sub(Calculator_1.Calculator.mul(line.c, this.a)).div(denominator);
        return new Point_1.Point([x, y]);
    }
    getPerpendicularProjection(point) {
        const { P0, slope, isVertical, isHorizontal } = this;
        let perpendicularProjection;
        if (this.hasPoint(point)) {
            return point.clone();
        }
        if (isVertical) {
            perpendicularProjection = new Point_1.Point([P0.x, point.y]);
        }
        else if (isHorizontal) {
            perpendicularProjection = new Point_1.Point([point.x, P0.y]);
        }
        else {
            const x = new Calculator_1.Calculator(1);
            const y = x.mul(1).div(slope).neg().add(Calculator_1.Calculator.div(point.x, slope)).add(point.y);
            perpendicularProjection = new Point_1.Point([+x, +y]);
        }
        return perpendicularProjection;
    }
    getPerpendicularThrough(point) {
        if (this.hasPoint(point)) {
            const phi = new Angle_1.Angle(+Calculator_1.Calculator.div(Math.PI, 2), 'radians');
            return this.clone().rotate(phi, point);
        }
        return new Line([point, this.getPerpendicularProjection(point)]);
    }
    getPointAtParameter(t) {
        const { P0, V } = this;
        const x = +Calculator_1.Calculator.add(P0.x, Calculator_1.Calculator.mul(V.dx, t));
        const y = +Calculator_1.Calculator.add(P0.y, Calculator_1.Calculator.mul(V.dy, t));
        return new Point_1.Point([x, y]);
    }
    getXValueAtY(y) {
        const { reciprocal, xIntercept } = this;
        if (typeof reciprocal === 'undefined') {
            return;
        }
        if (typeof xIntercept === 'undefined') {
            return +Calculator_1.Calculator.mul(reciprocal, y);
        }
        return +Calculator_1.Calculator.mul(reciprocal, y).add(xIntercept);
    }
    getYValueAtX(x) {
        const { slope, yIntercept } = this;
        if (typeof slope === 'undefined') {
            return;
        }
        if (typeof yIntercept === 'undefined') {
            return +Calculator_1.Calculator.mul(slope, x);
        }
        return +Calculator_1.Calculator.mul(slope, x).add(yIntercept);
    }
    hasPoint(P) {
        const potentialY = this.getYValueAtX(P.x);
        return typeof potentialY === 'number' && potentialY === P.y;
    }
    isParallelTo(line) {
        return this.slope == line.slope;
    }
    isPerpendicularTo(line) {
        if (this.isVertical) {
            return line.isHorizontal;
        }
        if (this.isHorizontal) {
            return line.isVertical;
        }
        if (line.isVertical) {
            return this.isHorizontal;
        }
        if (line.isHorizontal) {
            return this.isVertical;
        }
        const thisSlope = new Calculator_1.Calculator(this.slope);
        const lineSlope = new Calculator_1.Calculator(line.slope);
        return +thisSlope === +Calculator_1.Calculator.div(-1, lineSlope);
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
    computeReciprocal() {
        const { P0, P1 } = this;
        const reciprocal = Calculator_1.Calculator.sub(P1.x, P0.x).div(Calculator_1.Calculator.sub(P1.y, P0.y));
        if (reciprocal.isFinite()) {
            return +reciprocal;
        }
    }
    computeSlope() {
        const { P0, P1 } = this;
        const slope = Calculator_1.Calculator.sub(P1.y, P0.y).div(Calculator_1.Calculator.sub(P1.x, P0.x));
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
        return +Calculator_1.Calculator.sub(P0.x, Calculator_1.Calculator.mul(reciprocal, P0.y));
    }
    computeYIntercept() {
        const { P0, slope, isVertical, isHorizontal } = this;
        if (isVertical) {
            return;
        }
        if (isHorizontal) {
            return P0.y;
        }
        return +Calculator_1.Calculator.sub(P0.y, Calculator_1.Calculator.mul(slope, P0.x));
    }
    recompute() {
        this._slope = this.computeSlope();
        this._yIntercept = this.computeYIntercept();
        this._reciprocal = this.computeReciprocal();
        this._xIntercept = this.computeXIntercept();
    }
}
exports.Line = Line;
