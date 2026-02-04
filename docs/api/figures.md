[README](../../README.md) | [Abstracts](./abstracts.md) | **Figures** | [Utilities](./utilities.md) | [Types](./types.md) | [Architecture](../architecture.md) | [Contributing](../contributing.md)

---

# API Reference: Figures

All figures extend the [Figure](./abstracts.md#figure) abstract base class and inherit its transformation methods (`translate`, `rotate`, `reflect`, `scale`) and `boundingBox` property.

## Line

`Line` implements the geometric concept of line, which is defined as an infinite one-dimensional figure. Mathematically it's defined by a point for its position and a vector for its direction. In its implementation it's defined by two points (segment) or a point and a vector.

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

  P0: Point;          // Returns the defining point of the line.
  P1: Point;          // Returns the second point of the line.
  V: Vector;          // Returns the direction vector of the line.
  a: number;          // Standard equation parameter (ax + by - c = 0).
  b: number;          // Standard equation parameter.
  c: number;          // Standard equation parameter.
  isHorizontal: boolean; // Returns true if the line is horizontal, otherwise false.
  isVertical: boolean;   // Returns true if the line is vertical, otherwise false.
  reciprocal: number | undefined; // Returns the line's reciprocal value or undefined if the line is horizontal.
  slope: number | undefined;     // Returns the line's slope value or undefined if the line is vertical.
  xIntercept: number | undefined; // Returns the x coordinate value of the point where the line intercepts the x axis, undefined if the line is horizontal or coincides with the x axis.
  yIntercept: number | undefined; // Returns the y coordinate value of the point where the line intercepts the y axis, undefined if the line is vertical or coincides with the y axis.
  angleTo(reference: Line | Vector): Angle; // Returns the angle between itself and a given line or vector.
  clone(): Line;      // Clones the Line object.
  getIntersectionPoint(line: Line): Point | undefined; // Returns the point of intersection between itself and a given line, undefined if the lines are parallel or coincide.
  getPerpendicularProjection(point: Point): Point; // Returns the perpendicular projection point within the line of a given point.
  getPerpendicularThrough(point: Point): Line;     // Returns a line passing through a given point that is perpendicular to the current line.
  getPointAtParameter(t: number): Point;           // Returns a point that belongs to the line corresponding to a given value of t (where t is a Real number).
  getXValueAtY(y: number): number | undefined;     // Returns the x value of a point that belongs to the line given a value of y, undefined if the line is horizontal.
  getYValueAtX(x: number): number | undefined;     // Returns the y value of a point that belongs to the line given a value of x, undefined if the line is vertical.
  hasPoint(point: Point): boolean;       // Returns true if a given point belongs to the line, false otherwise.
  isParallelTo(line: Line): boolean;     // Returns true if the line is parallel to a given line, false otherwise.
  isPerpendicularTo(line: Line): boolean; // Returns true if the line is perpendicular to a given line, false otherwise.
}
```

## Polygon

`Polygon` implements the geometric concept of polygon, which is defined as a two-dimensional figure with straight sides (lines). In its implementation it's defined by three or more points.

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

  sides: number;      // Returns the number of sides of the polygon.
}
```

## QuadraticBezierCurve

`QuadraticBezierCurve` implements the geometric concept of a quadratic Bezier curve, which is defined by three points: two endpoints and a control point (or anchor point) that determines the shape of the curve. In its implementation it may also be defined relatively by one base point and two vectors used to calculate the other endpoint and the control point.

```javascript
type TQuadraticBezierValues = [Point, Point, Point] | [Point, Vector, Vector];

// constructor
new QuadraticBezierCurve(values: TQuadraticBezierValues)

// example (absolute)
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

  criticalPoints: Point[]; // Returns the points (if any) where the derivative of the curve is zero, meaning points where the rate of change for x or y is zero. This is useful for finding peaks and valleys of the curve in the direction of either axis. Essential for correctly calculating the bounding box of the curve.
}
```

## CubicBezierCurve

`CubicBezierCurve` implements the geometric concept of a cubic Bezier curve, which is defined by four points: two endpoints and two control points (or anchor points) that determine the shape of the curve. In its implementation it may also be defined relatively by one base point and three vectors used to calculate the other endpoint and the two control points.

