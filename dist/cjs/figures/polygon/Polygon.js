"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polygon = void 0;
const _abstracts_1 = require("@abstracts");
class Polygon extends _abstracts_1.Figure {
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
