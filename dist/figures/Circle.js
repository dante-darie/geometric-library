import { Calculator } from 'utilities/Calculator';
import { Ellipse } from 'figures/Ellipse';
import { Point } from 'abstracts/Point';
import { Angle } from 'abstracts/Angle';
export class Circle extends Ellipse {
    _radius;
    constructor(values) {
        const [center, radius] = values;
        const phi = new Angle(0, 'radians'); // Always 0 since circles don't change with rotation.
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
        const first = new Point([center.x, +Calculator.add(center.y, +radius)]);
        const second = new Point([+Calculator.add(center.x, +radius), center.y]);
        const third = new Point([center.x, +Calculator.sub(center.y, +radius)]);
        const fourth = new Point([+Calculator.sub(center.x, +radius), center.y]);
        return [first, second, third, fourth];
    }
}
