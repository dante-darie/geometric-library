# geometric-library

A Node based, visually agnostic implementation of geometric functions, both abstract and finite.

## Prerequisites

This library assumes you already have basic knowledge of geometric concepts, including:

- **Abstracts**: magnitude, direction, position, coordinate, vector, point, figure, angle
- **Figures**: line, curve, ellipse, polygon
- **Transformations**: rotation, translation, reflection, scaling
- **Units**: radian, degree

## Usage

You may install this library into your JavaScript or TypeScript project using the following command:

```sh
npm install geometric-library
```

You may then `import` (ESM) any of the classes listed in the **API** section:

```javascript
import { Point } from 'geometric-library';
```

Alternatively if you're using CommonJS in your project instead of ESM, you may `require` the modules:

```javascript
const { Point } = require('geometric-library');
```

If you're using TypeScript for your project you can also `import` types and interfaces for all the exported functionalities, which is recommended as it will make your life easier in terms of understading how everything works.

```javascript
import { IPoint, TPointValues } from 'geometric-library';
```

## Dependencies

#### Decimal.js

JavaScript is bad at math. Don't hate me for saying it, it's actually a pretty well known fact that JavaScript just struggles with even simple calculations and especially when they involve floating point numbers. Here's one of the many articles about it if you want to learn more: [Why JavaScript is Bad At Math](https://javascript.plainenglish.io/why-javascript-is-bad-at-math-9b8247640caa), by Alexandra Langton.

