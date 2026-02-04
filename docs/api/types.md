[README](../../README.md) | [Abstracts](./abstracts.md) | [Figures](./figures.md) | [Utilities](./utilities.md) | **Types** | [Architecture](../architecture.md) | [Contributing](../contributing.md)

---

# API Reference: Types

All types and interfaces are exported from `geometric-library` and can be imported directly:

```typescript
import { IPoint, TPointValues, IBoundingBox } from 'geometric-library';
```

## General Types

### TSegment

```typescript
type TSegment = [IPoint, IPoint];
```

A pair of points representing a line segment.

### TAxis / TAxii

```typescript
type TAxis = 'x' | 'y';
type TAxii = ['x', 'y'];
```

Axis identifiers for the 2D coordinate system.

### IBoundingBox

```typescript
interface IBoundingBox {
  xMax: number;
  xMin: number;
  yMax: number;
  yMin: number;
}
```

Axis-aligned bounding box for any figure.

### ISize

```typescript
interface ISize {
  height: number;
  width: number;
}
```

Width and height dimensions.

### IClonable\<T\>

```typescript
interface IClonable<T> {
  clone(): T;
}
```

Generic interface ensuring type-safe cloning. All abstracts and figures implement this.

## Abstract Interfaces

### IFlag

```typescript
interface IFlag extends IClonable<IFlag> {
  readonly kind: 'flag';
  readonly value: boolean;
  invert(): this;
  replace(value: boolean): this;
  valueOf(): number;
}
```

### IAngle

```typescript
type TAngleUnit = 'radians' | 'degrees';
type TAngleRange = [IAngle, IAngle];

interface IAngle extends IClonable<IAngle> {
  readonly cos: number;
  readonly cot: number;
  readonly degrees: number;
  readonly kind: 'angle';
  readonly radians: number;
  readonly sin: number;
  readonly tan: number;
  normalize(): this;
  replace(value: number, unit: TAngleUnit): this;
  scale(factor: number): this;
  valueOf(): number;
}
```

### IMagnitude

```typescript
interface IMagnitude extends IClonable<IMagnitude> {
  readonly kind: 'magnitude';
  readonly value: number;
  replace(value: number): this;
  scale(factor: number): this;
  valueOf(): number;
}
```

### IPoint

```typescript
type TPointValues = [number, number];

interface IPoint extends IClonable<IPoint> {
  readonly kind: 'point';
  readonly values: TPointValues;
  readonly x: number;
  readonly y: number;
  reflect(about: IPoint): this;
  replace(point: IPoint): this;
  rotate(phi: IAngle, about?: IPoint): this;
  translate(vector: IVector): this;
}
```

### IVector

```typescript
type TVectorValues = [number, number];

interface IVector extends IClonable<IVector> {
  readonly dx: number;
  readonly dy: number;
  readonly kind: 'vector';
  readonly magnitude: number;
  readonly values: TVectorValues;
  angleTo(vector: IVector): IAngle;
  dotProduct(vector: IVector): number;
  reflect(about: { x: boolean; y: boolean }): this;
  replace(vector: IVector): this;
  rotate(phi: IAngle): this;
  scale(factor: number): this;
}
```

## Figure Types

### TFigureValue / TFigureValues

```typescript
type TFigureValue = IFlag | IMagnitude | IAngle | IPoint | IVector;
type TFigureValues = [IPoint, ...TFigureValue[]];
```

The generic value tuple for any figure. The first element is always a Point (the base/anchor point). Remaining elements can be any combination of abstract types. Each concrete figure defines its own specific value tuple types.

### IFigure

```typescript
interface IFigure {
  readonly boundingBox: IBoundingBox;
  readonly values: TFigureValues;
  reflect(about: IPoint | ILine): this;
  rotate(phi: IAngle, about?: IPoint): this;
  scale(factor: number, about?: IPoint): this;
  translate(vector: IVector): this;
}
```

## Figure-Specific Types

### Line

