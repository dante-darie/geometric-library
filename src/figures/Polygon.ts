import { IPolygon, TPolygonValues } from '../types';
import { Figure } from '../abstracts/Figure';

export class Polygon extends Figure implements IPolygon {
  constructor(values: TPolygonValues) {
    super(values);
  }

  public get sides() {
    return this.points.length;
  }

  public clone(): Polygon {
    const values = (this.values as TPolygonValues).map((value) => value.clone());

    return new Polygon(values as TPolygonValues);
  }
}
