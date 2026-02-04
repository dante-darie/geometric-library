[README](../README.md) | [Abstracts](./api/abstracts.md) | [Figures](./api/figures.md) | [Utilities](./api/utilities.md) | [Types](./api/types.md) | **Architecture** | [Contributing](./contributing.md)

---

# Architecture

## Overview

geometric-library is a TypeScript library implementing 2D geometric primitives and operations. It uses Decimal.js for precision arithmetic and distributes as both ESM and CommonJS.

## Directory Structure

```
src/
  abstracts/        Primitive types and the Figure base class
    Angle.ts        Angle with trig operations (stores radians internally)
    Figure.ts       Abstract base for all geometric figures
    Flag.ts         Boolean wrapper for pass-by-reference
    Magnitude.ts    Numeric wrapper for pass-by-reference
    Point.ts        2D coordinate [x, y]
    Vector.ts       Direction + magnitude [dx, dy]
    *.test.ts       Colocated test files

  figures/          Concrete geometric figures (all extend Figure)
    ArcCurve.ts     SVG-style endpoint-parameterized elliptical arc
    Circle.ts       Center + radius (extends Ellipse)
    CubicBezierCurve.ts   4-point or 1-point + 3-vector cubic curve
    Ellipse.ts      Center + rx + ry + rotation angle
    Line.ts         Two-point or point-vector line
    Polygon.ts      3+ point polygon
    QuadraticBezierCurve.ts  3-point or 1-point + 2-vector quadratic curve
    *.test.ts       Colocated test files

  types/
    index.ts        All interfaces and type definitions

  utilities/
    Calculator.ts   Static Decimal.js wrapper for precision math
    index.ts        Exports coordinateOrigin, xAxis, yAxis, PI2

  index.ts          Library entry point, re-exports everything
```

## Design Patterns

### Kind Discriminant

Every abstract class has a `readonly kind` string literal property (`'point'`, `'vector'`, `'flag'`, `'angle'`, `'magnitude'`). The Figure base class uses this in its `values` setter to sort constructor arguments into typed internal arrays:

```typescript
switch (value.kind) {
  case 'point':     result[0].push(value); break;
  case 'vector':    result[1].push(value); break;
  case 'magnitude': result[2].push(value); break;
  case 'angle':     result[3].push(value); break;
}
```

This decouples the Figure from specific concrete types and allows any combination of abstracts in a figure's value tuple.

### Dual Constructor (Absolute / Relative)

Figures support two initialization modes:

- **Absolute**: All positional arguments are Points (e.g., `new Line([pointA, pointB])`)
- **Relative**: First argument is a Point, remaining positional arguments are Vectors (e.g., `new Line([point, vector])`)

The Figure base class detects relative mode by checking `!!vectors.length` and sets `this.isRelative`. Subclass constructors handle the distinction by checking `instanceof Vector` on the second argument.

For relative definitions, absolute positions are computed from the base point plus vectors (e.g., `P0.clone().translate(vector)` gives the second point).

### Pass-by-Reference Wrappers

`Flag` (boolean) and `Magnitude` (number) wrap primitives in objects so they can be passed by reference and mutated in place. This is critical because Figure stores references to these objects in its internal arrays. When a Magnitude is scaled during a figure transformation, the Figure's reference to it remains valid and reflects the updated value.

### Lazy Computation (Dirty Flag)

Figures with derived properties use a `_dirty: boolean` flag pattern:

1. Set `_dirty = true` in the constructor
2. Override each transformation method to call `super.method(...)`, then set `_dirty = true`, then return `this`
3. Add a private `ensureComputed()` method that recalculates derived properties only when `_dirty` is `true`
4. Each getter for a derived property calls `ensureComputed()` before returning the cached value

Example from `Line`: `slope`, `yIntercept`, `reciprocal`, and `xIntercept` are only recomputed when the line has been transformed since the last access.

### Method Chaining

All mutation methods return `this`, enabling fluent chains:

```typescript
point.translate(vector).rotate(angle).reflect(origin);
line.scale(2).rotate(angle);
```

### Epsilon-Based Precision

All math goes through the `Calculator` class, which wraps Decimal.js. After every operation, `roundDecimalWithPrecision` checks if the result is within `EPSILON` (1e-8) of the nearest integer and snaps to it. This eliminates floating-point artifacts.

Comparisons use:
- `Calculator.isEqual(a, b)` - checks `|a - b| <= EPSILON`
- `Calculator.isNearZero(a)` - checks `|a| <= EPSILON`

## Build System

Three separate TypeScript configurations produce different output formats:

| Config | Output | Format |
|---|---|---|
| `tsconfig.cjs.json` | `dist/cjs/` | CommonJS |
| `tsconfig.esm.json` | `dist/esm/` | ES Modules |
| `tsconfig.types.json` | `dist/types/` | Declaration files only |

The `package.json` maps these:
- `main` -> `dist/cjs/index.js` (CommonJS entry)
- `module` -> `dist/esm/index.js` (ESM entry)
- `types` -> `dist/types/index.d.ts` (TypeScript declarations)

## Figure Base Class Internals

The `Figure` abstract class is the foundation for all geometric figures. Its constructor accepts a `TFigureValues` tuple and separates it into typed arrays:

- `this.points: IPoint[]` - All Point values
- `this.vectors: IVector[]` - All Vector values
- `this.magnitudes: IMagnitude[]` - All Magnitude values
- `this.angles: IAngle[]` - All Angle values

Subclass constructors call `super(values)`, then reassign these arrays to establish figure-specific references (e.g., `this.points = [this.P0, this.P1]`).

### Transformation Methods

The base `Figure` provides default implementations for `translate`, `rotate`, `reflect`, and `scale`. These iterate over the internal arrays and transform each element appropriately:

- **translate**: Translates all points by the given vector
- **rotate**: Rotates all points, recomputes vectors from rotated positions, adds the rotation angle to all angles
- **reflect**: Reflects all points, recomputes vectors from reflected positions
- **scale**: Scales point positions relative to a center, scales vectors and magnitudes by the factor

Subclasses override these when they need additional behavior (e.g., setting a dirty flag for derived properties).

### Bounding Box

The base `boundingBox` getter computes an axis-aligned bounding box from `this.points`. Figures with curves (Bezier, Ellipse, Arc) override this to include critical points (extrema) in the computation.

---

[README](../README.md) | [Abstracts](./api/abstracts.md) | [Figures](./api/figures.md) | [Utilities](./api/utilities.md) | [Types](./api/types.md) | **Architecture** | [Contributing](./contributing.md)