```typescript
type TLineRelativeValues = [IPoint, IVector];
type TLineAbsoluteValues = [IPoint, IPoint];
type TLineValues = TLineAbsoluteValues | TLineRelativeValues;

interface ILine extends IFigure, IClonable<ILine> {
  readonly P0: IPoint;
  readonly P1: IPoint;
  readonly V: IVector;
  readonly a: number;
  readonly b: number;
  readonly c: number;
  readonly isHorizontal: boolean;
  readonly isVertical: boolean;
  readonly reciprocal: number | undefined;
  readonly slope: number | undefined;
  readonly xIntercept: number | undefined;
  readonly yIntercept: number | undefined;
  angleTo(reference: ILine | IVector): IAngle;
  getIntersectionPoint(line: ILine): IPoint | undefined;
  getPerpendicularProjection(point: IPoint): IPoint;
  getPerpendicularThrough(point: IPoint): ILine;
  getPointAtParameter(t: number): IPoint;
  getXValueAtY(y: number): number | undefined;
  getYValueAtX(x: number): number | undefined;
  hasPoint(point: IPoint): boolean;
  isParallelTo(line: ILine): boolean;
  isPerpendicularTo(line: ILine): boolean;
}
```

### Ellipse

```typescript
type TEllipseValues = [IPoint, IMagnitude, IMagnitude, IAngle];
type TEllipseCriticalPoints = [IPoint, IPoint, IPoint, IPoint];

interface IEllipse extends IFigure, IClonable<IEllipse> {
  readonly center: IPoint;
  readonly criticalPoints: TEllipseCriticalPoints;
  readonly phi: IAngle;
  readonly rx: IMagnitude;
  readonly ry: IMagnitude;
  computePointForTheta(theta: IAngle): IPoint;
  computeThetaForPoint(point: IPoint): IAngle;
}
```

### Circle

```typescript
type TCircleValues = [IPoint, IMagnitude];

interface ICircle extends IFigure, IClonable<ICircle> {
  readonly center: IPoint;
  readonly criticalPoints: TEllipseCriticalPoints;
  readonly radius: IMagnitude;
}
```

### ArcCurve

```typescript
type TArcAbsoluteValues = [IPoint, IMagnitude, IMagnitude, IAngle, IFlag, IFlag, IPoint];
type TArcRelativeValues = [IPoint, IMagnitude, IMagnitude, IAngle, IFlag, IFlag, IVector];
type TArcValues = TArcAbsoluteValues | TArcRelativeValues;

interface IArcCurve extends IFigure, IClonable<IArcCurve> {
  readonly center: IPoint;
  readonly criticalPoints: IPoint[];
}
```

### CubicBezierCurve

```typescript
type TCubicBezierAbsoluteValues = [IPoint, IPoint, IPoint, IPoint];
type TCubicBezierRelativeValues = [IPoint, IVector, IVector, IVector];
type TCubicBezierValues = TCubicBezierAbsoluteValues | TCubicBezierRelativeValues;

interface ICubicBezierCurve extends IFigure, IClonable<ICubicBezierCurve> {
  readonly criticalPoints: IPoint[];
}
```

### QuadraticBezierCurve

```typescript
type TQuadraticBezierAbsoluteValues = [IPoint, IPoint, IPoint];
type TQuadraticBezierRelativeValues = [IPoint, IVector, IVector];
type TQuadraticBezierValues = TQuadraticBezierAbsoluteValues | TQuadraticBezierRelativeValues;

interface IQuadraticBezierCurve extends IFigure, IClonable<IQuadraticBezierCurve> {
  readonly criticalPoints: IPoint[];
}
```

### Polygon

```typescript
type TPolygonValues = [IPoint, IPoint, IPoint, ...IPoint[]];

interface IPolygon extends IFigure, IClonable<IPolygon> {
  readonly sides: number;
}
```

---

[README](../../README.md) | [Abstracts](./abstracts.md) | [Figures](./figures.md) | [Utilities](./utilities.md) | **Types** | [Architecture](../architecture.md) | [Contributing](../contributing.md)