Though there are ways to more or less combat these issues natively, for the purposes of this library I chose to use an abstraction of [Decimal.js](https://mikemcl.github.io/decimal.js/), which does just that pretty efficiently.

Note: You do NOT have to install Decimal.js, as it's included with this library.

## Contributing

This project is open to contribution.

If you have found a bug please open an issue so it can be tracked and addressed as soon as possible. Please include information about how to reproduce it as well as the expected result and the actual result.

If you believe there's a missing feature feel free to open an issue as well detailing the feature request and its value to the users of this library.

If you want to directly contribute to the library, feel free to do so by opening a pull request with your changes, as long as there's a related issue tracking the bug/feature request.

On the note of directly contributing, though the project includes some automated scripts for linting, cleaning, building, testing and deploying the code, please do try to adhere to the existing standards in terms of naming, directory structure and principles (solid, kiss, single source of truth, etc).

## References

- [Intro to Bezier curves](https://iquilezles.org/articles/bezierbbox) by [Inigo Quilez](https://iquilezles.org/).
- [Arc Implementation Notes](https://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes) from the [SVG 2 Specification](https://www.w3.org/TR/SVG).

## License

This project is published and distributed under the [MIT License](./LICENSE).

## API

The types and interfaces exported from [./src/types/index.ts](./src/types/index.ts) should give you a pretty good idea of how to use any of the functionalities included in this library.

The following classes are available:

### Abstracts

#### Flag

`Flag` is just an abstraction of the `boolean` primitive in object form so that its value may be passed by reference. It can be used to determine if a line intersects another, if a point belongs to a line, the side of an ellipse arc, etc.

```javascript
// constructor
new Flag(value: boolean)

// example
const flag = new Flag(false);
```

```javascript
// api
{
  value: boolean; // Returns the value of the flag.
  clone(): this; // Clones the Flag object.
  invert(): this; // Inverts (negates) the value of the flag.
  replace(value: boolean): this; // Replaces the value of the flag.
  valueOf(): number; // Returns 1 for true and 0 for false when the Flag object is used arithmetically.
}
```

#### Angle

`Angle` implements the geometric concept of angle along with multiple trigonometric operations and pertinent transformations. It can be initialized with a value in either `degrees` or `radians` without presenting any differences, as it keeps a single internal source of truth.

```javascript
// constructor
new Angle(value: number, unit: 'radians' | 'degrees')

// example
const angleDeg = new Angle(180, 'degrees');
const angleRad = new Angle(Math.PI, 'radians'); // also 180 degrees
```

```javascript
// api
{
  cos: number; // Returns the cosine value of the angle.
  cot: number; // Returns the cotangent value of the angle.
  degrees: number; // Returns the angle value in degrees.
  radians: number; // Returns the angle value in radians.
  sin: number; // Returns the sine value of the angle.
  tan: number; // Returns the tangent value of the angle.
  clone(): this; // Clones the Angle object.
  normalize(): this; // Normalizes the value of the angle within the range [0, 360] degrees. Any angle outside the range is replaced with the equivalent angle within the range.
  replace(value: number, unit: 'radians' | 'degrees'): this; // Replaces the value of the angle in the given unit.
  scale(factor: number): this; // Scales the angle by multiplying it by the given factor.
  valueOf(): number; // Returns the value of the Angle in radians when the Angle object is used arithmetically.
}
```

#### Magnitude

`Magnitude` implements the geometric concept of magnitude, which is esentially a value of dimension or size. In its implementation it is esentially an abstraction of the `number` primitive in object form so that its value may be passed by reference.

```javascript
// constructor
new Magnitude(value: number)

// example
const magnitude = new Magnitude(2);
```

```javascript
// api
{
  value: number; // Returns the value of the magnitude.
  clone(): this; // Clones the Magnitude object.
  replace(value: boolean): this; // Replaces the value of the flag.
  scale(factor: number): this; // Scales the magnitude by multiplying it by the given factor.
  valueOf(): number; // Returns the value of the magnitude when the Magnitude object is used arithmetically.
}
```

#### Vector

`Vector` implements the geometric concept of vector, which is esentially a combination of magnitude and direction (ie. 2 units this way) and is generally useful in combination with a positional (a point or a figure) in order to perform different transformations. It is determined by two values corresponding to the x and y axii.

```javascript
// constructor
new Vector([ dx: number, dy: number ])

// example
const vector = new Vector([1, 2]);
```

```javascript
// api
{
  dx: number; // Returns the value of its x dimension.
  dy: number; // Returns the value of its y dimension.
  values: [dx: number, dy: number]; // Returns its dimensional values.
  angleTo(vector: Vector): Angle; // Returns the angle between itself and a given vector.
  clone(): this; // Clones the Vector object.
  dotProduct(vector: Vector): number; // Returns the dot product between itself and a given vector.
  reflect(about: Point): this; // Reflects the vector about a given point.
  replace(vector: Vector): this; // Replaces the vector's values with a given vector's values, while keeping its reference.
  rotate(angle: Angle): this; // Rotates the vector a given angle.
  scale(factor: number): this; // Scales the vector by multiplying its dimensions by a given factor.
}
```

#### Point

`Point` implements the geometric concept of point, which is esentially a given position within space (as determined by a 2..n dimensions coordinate system). This library is currently limited to 2 dimensions and therefore a point is determined by an `x` value and a `y` value. A point it is the most essential part of geometric representation. A point does not have a dimension, however concepts determined by two or more points can have 2..n dimensions (ie. line: 1D, square: 2D, cube: 3D, etc.).

```javascript
// constructor
new Point([ x: number, y: number ])

// example
const vector = new Point([1, 2]);
```

```javascript
// api
{
  values: [ x: number, y: number ]; // Returns the coordinate positional values of the point.
  x: number; // Returns the x coordinate value of the point.
  y: number; // Returns the y coordinate value of the point
  clone(): this; // Clones the Point object.
  reflect(about: Point): this; // Reflects the point about a given point.
  replace(point: Point): this; // Replaces the point's values with a given point's values, while keeping its reference.
  rotate(angle: Angle, about?: Point): this; // Rotates the point a given angle about a given point. If no point is provided about which to rotate, the coordinate origin point [0, 0] is used instead.
  translate(vector: Vector): this; // Translates the point following a given vector.
}
```

#### Figure

`Figure` implements the geometric concept of figure, which is defined as a combination of points, lines or planes. It is the basis for lines, curves, ellipses and polygons. As such, it is an abstract class meant for extension by more concrete figures.

```javascript
type TFigureValues = [Point, ...(Angle | Flag | Magnitude | Point | Vector)[]];
interface IBoundingBox { xMin: number, xMax: number, yMin: number, yMax: number }

// constructor
constructor (values: TFigureValues) {...}

// example
class Line extends Figure {
  constructor(values: [Point, Point]) {
    super(values);
  }
}

...

const pointA = new Point([1, 1]);
const pointB = new Point([2, 2]);
const line = new Line([pointA, pointB]);
```

```javascript
// api
{
  values: TFigureValues; // Returns the values that define the figure.
  boundingBox: IBoundingBox; // Returns the bounding box of the figure.
  reflect(about: Point | Line): this; // Reflects the figure about either a given point or a given line (perpendicularly).
  rotate(angle: Angle, about?: Point): this; // Rotates the figure a given angle about a given point. If no point is provided about which to rotate, the coordinate origin point [0, 0] is used instead.
  scale(factor: number, about?: IPoint): this; // Scales the figure by multiplying its dimensions by a given factor.
  translate(vector: IVector): this; // Translates the figure following a given vector.
}
```

### Figures

#### Line

`Line` implements the geometric concept of line, which is defined as an infinite one dimensional figure. Mathematically it's defined by a point for its position and a vector for its direction. In its implementation it's defined by two points (segment) or a point and a vector.

```javascript
type TLineValues = [Point, Point] | [Point, Vector];

// constructor
new Line(values: TLineValues)

// example
const pointA = new Point([1, 1]);
const pointB = new Point([2, 2]);
const line = new Line([pointA, pointB]);
```

```javascript
// api
{
  ...Figure // All the Figure properties and methods.

  P0: Point; // Returns the defining point of the line.
  isHorizontal: boolean; // Returns true if the line is horizontal, otherwise false.
  isVertical: boolean; // Returns true if the line is vertical, otherwise false.
  reciprocal: number | undefined; // Returns the line's reciprocal value or undefined if the line is horizontal.
  slope: number | undefined; // Returns the line's slope value or undefined if the line is vertical.
  xIntercept: number | undefined; // Returns the x coordinate value of the point where the line intercepts the x axis, undefined if the line is horizontal or coincides with the x acis.
  yIntercept: number | undefined; // Returns the y coordinate value of the point where the line intercepts the y axis, undefined if the line is vertical or coincides with the y axis.
  angleTo(reference: Line | Vector): Angle; // Returns the angle betweem itself and a given line or vector.
  getIntersectionPoint(line: Line): Point | undefined; // Returns the point of intersection between itself and a given line, undefined if the lines are parallel or coincide.
  getPerpendicularProjection(point: Point): Point; // Returns the perpendicular projection point within the line of a given point.
  getPerpendicularThrough(point: Point): Line; // Returns a line passing through a given point that is perpendicular to the current line.
  getPointAtParameter(t: number): Point | undefined; // Returns a point that belongs to the line corresponding to a given value of t (where t is a Real number).
  getXValueAtY(y: number): number | undefined; // Returns the x value of a point that belongs to the line given a value of y, undefined if the line is horizontal.
  getYValueAtX(x: number): number | undefined; // Returns the y value of a point that belongs to the line given a value of x, undefined if the line is vertical.
  hasPoint(point: Point): boolean; // Returns true if a given point belongs to the line, false otherwise.
  isParallelTo(line: Line): boolean; // Returns true if the line is parallel to a given line, false otherwise.
  isPerpendicularTo(line: Line): boolean; // Returns true if the line is perpendicular to a given line, false otherwise.
}
```

#### Polygon

`Polygon` implements the geometric concept of polygon, which is defined as two dimensional figure with straight sides (lines). In its implementation it's defined by three or more points.

```javascript
type TPolygonValues = [Point, Point, Point, ...Point[]];

// constructor
new Polygon(values: TPolygonValues)

// example
const pointA = new Point([0, 0]);
const pointB = new Point([0, 5]);
const pointC = new Point([5, 5]);
const polygon = new Polygon([pointA, pointB, pointC]);
```

```javascript
// api
{
  ...Figure // All the Figure properties and methods.

  sides: number; // Returns the number of sides of the polygon.
}
```

#### QuadraticBezierCurve

`QuadraticBezierCurve` implements the geometric concept of a quadratic Bezier curve, which is defined by three points: two endpoints and a control point (or anchor point) that determines the shape of the curve. In its implementation it may also be defined relatively by one base point and two vectors used to calculate the other endpoint and the control point.

```javascript
type TQuadraticBezierValues = [Point, Point, Point] | [Point, Vector, Vector];

// constructor
new QuadraticBezierCurve(values: TQuadraticBezierValues)

// example
const pointA = new Point([0, 0]);
const pointB = new Point([5, 5]);
const pointC = new Point([0, 10]);
const quadraticBezierCurve = new QuadraticBezierCurve([pointA, pointB, pointC]);

// example (relative)
const pointA = new Point([0, 0]);
const vectorB = new Vector([5, 5]);
const vectorC = new Vector([0, 5]);
const quadraticBezierCurve = new QuadraticBezierCurve([pointA, vectorB, vectorC]);
```

```javascript
// api
{
  ...Figure // All the Figure properties and methods.

  criticalPoints: Point[]; // Returns the points (if any) where the derivative of the curve is zero, meaning points where the rate of change for x or y is zero. This is useful for finding peeks and valleys of the curve in the direction of either axis. This is essential, for example, for correctly calculating the bounding box of the curve.
}
```

#### CubicBezierCurve

`CubicBezierCurve` implements the geometric concept of a cubic Bezier curve, which is defined by four points: two endpoints and a two control points (or anchor points) that determine the shape of the curve. In its implementation it may also be defined relatively by one base point and three vectors used to calculate the other endpoint and the two control points.

```javascript
type TCubicBezierValues = [Point, Point, Point, Point] | [Point, Vector, Vector, Vector];

// constructor
new CubicBezierCurve(values: TCubicBezierValues)

// example
const pointA = new Point([0, 0]);
const pointB = new Point([5, 5]);
const pointC = new Point([10, 5]);
const pointD = new Point([15, 0]);
const cubicBezierCurve = new CubicBezierCurve([pointA, pointB, pointC, pointD]);

// example (relative)
const pointA = new Point([0, 0]);
const vectorB = new Vector([5, 5]);
const vectorC = new Vector([10, 5]);
const vectorD = new Vector([15, 0]);
const cubicBezierCurve = new CubicBezierCurve([pointA, vectorB, vectorC, vectorD]);
```

```javascript
// api
{
  ...Figure // All the Figure properties and methods.

  criticalPoints: Point[]; // Returns the points (if any) where the derivative of the curve is zero, meaning points where the rate of change for x or y is zero. This is useful for finding peeks and valleys of the curve in the direction of either axis. This is essential, for example, for correctly calculating the bounding box of the curve.
}
```

#### Ellipse

`Ellipse` implements the geometric concept of ellipse, which is defined is the figure determined by all those points in a plane such that the sum of their distances from two fixed points in the plane, is constant. You may think of it as a circle with two radii instead of one, one for each axis. In its implementation it's defined by its center point, two radii and the angle between the x-axis of the ellipse and the coordinate system's x-axis, in other words, the angle at which it is rotated, if any.

```javascript
// constructor
new Ellipse(values: [center: Point, rx: Magnitude, ry: Magnitude, rotation: Angle])

// example
const center = new Point([0, 0]);
const rx = new Magnitude(5);
const ry = new Magnitude(10);
const rotation = new Angle(45, 'degrees');
const ellipse = new Ellipse([center, rx, ry, rotation]);
```

```javascript
// api
{
  ...Figure // All the Figure properties and methods.

  center: Point; // Returns the center point of the ellipse.
  phi: Angle; // Returns the angle of rotation of the ellipse, meaning the angle between the x-axis of the ellipse and the coordinate system's x-axis.
  rx: Magnitude; // Returns the radius magnitude of the ellipse's x-axis.
  ry: Magnitude; // Returns the radius magnitude of the ellipse's y-axis.
  criticalPoints: [Point, Point, Point, Point]; // Returns the points (always 4) where the derivative of the curve of the ellipse is zero, meaning points where the rate of change for x or y is zero. This is useful for finding peeks and valleys of the ellipse's curve in the direction of either axis. This is essential, for example, for correctly calculating the bounding box of the ellipse.
  computePointForTheta(theta: Angle): Point; // Returns the point belonging to the ellipse at a given angle.
  computeThetaForPoint(point: Point): Angle; // Returns the angle at which a point belonging to the ellipse is found.
}
```

#### Circle

`Circle` implements the geometric concept of circle, which is defined is the figure figure in which the set of all its points in the plane are equidistant from a given point (center). You may think of it as an ellipse with equal radii. In contrast to the ellipse, as regardless of rotation of the circle its shape stays the same, there is no need for a rotation angle.

```javascript
// constructor
new Circle(values: [center: Point, radius: Magnitude])

// example
const center = new Point([0, 0]);
const radius = new Magnitude(5);
const circle = new Circle([center, radius]);
```

```javascript
// api
{
  ...Figure // All the Figure properties and methods.

  center: Point; // Returns the center point of the circle.
  radius: Magnitude; // Returns the radius magnitude of the circle.
  criticalPoints: [Point, Point, Point, Point]; // Returns the points (always 4) where the derivative of the curve of the circle is zero, meaning points where the rate of change for x or y is zero. This is useful for finding peeks and valleys of the circle's curve in the direction of either axis. This is essential, for example, for correctly calculating the bounding box of the circle.
}
```

#### ArcCurve

`ArcCurve` represents a defined segment of a rotatable ellipse and it is usually defined by centric parameters: a center point, an x radius, a y radius, an angle (phi) between the x-axis of the ellipse and the coordinate system's x-axis, an angle (theta1) representing the point at which the segment starts and an angle (theta2) representing the point at which the segment ends. As any two points of an ellipse can determine two different segments, a flag parameter is also necessary in order to determine whether the arc should be drawn in positive increments from the start angle (theta1) toward the end angle (theta2) or in negative increments (the "sweep" flag). In its implementation, an arc curve is defined by endpoint parameters, that is, instead of a center parameter we define two points that represent the start point and end point of the arc. Internally the center is computed and the radii are adjusted, if necessary, in order for all the calculations and transformations to be correct. This is useful when wanting to create an elliptical arc from point A to point B, which is usually the case. Since there are always two possible ellipses of a given angle and dimensions that can pass through the two given endpoints, now there are 4 possible arc segments to choose from and therefore one more flag is necessary (the "large arc" flag). See the [Arc Implementation Notes from the SVG 2 Specification](https://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes) for a more thorough explanation.

```javascript
type TArcAbsoluteValues = [Point, Magnitude, Magnitude, Angle, Flag, Flag, Point];
type TArcRelativeValues = [Point, Magnitude, Magnitude, Angle, Flag, Flag, Vector]; // here the Vector is used to determine the end Point
type TArcValues = TArcAbsoluteValues | TArcRelativeValues;

// constructor
new ArcCurve(values: TArcValues)

// example
const pointA = new Point([0, 0]);
const pointB = new Point([10, 0]);
const rx = new Magnitude(5);
const ry = new Magnitude(10);
const xAxisRotation = new Angle(0, 'degrees');
const largeArc = new Flag(false); // choose the smaller arc
const sweep = new Flag(false); // sweep in negative angle increments
const arcCurve = new ArcCurve([pointA, rx, ry, xAxisRotation, largeArc, sweep, pointB]);

// example (relative)
const pointA = new Point([0, 0]);
const vectorB = new Point([10, 0]);
const rx = new Magnitude(5);
const ry = new Magnitude(10);
const xAxisRotation = new Angle(0, 'degrees');
const largeArc = new Flag(false); // choose the smaller arc
const sweep = new Flag(false); // sweep in negative angle increments
const arcCurve = new ArcCurve([pointA, rx, ry, xAxisRotation, largeArc, sweep, vectorB]);
```

```javascript
// api
{
  ...Figure // All the Figure properties and methods.

  center: Point; // Returns the center point of the ellipse.
  criticalPoints: Point[]; // Returns the points (if any) where the derivative of the curve is zero, meaning points where the rate of change for x or y is zero. This is useful for finding peeks and valleys of the curve in the direction of either axis. This is essential, for example, for correctly calculating the bounding box of the curve.
}
```
