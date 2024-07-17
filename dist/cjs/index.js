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
exports.Calculator = exports.QuadraticBezierCurve = exports.Polygon = exports.Line = exports.Ellipse = exports.CubicBezierCurve = exports.Circle = exports.ArcCurve = exports.Vector = exports.Point = exports.Magnitude = exports.Flag = exports.Figure = exports.Angle = void 0;
/* v8 ignore */
var Angle_1 = require("./abstracts/Angle");
Object.defineProperty(exports, "Angle", { enumerable: true, get: function () { return Angle_1.Angle; } });
var Figure_1 = require("./abstracts/Figure");
Object.defineProperty(exports, "Figure", { enumerable: true, get: function () { return Figure_1.Figure; } });
var Flag_1 = require("./abstracts/Flag");
Object.defineProperty(exports, "Flag", { enumerable: true, get: function () { return Flag_1.Flag; } });
var Magnitude_1 = require("./abstracts/Magnitude");
Object.defineProperty(exports, "Magnitude", { enumerable: true, get: function () { return Magnitude_1.Magnitude; } });
var Point_1 = require("./abstracts/Point");
Object.defineProperty(exports, "Point", { enumerable: true, get: function () { return Point_1.Point; } });
var Vector_js_1 = require("./abstracts/Vector.js");
Object.defineProperty(exports, "Vector", { enumerable: true, get: function () { return Vector_js_1.Vector; } });
var ArcCurve_1 = require("./figures/ArcCurve");
Object.defineProperty(exports, "ArcCurve", { enumerable: true, get: function () { return ArcCurve_1.ArcCurve; } });
var Circle_1 = require("./figures/Circle");
Object.defineProperty(exports, "Circle", { enumerable: true, get: function () { return Circle_1.Circle; } });
var CubicBezierCurve_1 = require("./figures/CubicBezierCurve");
Object.defineProperty(exports, "CubicBezierCurve", { enumerable: true, get: function () { return CubicBezierCurve_1.CubicBezierCurve; } });
var Ellipse_1 = require("./figures/Ellipse");
Object.defineProperty(exports, "Ellipse", { enumerable: true, get: function () { return Ellipse_1.Ellipse; } });
var Line_1 = require("./figures/Line");
Object.defineProperty(exports, "Line", { enumerable: true, get: function () { return Line_1.Line; } });
var Polygon_1 = require("./figures/Polygon");
Object.defineProperty(exports, "Polygon", { enumerable: true, get: function () { return Polygon_1.Polygon; } });
var QuadraticBezierCurve_1 = require("./figures/QuadraticBezierCurve");
Object.defineProperty(exports, "QuadraticBezierCurve", { enumerable: true, get: function () { return QuadraticBezierCurve_1.QuadraticBezierCurve; } });
var Calculator_1 = require("./utilities/Calculator");
Object.defineProperty(exports, "Calculator", { enumerable: true, get: function () { return Calculator_1.Calculator; } });
__exportStar(require("./utilities"), exports);
__exportStar(require("./types"), exports);
