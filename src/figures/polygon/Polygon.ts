import type { IPolygon, TPolygonValues } from '@figures';
import { Figure, IAngle, IPoint, IVector } from '@abstracts';
import type { ILine } from '../line/Line.types';
import { Line } from '../line/Line';

export class Polygon extends Figure implements IPolygon {
  private _lines: Line[];

  constructor(values: TPolygonValues) {
    super(values);

    this._lines = this.computeLines();
  }

  public get lines(): Line[] {
    return this._lines;
  }

  public get sides() {
    return this.points.length;
  }

  public clone(): Polygon {
    const values = (this.values as TPolygonValues).map((value) => value.clone());

    return new Polygon(values as TPolygonValues);
  }

  public reflect(about: IPoint | ILine): this {
    super.reflect(about);

    this._lines = this.computeLines();

    return this;
  }

  public rotate(phi: IAngle, about?: IPoint): this {
    super.rotate(phi, about);

    this._lines = this.computeLines();

    return this;
  }

  public scale(factor: number, about?: IPoint): this {
    super.scale(factor, about);

    this._lines = this.computeLines();

    return this;
  }

  public translate(vector: IVector): this {
    super.translate(vector);

    this._lines = this.computeLines();

    return this;
  }

  private computeLines(): Line[] {
    return this.points.map((point, i) => new Line([point, this.points[(i + 1) % this.points.length]]));
  }
}
