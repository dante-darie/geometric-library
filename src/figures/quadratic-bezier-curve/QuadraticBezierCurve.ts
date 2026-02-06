import { Figure, IAngle, IPoint, IVector, Point } from '@abstracts';
import type { ILine, IQuadraticBezierCurve, TQuadraticBezierValues } from '@figures';
import { IBoundingBox, TAxis, TAxii } from '@types';
import { Calculator } from '@utilities/calculator';

export class QuadraticBezierCurve extends Figure implements IQuadraticBezierCurve {
  private _criticalPoints: IPoint[];

  constructor(values: TQuadraticBezierValues) {
    super(values);

    this._criticalPoints = this.computeCriticalPoints();
  }

  public get boundingBox(): IBoundingBox {
    const [P0, , P2] = this.values;
    const points = [P0, P2, ...this._criticalPoints] as IPoint[];

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

  public clone() {
    const values = (this.values as TQuadraticBezierValues).map((value) => value.clone());

    return new QuadraticBezierCurve(values as TQuadraticBezierValues);
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

  public scaleXY(factorX: number, factorY: number, about?: IPoint): this {
    super.scaleXY(factorX, factorY, about);

    this.recompute();

    return this;
  }

  public translate(vector: IVector): this {
    super.translate(vector);

    this.recompute();

    return this;
  }

  private computeCriticalPoints(): IPoint[] {
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

  private getCoordinateAtParameter(t: Calculator, axis: TAxis): Calculator | undefined {
    const { P0, P1, P2 } = this;

    const coordinate = Calculator.sub(1, t).pow(2).mul(P0[axis]).add(Calculator.sub(1, t).mul(2).mul(t).mul(P1[axis])).add(t.pow(2).mul(P2[axis]));

    if (coordinate.isFinite()) {
      return coordinate;
    }
  }

  private getCriticalPointTValue(): Calculator | undefined {
    const axii: TAxii = ['x', 'y'];
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

  private getPointAtParameter(t: Calculator): IPoint | undefined {
    const x = this.getCoordinateAtParameter(t, 'x');
    const y = this.getCoordinateAtParameter(t, 'y');

    if (typeof x === 'undefined' || typeof y === 'undefined') {
      return;
    }

    return new Point([+x, +y]);
  }
}
