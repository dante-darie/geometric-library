import { IAngle, IFigure, IMagnitude, IPoint, IVector, TFigureValues } from '@abstracts';
import type { ILine } from '@figures';
import { IBoundingBox } from '@types';
export declare abstract class Figure implements IFigure {
    protected angles: IAngle[];
    protected isRelative: boolean;
    protected magnitudes: IMagnitude[];
    protected points: IPoint[];
    protected vectors: IVector[];
    private _values;
    constructor(values: TFigureValues);
    get boundingBox(): IBoundingBox;
    get values(): TFigureValues;
    protected set values(values: TFigureValues);
    protected static computeBoundingBox(points: IPoint[]): IBoundingBox;
    private static getNoPointsErrorMessage;
    reflect(about: IPoint | ILine): this;
    rotate(phi: IAngle, about?: IPoint): this;
    scale(factor: number, about?: IPoint): this;
    translate(vector: IVector): this;
}
