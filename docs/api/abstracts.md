[README](../../README.md) | **Abstracts** | [Figures](./figures.md) | [Utilities](./utilities.md) | [Types](./types.md) | [Architecture](../architecture.md) | [Contributing](../contributing.md)

---

# API Reference: Abstracts

## Flag

`Flag` is an abstraction of the `boolean` primitive in object form so that its value may be passed by reference. It can be used to determine if a line intersects another, if a point belongs to a line, the side of an ellipse arc, etc.

```javascript
// constructor
new Flag(value: boolean)

// example
const flag = new Flag(false);
```

```javascript
// api
{
  kind: 'flag';       // Discriminant property.
  value: boolean;     // Returns the value of the flag.
  clone(): this;      // Clones the Flag object.
  invert(): this;     // Inverts (negates) the value of the flag.
  replace(value: boolean): this; // Replaces the value of the flag.
  valueOf(): number;  // Returns 1 for true and 0 for false when the Flag object is used arithmetically.
}
```

## Angle

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
  kind: 'angle';      // Discriminant property.
  cos: number;        // Returns the cosine value of the angle.
  cot: number;        // Returns the cotangent value of the angle.
  degrees: number;    // Returns the angle value in degrees.
  radians: number;    // Returns the angle value in radians.
  sin: number;        // Returns the sine value of the angle.
  tan: number;        // Returns the tangent value of the angle.
  clone(): this;      // Clones the Angle object.
  normalize(): this;  // Normalizes the value of the angle within the range [0, 360] degrees.
  replace(value: number, unit: 'radians' | 'degrees'): this; // Replaces the value of the angle in the given unit.
  scale(factor: number): this; // Scales the angle by multiplying it by the given factor.
  valueOf(): number;  // Returns the value of the Angle in radians when the Angle object is used arithmetically.
}
```

## Magnitude

`Magnitude` implements the geometric concept of magnitude, which is essentially a value of dimension or size. It is an abstraction of the `number` primitive in object form so that its value may be passed by reference.

```javascript
// constructor
new Magnitude(value: number)

// example
const magnitude = new Magnitude(2);
```

```javascript
// api
{
  kind: 'magnitude';  // Discriminant property.
  value: number;      // Returns the value of the magnitude.
  clone(): this;      // Clones the Magnitude object.
  replace(value: number): this; // Replaces the value of the magnitude.
  scale(factor: number): this;  // Scales the magnitude by multiplying it by the given factor.
  valueOf(): number;  // Returns the value of the magnitude when the Magnitude object is used arithmetically.
}
```

## Vector

`Vector` implements the geometric concept of vector, which is essentially a combination of magnitude and direction (i.e., 2 units this way). It is generally useful in combination with a positional (a point or a figure) in order to perform transformations. It is determined by two values corresponding to the x and y axes.

```javascript
// constructor
new Vector([ dx: number, dy: number ])

// example
const vector = new Vector([1, 2]);
```

A Vector can also be constructed from two Points, representing the direction and distance from the first to the second:

```javascript
const vector = new Vector([pointA, pointB]);
```

```javascript
// api
{
  kind: 'vector';     // Discriminant property.
  dx: number;         // Returns the value of its x dimension.
  dy: number;         // Returns the value of its y dimension.
  magnitude: number;  // Returns the magnitude (length) of the vector.
  values: [dx: number, dy: number]; // Returns its dimensional values.
  angleTo(vector: Vector): Angle;   // Returns the angle between itself and a given vector.
  clone(): this;      // Clones the Vector object.
  dotProduct(vector: Vector): number; // Returns the dot product between itself and a given vector.
  reflect(about: { x: boolean, y: boolean }): this; // Reflects the vector about the given axes.
  replace(vector: Vector): this;   // Replaces the vector's values with a given vector's values, while keeping its reference.
  rotate(angle: Angle): this;     // Rotates the vector a given angle.
  scale(factor: number): this;    // Scales the vector by multiplying its dimensions by a given factor.
}
```

## Point

`Point` implements the geometric concept of point, which is essentially a given position within space (as determined by a 2D coordinate system). A point is determined by an `x` value and a `y` value. It is the most essential part of geometric representation.

```javascript
// constructor
new Point([ x: number, y: number ])

// example
const point = new Point([1, 2]);
```

```javascript
// api
{
  kind: 'point';      // Discriminant property.
  values: [ x: number, y: number ]; // Returns the coordinate positional values of the point.
  x: number;          // Returns the x coordinate value of the point.
  y: number;          // Returns the y coordinate value of the point.
  clone(): this;      // Clones the Point object.
  reflect(about: Point): this;    // Reflects the point about a given point.
  replace(point: Point): this;    // Replaces the point's values with a given point's values, while keeping its reference.
  rotate(angle: Angle, about?: Point): this; // Rotates the point a given angle about a given point. If no point is provided, the coordinate origin [0, 0] is used.
  translate(vector: Vector): this; // Translates the point following a given vector.
}
```

## Figure

`Figure` implements the geometric concept of figure, which is defined as a combination of points, lines, or planes. It is the basis for lines, curves, ellipses, and polygons. It is an abstract class meant for extension by more concrete figures.

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

const pointA = new Point([1, 1]);
const pointB = new Point([2, 2]);
const line = new Line([pointA, pointB]);
```

```javascript
// api
{
  values: TFigureValues;         // Returns the values that define the figure.
  boundingBox: IBoundingBox;     // Returns the bounding box of the figure.
  reflect(about: Point | Line): this;   // Reflects the figure about either a given point or a given line (perpendicularly).
  rotate(angle: Angle, about?: Point): this; // Rotates the figure a given angle about a given point. If no point is provided, the coordinate origin [0, 0] is used.
  scale(factor: number, about?: Point): this; // Scales the figure by multiplying its dimensions by a given factor.
  translate(vector: Vector): this;      // Translates the figure following a given vector.
}
```

### Internal Structure

The Figure base class separates constructor values into internal arrays by inspecting each value's `kind` property:

- `this.points: IPoint[]` - All Point values
- `this.vectors: IVector[]` - All Vector values
- `this.magnitudes: IMagnitude[]` - All Magnitude values
- `this.angles: IAngle[]` - All Angle values
- `this.isRelative: boolean` - `true` if any Vectors are present

Subclasses override these arrays in their constructors to establish figure-specific references.

---

[README](../../README.md) | **Abstracts** | [Figures](./figures.md) | [Utilities](./utilities.md) | [Types](./types.md) | [Architecture](../architecture.md) | [Contributing](../contributing.md)
