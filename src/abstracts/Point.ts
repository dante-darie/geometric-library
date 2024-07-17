import { IAngle, IPoint, IVector, TPointValues } from '../types';
import { Calculator } from '../utilities/Calculator';

export class Point implements IPoint {
  private _x: number;
  private _y: number;

  constructor([x, y]: TPointValues) {
    this._x = x;
    this._y = y;
  }

  public get values(): TPointValues {
    return [this.x, this.y];
  }

  public get x() {
    return +this._x;
  }

  public get y() {
    return +this._y;
  }

  public clone() {
    const { x, y } = this;

    return new Point([x, y]);
  }

  public reflect(about: IPoint) {
    const { x, y } = this;

    this._x = +Calculator.sub(about.x, x).mul(2).add(x);
    this._y = +Calculator.sub(about.y, y).mul(2).add(y);

    return this;
  }

  public replace(point: Point) {
    this._x = point.x;
    this._y = point.y;

    return this;
  }

  public rotate(phi: IAngle, about: IPoint = new Point([0, 0])) {
    const dx = Calculator.sub(this.x, about.x);
    const dy = Calculator.sub(this.y, about.y);

    this._x = +dx.mul(phi.cos).sub(dy.mul(phi.sin)).add(about.x);
    this._y = +dy.mul(phi.cos).add(dx.mul(phi.sin)).add(about.y);

    return this;
  }

  public translate(vector: IVector) {
    const { x, y } = this;

    this._x = +Calculator.add(x, vector.dx);
    this._y = +Calculator.add(y, vector.dy);

    return this;
  }
}
