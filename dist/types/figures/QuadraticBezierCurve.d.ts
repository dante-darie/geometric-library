import { IAngle, IBoundingBox, ILine, IPoint, IQuadraticBezierCurve, IVector, TQuadraticBezierValues } from '../types';
import { Figure } from '../abstracts/Figure';
export declare class QuadraticBezierCurve extends Figure implements IQuadraticBezierCurve {
    private _criticalPoints;
    constructor(values: TQuadraticBezierValues);
    get boundingBox(): IBoundingBox;
    get criticalPoints(): IPoint[];
    private get P0();
    private get P1();
    private get P2();
    clone(): QuadraticBezierCurve;
    recompute(): void;
    reflect(about: IPoint | ILine): this;
    rotate(phi: IAngle, about?: IPoint | undefined): this;
    scale(factor: number, about?: IPoint): this;
    translate(vector: IVector): this;
    private computeCriticalPoints;
    private getCoordinateAtParameter;
    private getCriticalPointTValue;
    private getPointAtParameter;
}
