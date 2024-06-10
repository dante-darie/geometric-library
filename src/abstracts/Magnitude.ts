import { IMagnitude } from 'types';
import { Calculator } from 'utilities/Calculator';

export class Magnitude implements IMagnitude {
  private _value: number;

  constructor(value: number) {
    this._value = value;
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
