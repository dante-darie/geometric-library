import { Calculator } from 'utilities/Calculator';
import { Magnitude } from 'abstracts/Magnitude';
import { Point } from 'abstracts/Point';
import { Vector } from 'abstracts/Vector';
export class Figure {
    angles = [];
    isRelative = false;
    magnitudes = [];
    points = [];
    vectors = [];
    _values;
    constructor(values) {
        this.values = this._values = values;
    }
    get boundingBox() {
        const { points } = this;
        return Figure.computeBoundingBox(points);
    }
    get values() {
        return this._values;
    }
    /**
     * @todo Figure out a better way to type narrow than iterating again.
     */
    set values(values) {
        this._values = values;
        const [points, vectors, magnitudes, angles] = values.reduce((result, value) => {
            if (value instanceof Point) {
                result[0].push(value);
            }
            if (value instanceof Vector) {
                result[1].push(value);
            }
            if (value instanceof Magnitude) {
                result[2].push(value);
            }
            if (typeof value === 'object' && 'radians' in value) {
                result[3].push(value);
            }
            return result;
        }, [[], [], [], []]);
        this.magnitudes = magnitudes;
        this.points = points;
        this.vectors = vectors;
        this.angles = angles;
        this.isRelative = !!vectors.length;
    }
    static computeBoundingBox(points) {
        if (!points) {
            throw new Error(this.getNoPointsErrorMessage('boundingBox', true));
        }
        const [xValues, yValues] = points.reduce((values, point) => {
            values[0].push(point.x);
            values[1].push(point.y);
            return values;
        }, [[], []]);
        const xMax = +Calculator.max(xValues);
        const xMin = +Calculator.min(xValues);
        const yMax = +Calculator.max(yValues);
        const yMin = +Calculator.min(yValues);
        return { xMax, xMin, yMax, yMin };
    }
    static getNoPointsErrorMessage(name, property = false) {
        return `Attempting to ${property ? 'get' : 'call'} ${name} of Figure with no points assigned. Assign 'this.points' from the child class and try again.`;
    }
    reflect(about) {
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
                vector.reflect({
                    x: !about.isHorizontal,
                    y: !about.isVertical
                });
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
    rotate(phi, about) {
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
    scale(factor, about = new Point([0, 0])) {
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
    translate(vector) {
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
