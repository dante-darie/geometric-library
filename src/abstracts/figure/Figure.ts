import { IAngle, IFigure, IMagnitude, IPoint, IVector, Point, TFigureValues, Vector } from '@abstracts';
import type { ILine } from '@figures';
import { IBoundingBox } from '@types';
import { Calculator } from '@utilities/calculator';

export abstract class Figure implements IFigure {
  protected angles: IAngle[] = [];
  protected isRelative: boolean = false;
  protected magnitudes: IMagnitude[] = [];
  protected points: IPoint[] = [];
  protected vectors: IVector[] = [];
  private _values: TFigureValues;

  constructor(values: TFigureValues) {
    this.values = this._values = values;
  }

  public get boundingBox(): IBoundingBox {
    const { points } = this;

    return Figure.computeBoundingBox(points);
  }

  public get values() {
    return this._values;
  }

  protected set values(values) {
    this._values = values;

    const [points, vectors, magnitudes, angles] = values.reduce(
      (result, value) => {
        switch (value.kind) {
          case 'point':
            result[0].push(value);
            break;
          case 'vector':
            result[1].push(value);
            break;
          case 'magnitude':
            result[2].push(value);
            break;
          case 'angle':
            result[3].push(value);
            break;
        }

        return result;
      },
      [[], [], [], []] as [IPoint[], IVector[], IMagnitude[], IAngle[]]
    );

    this.magnitudes = magnitudes;
    this.points = points;
    this.vectors = vectors;
    this.angles = angles;
    this.isRelative = !!vectors.length;
  }

  protected static computeBoundingBox(points: IPoint[]): IBoundingBox {
    if (!points) {
      throw new Error(this.getNoPointsErrorMessage('boundingBox', true));
    }

    const [xValues, yValues] = points.reduce(
      (values, point) => {
        values[0].push(point.x);
        values[1].push(point.y);

        return values;
      },
      [[], []] as [number[], number[]]
    );
    const xMax = +Calculator.max(xValues);
    const xMin = +Calculator.min(xValues);
    const yMax = +Calculator.max(yValues);
    const yMin = +Calculator.min(yValues);

    return { xMax, xMin, yMax, yMin };
  }

  private static getNoPointsErrorMessage(name: string, property: boolean = false): string {
    return `Attempting to ${property ? 'get' : 'call'} ${name} of Figure with no points assigned. Assign 'this.points' from the child class and try again.`;
  }

  public reflect(about: IPoint | ILine): this {
    const { points, vectors } = this;

    if (!points) {
      throw new Error(Figure.getNoPointsErrorMessage('reflect'));
    }

    if ('getPerpendicularProjection' in about) {
      points.forEach((point) => {
        const perpendicularRoot = about.getPerpendicularProjection(point);

        point.reflect(perpendicularRoot);
      });

      vectors.forEach((vector) => {
        const referenceProjection = about.getPerpendicularProjection(points[0]);
        const referencePoint = points[0].clone().reflect(referenceProjection);

        const endPoint = points[0].clone().translate(vector);
        const endProjection = about.getPerpendicularProjection(endPoint);
        const positionalPoint = endPoint.reflect(endProjection);

        const reflectedVector = new Vector([referencePoint, positionalPoint]);
        vector.replace(reflectedVector);
      });

      return this;
    }

    points.forEach((point) => {
      point.reflect(about);
    });

    vectors.forEach((vector) => {
      vector.reflect({
        x: true,
        y: true
      });
    });

    return this;
  }

  public rotate(phi: IAngle, about?: IPoint): this {
    const { points, vectors, angles } = this;

    if (!points) {
      throw new Error(Figure.getNoPointsErrorMessage('rotate'));
    }

    points.forEach((point) => {
      point.rotate(phi, about);
    });

    vectors.forEach((vector) => {
      const referencePoint = points[0].clone().rotate(phi, about);
      const positionalPoint = points[0].clone().translate(vector).rotate(phi, about);
      const rotatedVector = new Vector([referencePoint, positionalPoint]);

      vector.replace(rotatedVector);
    });

    angles.forEach((angle) => {
      angle.replace(+Calculator.add(+angle, +phi), 'radians').normalize();
    });

    return this;
  }

  public scale(factor: number, about: IPoint = new Point([0, 0])): this {
    const { points, vectors, magnitudes } = this;

    if (!points) {
      throw new Error(Figure.getNoPointsErrorMessage('scale'));
    }

    points.forEach((point) => {
      const positionalVector = new Vector([about, point]);
      const scaledPositionalVector = positionalVector.clone().scale(factor);
      const scaledPoint = about.clone().translate(scaledPositionalVector);

      point.replace(scaledPoint);
    });

    vectors.forEach((vector) => {
      vector.scale(factor);
    });

    magnitudes.forEach((magnitude) => {
      magnitude.scale(factor);
    });

    return this;
  }

  public translate(vector: IVector): this {
    const { points } = this;

    if (!points) {
      throw new Error(Figure.getNoPointsErrorMessage('translate'));
    }

    points.forEach((point) => {
      point.translate(vector);
    });

    return this;
  }
}
