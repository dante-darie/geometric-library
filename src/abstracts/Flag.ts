import { IFlag } from '../types';

export class Flag implements IFlag {
  private _value: boolean;

  constructor(value: boolean) {
    this._value = value;
  }

  public get value() {
    return this._value;
  }

  public clone(): IFlag {
    return new Flag(this._value);
  }

  public invert(): this {
    this._value = !this._value;

    return this;
  }

  public replace(value: boolean): this {
    this._value = value;

    return this;
  }

  public valueOf() {
    return +this._value;
  }
}
