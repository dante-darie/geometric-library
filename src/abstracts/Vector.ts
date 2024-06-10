import { IVector, TVectorValues, TSegment, IAngle } from 'types';
import { Calculator } from 'utilities/Calculator';
import { Angle } from 'abstracts/Angle';

export class Vector implements IVector {
  private _dx: number;
  private _dy: number;

  constructor(values: TVectorValues | TSegment) {
    const fromPoints = values.some((value) => typeof value !== 'number');

    if (fromPoints) {
      const [P1, P2] = values as TSegment;

      this._dx = +Calculator.sub(P2.x, P1.x);
      this._dy = +Calculator.sub(P2.y, P1.y);

      return;
    }

    const [dx, dy] = values as TVectorValues;

    this._dx = dx;
    this._dy = dy;
  }

  public get dx() {
    return this._dx;
  }

  public get dy() {
    return this._dy;
  }

  public get magnitude(): number {
    const { dx, dy } = this;

    return +Calculator.pow(dx, 2).add(Calculator.pow(dy, 2)).sqrt();
  }

  public get values(): TVectorValues {
    return [this.dx, this.dy];
  }

  public angleTo(vector: Vector): IAngle {
    const dotProd = this.dotProduct(vector);
    const magV1 = this.magnitude;
    const magV2 = vector.magnitude;
    const magProd = Calculator.mul(magV1, magV2);
    const cosAngle = Calculator.div(dotProd, magProd);
    const angle = cosAngle.acos();

    return new Angle(+angle, 'radians');
  }

  public clone() {
    const { dx, dy } = this;

    return new Vector([dx, dy]);
  }

  public dotProduct(vector: Vector): number {
    const { dx, dy } = this;

    return +Calculator.mul(dx, vector.dx).add(Calculator.mul(dy, vector.dy));
  }

  public reflect({ x, y }: { x: boolean; y: boolean }) {
    this._dx = x ? +Calculator.neg(this.dx) : this.dx;
    this._dy = y ? +Calculator.neg(this.dy) : this.dy;

    return this;
  }

  public replace(vector: Vector) {
    this._dx = vector.dx;
    this._dy = vector.dy;

    return this;
  }

  public rotate(phi: IAngle) {
    const { dx, dy } = this;

    this._dx = +Calculator.mul(phi.cos, dx).sub(Calculator.mul(phi.sin, dy));
    this._dy = +Calculator.mul(phi.sin, dx).add(Calculator.mul(phi.cos, dy));

    return this;
  }

  public scale(factor: number): this {
    const { dx, dy } = this;

    this._dx = +Calculator.mul(dx, factor);
    this._dy = +Calculator.mul(dy, factor);

    return this;
  }
}
