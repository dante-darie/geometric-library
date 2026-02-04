import { IClonable } from '@types';

export interface IFlag extends IClonable<IFlag> {
  readonly kind: 'flag';
  readonly value: boolean;
  invert(): this;
  replace(value: boolean): this;
  valueOf(): number;
}
