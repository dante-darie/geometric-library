import { IPolygon, TPolygonValues } from '../types';
import { Figure } from '../abstracts/Figure';
export declare class Polygon extends Figure implements IPolygon {
    constructor(values: TPolygonValues);
    get sides(): number;
    clone(): Polygon;
}
