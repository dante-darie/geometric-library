"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const _abstracts_1 = require("@abstracts");
const Ellipse_1 = require("../ellipse/Ellipse");
const calculator_1 = require("@utilities/calculator");
class Circle extends Ellipse_1.Ellipse {
    _radius;
    constructor(values) {
        const [center, radius] = values;
        const phi = new _abstracts_1.Angle(0, 'radians'); // Always 0 since circles don't change with rotation.
        super([center, radius, radius.clone(), phi]);
        this._radius = radius;
    }
    get isCircle() {
        return true;
    }
    get radius() {
        return this._radius;
    }
    get values() {
        const [center, radius] = super.values;
        return [center, radius];
    }
    set values(values) {
        super.values = values;
    }
    clone() {
        const values = this.values.map((value) => value.clone());
        return new Circle(values);
    }
    computeCriticalPoints(ellipse = this) {
        const { center, rx } = ellipse;
        const radius = rx;
        const first = new _abstracts_1.Point([center.x, +calculator_1.Calculator.add(center.y, +radius)]);
        const second = new _abstracts_1.Point([+calculator_1.Calculator.add(center.x, +radius), center.y]);
        const third = new _abstracts_1.Point([center.x, +calculator_1.Calculator.sub(center.y, +radius)]);
        const fourth = new _abstracts_1.Point([+calculator_1.Calculator.sub(center.x, +radius), center.y]);
        return [first, second, third, fourth];
    }
}
exports.Circle = Circle;
