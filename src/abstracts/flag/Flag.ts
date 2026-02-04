import { IFlag } from './Flag.types';

export class Flag implements IFlag {
  public readonly kind = 'flag' as const;

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

  public valueOf(): number {
    return +this._value;
  }
}
