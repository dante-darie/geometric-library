import type { IPolygon, TPolygonValues } from '@figures';
import { Figure } from '@abstracts';
export declare class Polygon extends Figure implements IPolygon {
    constructor(values: TPolygonValues);
    get sides(): number;
    clone(): Polygon;
}
