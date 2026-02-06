import { Angle, Figure, IAngle, IPoint, IVector, Point, Vector } from '@abstracts';
import type { ILine, TLineValues } from '@figures';
import { Calculator } from '@utilities/calculator';

export class Line extends Figure implements ILine {
  private _P0: IPoint;
  private _P1: IPoint;
  private _V: IVector;
  private _dirty: boolean = true;
  private _reciprocal: number | undefined;
  private _slope: number | undefined;
  private _xIntercept: number | undefined;
  private _yIntercept: number | undefined;

  constructor(values: TLineValues) {
    super(values);

    const [P0, anchor] = values;

    if (anchor instanceof Vector) {
      this._V = anchor;
      this._P1 = P0.clone().translate(anchor);

      // anchor instanceof Point
    } else {
      this._V = new Vector([P0, anchor as IPoint]);
      this._P1 = anchor as IPoint;
    }

    this._P0 = P0;
    this.points = [this.P0, this.P1];
    this.vectors = [this.V];
  }

  public get P0() {
    return this._P0;
  }

  public get P1() {
    return this._P1;
  }

  public get V() {
    return this._V;
  }

  // STANDARD EQUATION PARAMETERS (ax + by - c = 0)

  public get a() {
    const { slope, isVertical, isHorizontal } = this;

    if (isVertical) {
      return 1;
    }

    if (isHorizontal) {
      return 0;
    }

    return slope! >= 0 ? slope! : -slope!;
  }

  public get b() {
    const { slope, isVertical, isHorizontal } = this;

    if (isVertical) {
      return 0;
    }

    if (isHorizontal) {
      return 1;
    }

    return slope! >= 0 ? -1 : 1;
  }

  public get c() {
    const { slope, isVertical, isHorizontal, yIntercept, xIntercept } = this;

    if (isVertical) {
      return xIntercept!;
    }

    if (isHorizontal) {
      return yIntercept!;
    }

    return slope! >= 0 ? -yIntercept! : yIntercept!;
  }

  public get isHorizontal() {
    const { slope, isVertical } = this;

    return !isVertical && slope === 0;
  }

  public get isVertical() {
    const { slope } = this;

    return typeof slope === 'undefined';
  }

  public get reciprocal() {
    this.ensureComputed();

    return this._reciprocal;
  }

  public get slope() {
    this.ensureComputed();

    return this._slope;
  }

  public get xIntercept() {
    this.ensureComputed();

    return this._xIntercept;
  }

  public get yIntercept() {
    this.ensureComputed();

    return this._yIntercept;
  }

  public angleTo(reference: ILine | IVector): IAngle {
    if ('slope' in reference) {
      const line = reference;

      if (this.isParallelTo(line)) {
        return new Angle(0, 'radians');
      }

      if (this.isPerpendicularTo(line)) {
        return new Angle(+Calculator.div(Math.PI, 2), 'radians');
      }

      if (typeof this.slope === 'undefined') {
        return new Angle(+Calculator.atan(line.slope!), 'radians');
      }

      if (typeof line.slope === 'undefined') {
        return new Angle(+Calculator.atan(this.slope!), 'radians');
      }

      const thisSlope = new Calculator(this.slope!);
      const lineSlope = new Calculator(line.slope!);

      return new Angle(+lineSlope.sub(thisSlope).div(thisSlope.mul(lineSlope).add(1)).abs().atan(), 'radians');
    }

    return this.V.angleTo(reference);
  }

  public clone() {
    const values = (this.values as TLineValues).map((value) => value.clone());

    return new Line(values as TLineValues);
  }

  public getIntersectionPoint(line: ILine): IPoint | undefined {
    if (this.isParallelTo(line)) {
      return;
    }

    const denominator = Calculator.mul(this.a, line.b).sub(Calculator.mul(line.a, this.b));
    const x = +Calculator.mul(this.b, line.c).sub(Calculator.mul(line.b, this.c)).div(denominator);
    const y = +Calculator.mul(this.c, line.a).sub(Calculator.mul(line.c, this.a)).div(denominator);

    return new Point([x, y]);
  }

