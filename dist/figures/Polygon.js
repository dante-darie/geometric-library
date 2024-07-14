import { Figure } from 'abstracts/Figure';
export class Polygon extends Figure {
    constructor(values) {
        super(values);
    }
    get sides() {
        return this.points.length;
    }
    clone() {
        const values = this.values.map((value) => value.clone());
        return new Polygon(values);
    }
}