```javascript
type TCubicBezierValues = [Point, Point, Point, Point] | [Point, Vector, Vector, Vector];

// constructor
new CubicBezierCurve(values: TCubicBezierValues)

// example (absolute)
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

  criticalPoints: Point[]; // Returns the points (if any) where the derivative of the curve is zero, meaning points where the rate of change for x or y is zero. This is useful for finding peaks and valleys of the curve in the direction of either axis. Essential for correctly calculating the bounding box of the curve.
}
```

## Ellipse

`Ellipse` implements the geometric concept of ellipse, which is the figure determined by all those points in a plane such that the sum of their distances from two fixed points in the plane is constant. You may think of it as a circle with two radii instead of one, one for each axis. In its implementation it's defined by its center point, two radii, and the angle between the x-axis of the ellipse and the coordinate system's x-axis (i.e., the rotation angle).

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

  center: Point;      // Returns the center point of the ellipse.
  phi: Angle;         // Returns the angle of rotation of the ellipse.
  rx: Magnitude;      // Returns the radius magnitude of the ellipse's x-axis.
  ry: Magnitude;      // Returns the radius magnitude of the ellipse's y-axis.
  criticalPoints: [Point, Point, Point, Point]; // Returns the 4 points where the derivative of the ellipse curve is zero. Essential for correctly calculating the bounding box.
  computePointForTheta(theta: Angle): Point;    // Returns the point belonging to the ellipse at a given angle.
  computeThetaForPoint(point: Point): Angle;    // Returns the angle at which a point belonging to the ellipse is found.
}
```

## Circle

`Circle` implements the geometric concept of circle, which is the figure in which all points in the plane are equidistant from a given point (center). You may think of it as an ellipse with equal radii. As the shape stays the same regardless of rotation, there is no need for a rotation angle.

`Circle` extends `Ellipse` internally.

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

  center: Point;      // Returns the center point of the circle.
  radius: Magnitude;  // Returns the radius magnitude of the circle.
  criticalPoints: [Point, Point, Point, Point]; // Returns the 4 points where the derivative of the circle curve is zero. Essential for correctly calculating the bounding box.
}
```

## ArcCurve

`ArcCurve` represents a defined segment of a rotatable ellipse. It uses SVG-style endpoint parameterization: instead of specifying a center, you define start and end points along with radii, rotation, and two flags.

The two flags determine which of the four possible arc segments to draw:

- **Large arc flag** - Choose the larger or smaller arc
- **Sweep flag** - Draw in positive or negative angle increments

See the [Arc Implementation Notes from the SVG 2 Specification](https://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes) for a thorough explanation.

```javascript
type TArcAbsoluteValues = [Point, Magnitude, Magnitude, Angle, Flag, Flag, Point];
type TArcRelativeValues = [Point, Magnitude, Magnitude, Angle, Flag, Flag, Vector];
type TArcValues = TArcAbsoluteValues | TArcRelativeValues;

// constructor
new ArcCurve(values: TArcValues)

// example (absolute)
const pointA = new Point([0, 0]);
const pointB = new Point([10, 0]);
const rx = new Magnitude(5);
const ry = new Magnitude(10);
const xAxisRotation = new Angle(0, 'degrees');
const largeArc = new Flag(false); // choose the smaller arc
const sweep = new Flag(false);    // sweep in negative angle increments
const arcCurve = new ArcCurve([pointA, rx, ry, xAxisRotation, largeArc, sweep, pointB]);

// example (relative)
const pointA = new Point([0, 0]);
const vectorB = new Vector([10, 0]);
const rx = new Magnitude(5);
const ry = new Magnitude(10);
const xAxisRotation = new Angle(0, 'degrees');
const largeArc = new Flag(false);
const sweep = new Flag(false);
const arcCurve = new ArcCurve([pointA, rx, ry, xAxisRotation, largeArc, sweep, vectorB]);
```

```javascript
// api
{
  ...Figure // All the Figure properties and methods.

  center: Point;          // Returns the computed center point of the ellipse.
  criticalPoints: Point[]; // Returns the points (if any) where the derivative of the curve is zero. Essential for correctly calculating the bounding box.
}
```

---

[README](../../README.md) | [Abstracts](./abstracts.md) | **Figures** | [Utilities](./utilities.md) | [Types](./types.md) | [Architecture](../architecture.md) | [Contributing](../contributing.md)
