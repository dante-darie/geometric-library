"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PI2 = exports.yAxis = exports.xAxis = exports.coordinateOrigin = void 0;
const calculator_1 = require("./calculator");
const _abstracts_1 = require("@abstracts");
const _figures_1 = require("@figures");
__exportStar(require("./calculator"), exports);
exports.coordinateOrigin = new _abstracts_1.Point([0, 0]);
exports.xAxis = new _figures_1.Line([exports.coordinateOrigin, new _abstracts_1.Point([1, 0])]);
exports.yAxis = new _figures_1.Line([exports.coordinateOrigin, new _abstracts_1.Point([0, 1])]);
exports.PI2 = calculator_1.Calculator.PI2; // 360 degrees
