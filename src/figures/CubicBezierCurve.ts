import { IAngle, IBoundingBox, ICubicBezierCurve, ILine, IPoint, IVector, TAxii, TAxis, TCubicBezierValues } from '../types';
import { Calculator } from '../utilities/Calculator';
import { Point } from '../abstracts/Point';
import { Figure } from '../abstracts/Figure';

export class CubicBezierCurve extends Figure implements ICubicBezierCurve {
  private _criticalPoints: IPoint[];

  constructor(values: TCubicBezierValues) {
    super(values);

    this._criticalPoints = this.computeCriticalPoints();
  }

  public get boundingBox(): IBoundingBox {
    const [P0, , , P3] = this.values;
    const points = [P0, P3, ...this._criticalPoints] as IPoint[];

    return Figure.computeBoundingBox(points);
  }

  public get criticalPoints() {
    return this._criticalPoints;
  }

  private get P0() {
    return this.points[0];
  }

  private get P1() {
    if (this.isRelative) {
      return this.P0.clone().translate(this.vectors[0]);
    }

    return this.points[1];
  }

  private get P2() {
    if (this.isRelative) {
      return this.P0.clone().translate(this.vectors[1]);
    }

    return this.points[2];
  }

  private get P3() {
    if (this.isRelative) {
      return this.P0.clone().translate(this.vectors[2]);
    }

    return this.points[3];
  }

  public clone() {
    const values = (this.values as TCubicBezierValues).map((value) => value.clone());

    return new CubicBezierCurve(values as TCubicBezierValues);
  }

  public recompute() {
    this._criticalPoints = this.computeCriticalPoints();
  }

  public reflect(about: IPoint | ILine): this {
    super.reflect(about);

    this.recompute();

    return this;
  }

  public rotate(phi: IAngle, about?: IPoint | undefined): this {
    super.rotate(phi, about);

    this.recompute();

    return this;
  }

  public scale(factor: number, about?: IPoint): this {
    super.scale(factor, about);

    this.recompute();

    return this;
  }

  public translate(vector: IVector): this {
    super.translate(vector);

    this.recompute();

    return this;
  }

  private computeCriticalPoints(): IPoint[] {
    const tValues = this.computeCriticalPointsTValues();

    if (!tValues) {
      return [];
    }

    const criticalPoints = tValues.reduce((criticalPoints, t) => {
      const criticalPoint = this.getPointAtParameter(t);

      criticalPoint && criticalPoints.push(criticalPoint);

      return criticalPoints;
    }, [] as IPoint[]);

    return criticalPoints;
  }

  private computeCriticalPointsTValues(): Calculator[] | undefined {
    const axii: TAxii = ['x', 'y'];
    const { P0, P1, P2, P3 } = this;
    const signs = [1, -1];
    const tValues = [];

    for (let i = 0; i < axii.length; i++) {
      const axis = axii[i];
      const p0 = new Calculator(P0[axis]);
      const p1 = new Calculator(P1[axis]);
      const p2 = new Calculator(P2[axis]);
      const p3 = new Calculator(P3[axis]);
      const a = p3.sub(p2.mul(3)).add(p1.mul(3)).sub(p0).mul(3);
      const b = p2.sub(p1.mul(2)).add(p0).mul(6);
      const c = p1.sub(p0).mul(3);

      for (let n = 0; n < signs.length; n++) {
        const sign = signs[n];
        let tValue;

        if (+a === 0) {
          // 1st degree equation to avoid n/0
          tValue = c.neg().div(b);
        } else {
          // 2nd degree equation
          tValue = b
            .neg()
            .add(Calculator.mul(sign, b.pow(2).sub(a.mul(c).mul(4)).sqrt()))
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

    return tValues.filter((value, index, array) => index === array.findIndex((v) => +value === +v));
  }

  private getCoordinateAtParameter(t: Calculator, axis: TAxis): Calculator | undefined {
    const { P0, P1, P2, P3 } = this;
    const p0 = P0[axis];
    const p1 = P1[axis];
    const p2 = P2[axis];
    const p3 = P3[axis];

    // parametric cubic bezier equation
    const coordinate = Calculator.sub(1, t)
      .pow(3)
      .mul(p0)
      .add(Calculator.sub(1, t).pow(2).mul(3).mul(t).mul(p1))
      .add(Calculator.sub(1, t).mul(3).mul(t.pow(2)).mul(p2))
      .add(t.pow(3).mul(p3));

    if (!coordinate.isFinite()) {
      return;
    }

    return coordinate;
  }

  private getPointAtParameter(t: Calculator): IPoint | undefined {
    const x = this.getCoordinateAtParameter(t, 'x');
    const y = this.getCoordinateAtParameter(t, 'y');

    if (typeof x === 'undefined' || typeof y === 'undefined') {
      return;
    }

    return new Point([+x, +y]);
  }

  private isValidParameter(t: Calculator) {
    return t.isFinite() && +t > 0 && +t < 1;
  }
}
