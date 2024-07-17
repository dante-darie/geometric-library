import { IAngle, TAngleUnit } from '../types';
import { Calculator } from '../utilities/Calculator';

const PI2 = +Calculator.mul(Math.PI, 2);

export class Angle implements IAngle {
  private _radians: number;

  constructor(value: number, unit: TAngleUnit) {
    this._radians = unit === 'radians' ? value : Angle.toRadians(value);
  }

  public get cos() {
    return +Calculator.cos(this.radians);
  }

  public get cot() {
    return +Calculator.div(1, this.tan);
  }

  public get degrees() {
    return Angle.toDegrees(this.radians);
  }

  public get radians() {
    return this._radians;
  }

  public get sin() {
    return +Calculator.sin(this.radians);
  }

  public get tan() {
    return +Calculator.tan(this.radians);
  }

  public static toDegrees(radians: number) {
    return +Calculator.mul(radians, 180).div(Math.PI);
  }

  public static toRadians(degrees: number) {
    return +Calculator.mul(degrees, Math.PI).div(180);
  }

  public clone(): IAngle {
    return new Angle(this.radians, 'radians');
  }

  public normalize(): this {
    const { radians } = this;

    if (radians < 0) {
      this._radians = +Calculator.add(radians, PI2);
    } else if (radians > 0) {
      this._radians = +Calculator.mod(radians, PI2);
    }

    return this;
  }

  public replace(value: number, unit: TAngleUnit): this {
    this._radians = unit === 'radians' ? value : Angle.toRadians(value);

    return this;
  }

  public scale(factor: number): this {
    this._radians = +Calculator.mul(this.radians, factor);

    return this;
  }

  public valueOf(): number {
    return this.radians;
  }
}
