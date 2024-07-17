import { IArcCurve, IBoundingBox, ILine, IPoint, TArcValues } from '../types';
import { Figure } from '../abstracts/Figure';
export declare class ArcCurve extends Figure implements IArcCurve {
    private ellipse;
    private largeArcFlag;
    private phi;
    private rx;
    private ry;
    private sweepFlag;
    constructor(values: TArcValues);
    get boundingBox(): IBoundingBox;
    get center(): IPoint;
    get criticalPoints(): IPoint[];
    private get P0();
    private get P1();
    clone(): ArcCurve;
    reflect(about: IPoint | ILine): this;
    private adjustRadii;
    private computeCenter;
    private computeCenterPrime;
    private computeP0Prime;
    private computeThetaRange;
}
