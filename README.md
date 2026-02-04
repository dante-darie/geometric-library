# geometric-library

A Node based, visually agnostic implementation of geometric functions, both abstract and finite.

## Prerequisites

This library assumes you already have basic knowledge of geometric concepts, including:

- **Abstracts**: magnitude, direction, position, coordinate, vector, point, figure, angle
- **Figures**: line, curve, ellipse, polygon
- **Transformations**: rotation, translation, reflection, scaling
- **Units**: radian, degree

## Installation

```sh
npm install geometric-library
```

## Importing (ESM)

```javascript
import { Point, Line, Vector, Angle } from 'geometric-library';
```

## Importing (CommonJS)

```javascript
const { Point, Line, Vector, Angle } = require('geometric-library');
```

## TypeScript Types

If you're using TypeScript, you can import types and interfaces for all exported functionalities:

```typescript
import { IPoint, TPointValues, ILine, TLineValues } from 'geometric-library';
```

This is recommended as it will help you understand how everything works and provides full type safety.

## Quick Example

```typescript
import { Point, Vector, Line, Angle } from 'geometric-library';

// Create two points and a line between them
const pointA = new Point([0, 0]);
const pointB = new Point([5, 5]);
const line = new Line([pointA, pointB]);

// Check line properties
console.log(line.slope);       // 1
console.log(line.yIntercept);  // 0

// Transform with chaining
const vector = new Vector([2, 3]);
const angle = new Angle(90, 'degrees');
pointA.translate(vector).rotate(angle);
```

## Dependencies

### Decimal.js

JavaScript has well-documented issues with floating-point arithmetic. This library uses [Decimal.js](https://mikemcl.github.io/decimal.js/) under the hood (via the `Calculator` utility class) to handle precision correctly.

You do **not** need to install Decimal.js separately - it is included as a dependency of this library. All math operations are routed through `Calculator`, which applies epsilon-based rounding (1e-8) to eliminate floating-point artifacts.

## Documentation

- **API Reference**
  - [Abstracts](./docs/api/abstracts.md) - Flag, Angle, Magnitude, Vector, Point, Figure
  - [Figures](./docs/api/figures.md) - Line, Polygon, Ellipse, Circle, QuadraticBezierCurve, CubicBezierCurve, ArcCurve
  - [Utilities](./docs/api/utilities.md) - Calculator, coordinateOrigin, xAxis, yAxis, PI2
  - [Types](./docs/api/types.md) - All interfaces and type definitions
- **[Architecture](./docs/architecture.md)** - Design decisions, patterns, class hierarchy
- **[Contributing](./docs/contributing.md)** - Bug reports, PRs, coding standards

## References

- [Intro to Bezier curves](https://iquilezles.org/articles/bezierbbox) by [Inigo Quilez](https://iquilezles.org/).
- [Arc Implementation Notes](https://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes) from the [SVG 2 Specification](https://www.w3.org/TR/SVG).

## License

This project is published and distributed under the [MIT License](./LICENSE).
