import { IClonable } from '@types';
export interface IMagnitude extends IClonable<IMagnitude> {
    readonly kind: 'magnitude';
    readonly value: number;
    replace(value: number): this;
    scale(factor: number): this;
    valueOf(): number;
}
