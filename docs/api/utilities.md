[README](../../README.md) | [Abstracts](./abstracts.md) | [Figures](./figures.md) | **Utilities** | [Types](./types.md) | [Architecture](../architecture.md) | [Contributing](../contributing.md)

---

# API Reference: Utilities

## Calculator

`Calculator` is a static wrapper around [Decimal.js](https://mikemcl.github.io/decimal.js/) that provides precision arithmetic for all math operations in the library. It eliminates JavaScript floating-point errors by routing all computations through Decimal.js and applying epsilon-based rounding.

### Constants

```javascript
Calculator.EPSILON; // 1e-8 - threshold for snapping to integers and equality checks
Calculator.PI2; // 2 * Math.PI (360 degrees in radians)
```

### Static Methods

All static methods accept `number` or `Calculator` instances as arguments.

#### Arithmetic

```javascript
Calculator.add(a, b): Calculator     // Addition
Calculator.sub(a, b): Calculator     // Subtraction
Calculator.mul(a, b): Calculator     // Multiplication
Calculator.div(a, b): Calculator     // Division
Calculator.mod(a, b): Calculator     // Modulo
Calculator.pow(a, b): Calculator     // Exponentiation
Calculator.neg(a): Calculator        // Negation
Calculator.abs(a): Calculator        // Absolute value
Calculator.sqrt(a): Calculator       // Square root
```

#### Trigonometric

```javascript
Calculator.sin(a): Calculator        // Sine
Calculator.cos(a): Calculator        // Cosine
Calculator.tan(a): Calculator        // Tangent
Calculator.acos(a): Calculator       // Arc cosine
Calculator.atan(a): Calculator       // Arc tangent
Calculator.atan2(a, b): Calculator   // Two-argument arc tangent
```

#### Comparison

```javascript
Calculator.isEqual(a, b): boolean    // |a - b| <= EPSILON
Calculator.isNearZero(a): boolean    // |a| <= EPSILON
```

#### Aggregation

```javascript
Calculator.max(args): Calculator     // Maximum of an array of values
Calculator.min(args): Calculator     // Minimum of an array of values
```

### Instance Methods

Calculator instances support the same operations as instance methods, allowing chained computation:

```javascript
new Calculator(5).add(3).mul(2); // (5 + 3) * 2
```

Instance methods: `abs`, `acos`, `add`, `atan`, `atan2`, `cos`, `div`, `mod`, `mul`, `neg`, `pow`, `sin`, `sqrt`, `sub`, `tan`, `isFinite`.

### Numeric Coercion

`Calculator` implements `valueOf()` which returns the underlying number. Use the unary `+` operator to convert to a plain number:

```javascript
const result = +Calculator.add(1, 2); // 3 (number)
```

### Epsilon Rounding

After every operation, `Calculator` checks if the result is within `EPSILON` (1e-8) of the nearest integer. If so, it snaps to that integer. This eliminates common floating-point artifacts like `0.30000000000000004`.

## Exported Constants

The utilities module exports these pre-built instances:

```javascript
import { coordinateOrigin, xAxis, yAxis, PI2 } from 'geometric-library';
```

### coordinateOrigin

```javascript
const coordinateOrigin: Point = new Point([0, 0]);
```

The origin point of the 2D coordinate system.

### xAxis

```javascript
const xAxis: Line = new Line([coordinateOrigin, new Point([1, 0])]);
```

The x-axis, defined as a line from the origin through `[1, 0]`.

### yAxis

```javascript
const yAxis: Line = new Line([coordinateOrigin, new Point([0, 1])]);
```

The y-axis, defined as a line from the origin through `[0, 1]`.

### PI2

```javascript
const PI2: number = Calculator.PI2; // ~6.283185307179586
```

The constant 2\*PI, representing 360 degrees in radians.

---

[README](../../README.md) | [Abstracts](./abstracts.md) | [Figures](./figures.md) | **Utilities** | [Types](./types.md) | [Architecture](../architecture.md) | [Contributing](../contributing.md)
