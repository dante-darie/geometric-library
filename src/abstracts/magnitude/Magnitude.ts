import { IMagnitude } from './Magnitude.types';
import { Calculator } from '@utilities/calculator';

export class Magnitude implements IMagnitude {
  public readonly kind = 'magnitude' as const;

  private _value: number;

  constructor(value: number) {
    this._value = value;
  }

  public get value(): number {
    return this._value;
  }

  public clone(): IMagnitude {
    return new Magnitude(+this);
  }

  public replace(value: number): this {
    this._value = value;

    return this;
  }

  public scale(factor: number): this {
    this._value = +Calculator.mul(+this, factor);

    return this;
  }

  public valueOf() {
    return this._value;
  }
}
