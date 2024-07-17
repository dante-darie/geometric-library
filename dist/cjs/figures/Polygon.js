"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polygon = void 0;
const Figure_1 = require("../abstracts/Figure");
class Polygon extends Figure_1.Figure {
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
exports.Polygon = Polygon;
