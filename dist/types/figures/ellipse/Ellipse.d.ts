import { Figure, IAngle, IMagnitude, IPoint, IVector } from '@abstracts';
import type { IEllipse, ILine, TEllipseCriticalPoints, TEllipseValues } from '@figures';
import { IBoundingBox } from '@types';
export declare class Ellipse extends Figure implements IEllipse {
    private _center;
    private _criticalPoints;
    private _phi;
    private _rx;
    private _ry;
    constructor(values: TEllipseValues);
    get boundingBox(): IBoundingBox;
    get center(): IPoint;
    get criticalPoints(): TEllipseCriticalPoints;
    get isCircle(): boolean;
    get phi(): IAngle;
    get rx(): IMagnitude;
    get ry(): IMagnitude;
    clone(): IEllipse;
    computePointForTheta(theta: IAngle, ellipse?: IEllipse): IPoint;
    computeThetaForPoint({ x, y }: IPoint): IAngle;
    reflect(about: IPoint | ILine): this;
    rotate(alpha: IAngle, about?: IPoint | undefined): this;
    scale(factor: number, about?: IPoint): this;
    translate(vector: IVector): this;
    protected computeCriticalPoints(ellipse?: IEllipse): TEllipseCriticalPoints;
    private recompute;
}
