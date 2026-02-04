import { Figure, IAngle, IPoint, IVector } from '@abstracts';
import type { ICubicBezierCurve, ILine, TCubicBezierValues } from '@figures';
import { IBoundingBox } from '@types';
export declare class CubicBezierCurve extends Figure implements ICubicBezierCurve {
    private _criticalPoints;
    constructor(values: TCubicBezierValues);
    get boundingBox(): IBoundingBox;
    get criticalPoints(): IPoint[];
    private get P0();
    private get P1();
    private get P2();
    private get P3();
    clone(): CubicBezierCurve;
    recompute(): void;
    reflect(about: IPoint | ILine): this;
    rotate(phi: IAngle, about?: IPoint | undefined): this;
    scale(factor: number, about?: IPoint): this;
    translate(vector: IVector): this;
    private computeCriticalPoints;
    private computeCriticalPointsTValues;
    private getCoordinateAtParameter;
    private getPointAtParameter;
    private isValidParameter;
}
