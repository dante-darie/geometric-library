"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const Calculator_1 = require("../utilities/Calculator");
const Ellipse_1 = require("./Ellipse");
const Point_1 = require("../abstracts/Point");
const Angle_1 = require("../abstracts/Angle");
class Circle extends Ellipse_1.Ellipse {
    _radius;
    constructor(values) {
        const [center, radius] = values;
        const phi = new Angle_1.Angle(0, 'radians'); // Always 0 since circles don't change with rotation.
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
        const first = new Point_1.Point([center.x, +Calculator_1.Calculator.add(center.y, +radius)]);
        const second = new Point_1.Point([+Calculator_1.Calculator.add(center.x, +radius), center.y]);
        const third = new Point_1.Point([center.x, +Calculator_1.Calculator.sub(center.y, +radius)]);
        const fourth = new Point_1.Point([+Calculator_1.Calculator.sub(center.x, +radius), center.y]);
        return [first, second, third, fourth];
    }
}
exports.Circle = Circle;