  public getPerpendicularProjection(point: IPoint) {
    const { P0, slope, isVertical, isHorizontal } = this;
    let perpendicularProjection: IPoint;

    if (this.hasPoint(point)) {
      return point.clone();
    }

    if (isVertical) {
      perpendicularProjection = new Point([P0.x, point.y]);
    } else if (isHorizontal) {
      perpendicularProjection = new Point([point.x, P0.y]);
    } else {
      const perpendicularSlope = +Calculator.div(-1, slope!);
      const perpendicularYIntercept = +Calculator.sub(point.y, Calculator.mul(perpendicularSlope, point.x));
      const x = +Calculator.sub(perpendicularYIntercept, this.yIntercept!).div(Calculator.sub(slope!, perpendicularSlope));
      const y = +Calculator.mul(slope!, x).add(this.yIntercept!);

      perpendicularProjection = new Point([x, y]);
    }

    return perpendicularProjection;
  }

  public getPerpendicularThrough(point: IPoint): ILine {
    if (this.hasPoint(point)) {
      const phi = new Angle(+Calculator.div(Math.PI, 2), 'radians');

      return this.clone().rotate(phi, point);
    }

    return new Line([point, this.getPerpendicularProjection(point)]);
  }

  public getPointAtParameter(t: number): IPoint {
    const { P0, V } = this;
    const x = +Calculator.add(P0.x, Calculator.mul(V.dx, t));
    const y = +Calculator.add(P0.y, Calculator.mul(V.dy, t));

    return new Point([x, y]);
  }

  public getXValueAtY(y: number): number | undefined {
    const { reciprocal, xIntercept } = this;

    if (typeof reciprocal === 'undefined') {
      return;
    }

    if (typeof xIntercept === 'undefined') {
      return +Calculator.mul(reciprocal, y);
    }

    return +Calculator.mul(reciprocal, y).add(xIntercept);
  }

  public getYValueAtX(x: number): number | undefined {
    const { slope, yIntercept } = this;

    if (typeof slope === 'undefined') {
      return;
    }

    if (typeof yIntercept === 'undefined') {
      return +Calculator.mul(slope, x);
    }

    return +Calculator.mul(slope, x).add(yIntercept);
  }

  public hasPoint(P: IPoint): boolean {
    if (this.isVertical) {
      return Calculator.isEqual(P.x, this.P0.x);
    }

    const potentialY = this.getYValueAtX(P.x);

    return typeof potentialY === 'number' && Calculator.isEqual(potentialY, P.y);
  }

  public isParallelTo(line: ILine): boolean {
    if (typeof this.slope === 'undefined' || typeof line.slope === 'undefined') {
      return typeof this.slope === typeof line.slope;
    }

    return Calculator.isEqual(this.slope, line.slope);
  }

  public isPerpendicularTo(line: ILine): boolean {
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

    return Calculator.isEqual(this.slope!, +Calculator.div(-1, line.slope!));
  }

  public reflect(about: ILine | IPoint): this {
    super.reflect(about);

    this._dirty = true;

    return this;
  }

  public rotate(phi: IAngle, about?: IPoint | undefined): this {
    super.rotate(phi, about);

    this._dirty = true;

    return this;
  }

  public scale(factor: number, about?: IPoint): this {
    super.scale(factor, about);

    this._dirty = true;

    return this;
  }

  public scaleXY(factorX: number, factorY: number, about?: IPoint): this {
    super.scaleXY(factorX, factorY, about);

    this._dirty = true;

    return this;
  }

  public translate(vector: IVector): this {
    super.translate(vector);

    this._dirty = true;

    return this;
  }

  private computeReciprocal(): number | undefined {
    const { P0, P1 } = this;
    const reciprocal = Calculator.sub(P1.x, P0.x).div(Calculator.sub(P1.y, P0.y));

    if (reciprocal.isFinite()) {
      return +reciprocal;
    }
  }

  private computeSlope(): number | undefined {
    const { P0, P1 } = this;
    const slope = Calculator.sub(P1.y, P0.y).div(Calculator.sub(P1.x, P0.x));

    if (slope.isFinite()) {
      return +slope;
    }
  }

  private computeXIntercept(): number | undefined {
    const { P0, reciprocal, isHorizontal, isVertical } = this;

    if (isVertical) {
      return P0.x;
    }

    if (isHorizontal) {
      return;
    }

    return +Calculator.sub(P0.x, Calculator.mul(reciprocal!, P0.y));
  }

  private computeYIntercept(): number | undefined {
    const { P0, slope, isVertical, isHorizontal } = this;

    if (isVertical) {
      return;
    }

    if (isHorizontal) {
      return P0.y;
    }

    return +Calculator.sub(P0.y, Calculator.mul(slope!, P0.x));
  }

  private ensureComputed(): void {
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
