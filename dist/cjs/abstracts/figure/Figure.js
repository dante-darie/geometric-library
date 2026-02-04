"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Figure = void 0;
const _abstracts_1 = require("@abstracts");
const calculator_1 = require("@utilities/calculator");
class Figure {
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
    set values(values) {
        this._values = values;
        const [points, vectors, magnitudes, angles] = values.reduce((result, value) => {
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
        const xMax = +calculator_1.Calculator.max(xValues);
        const xMin = +calculator_1.Calculator.min(xValues);
        const yMax = +calculator_1.Calculator.max(yValues);
        const yMin = +calculator_1.Calculator.min(yValues);
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
                const referenceProjection = about.getPerpendicularProjection(points[0]);
                const referencePoint = points[0].clone().reflect(referenceProjection);
                const endPoint = points[0].clone().translate(vector);
                const endProjection = about.getPerpendicularProjection(endPoint);
                const positionalPoint = endPoint.reflect(endProjection);
                const reflectedVector = new _abstracts_1.Vector([referencePoint, positionalPoint]);
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
            const rotatedVector = new _abstracts_1.Vector([referencePoint, positionalPoint]);
            vector.replace(rotatedVector);
        });
        angles.forEach((angle) => {
            angle.replace(+calculator_1.Calculator.add(+angle, +phi), 'radians').normalize();
        });
        return this;
    }
    scale(factor, about = new _abstracts_1.Point([0, 0])) {
        const { points, vectors, magnitudes } = this;
        if (!points) {
            throw new Error(Figure.getNoPointsErrorMessage('scale'));
        }
        points.forEach((point) => {
            const positionalVector = new _abstracts_1.Vector([about, point]);
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
exports.Figure = Figure;
