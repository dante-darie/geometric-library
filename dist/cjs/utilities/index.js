"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PI2 = exports.yAxis = exports.xAxis = exports.coordinateOrigin = void 0;
const Calculator_1 = require("./Calculator");
const Point_1 = require("../abstracts/Point");
const Line_1 = require("../figures/Line");
exports.coordinateOrigin = new Point_1.Point([0, 0]);
exports.xAxis = new Line_1.Line([exports.coordinateOrigin, new Point_1.Point([1, 0])]);
exports.yAxis = new Line_1.Line([exports.coordinateOrigin, new Point_1.Point([0, 1])]);
exports.PI2 = +Calculator_1.Calculator.mul(Math.PI, 2); // 360 degrees
