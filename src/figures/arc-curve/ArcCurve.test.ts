import { Angle, Flag, Magnitude, Point, Vector } from '@abstracts';
import { ArcCurve, Line, TArcAbsoluteValues, TCubicBezierAbsoluteValues } from '@figures';
import { Calculator } from '@utilities/calculator';

it('should correctly assign the given values', () => {
  const arcCurve = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(0, 'degrees'), new Flag(false), new Flag(false), new Point([10, 0])]);
  const flatValues = (arcCurve.values as TArcAbsoluteValues).map((value) => ('values' in value ? value.values : +value));

  expect(flatValues).toStrictEqual([[0, 0], 5, 10, 0, 0, 0, [10, 0]]);
});

it('should correctly compute its bounding box', () => {
  const arcCurve = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(0, 'degrees'), new Flag(true), new Flag(false), new Point([10, 0])]);

  expect(arcCurve.boundingBox).toStrictEqual({
    xMin: 0,
    yMin: -10,
    xMax: 10,
    yMax: 0
  });
});

it('should correctly compute its critical points', () => {
  const arcCurve = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(0, 'degrees'), new Flag(false), new Flag(false), new Point([10, 0])]);
  const flatCriticalPoints = arcCurve.criticalPoints.map(({ values }) => values);

  expect(flatCriticalPoints).toStrictEqual([[5, -10]]);
});

it('should correctly adjust the radii', () => {
  const arcCurve = new ArcCurve([new Point([0, 0]), new Magnitude(4), new Magnitude(8), new Angle(0, 'degrees'), new Flag(false), new Flag(false), new Point([10, 0])]);
  const [, rx, ry] = arcCurve.values;

  expect([+rx, +ry]).toStrictEqual([5, 10]);
});

it('should correctly reflect about a point', () => {
  const arcCurve = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(0, 'degrees'), new Flag(false), new Flag(false), new Point([10, 0])]);

  arcCurve.reflect(new Point([0, 0]));

  const flatValues = (arcCurve.values as TArcAbsoluteValues).map((value) => ('values' in value ? value.values : +value));

  expect(flatValues).toStrictEqual([[0, 0], 5, 10, 0, 0, 1, [-10, 0]]);
});

it('should correctly reflect about a line', () => {
  const arcCurve = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(0, 'degrees'), new Flag(false), new Flag(false), new Point([10, 0])]);

  arcCurve.reflect(new Line([new Point([0, 0]), new Point([5, 0])]));

  const flatValues = (arcCurve.values as TArcAbsoluteValues).map((value) => ('values' in value ? value.values : +value));

  expect(flatValues).toStrictEqual([[0, 0], 5, 10, 0, 0, 1, [10, 0]]);
});

it('should correctly scale', () => {
  const arcCurve = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(0, 'degrees'), new Flag(false), new Flag(false), new Point([10, 0])]);

  arcCurve.scale(2);

  const flatValues = (arcCurve.values as TArcAbsoluteValues).map((value) => ('values' in value ? value.values : +value));

  expect(flatValues).toStrictEqual([[0, 0], 10, 20, 0, 0, 0, [20, 0]]);
});

it('should correctly translate', () => {
  const arcCurve = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(0, 'degrees'), new Flag(false), new Flag(false), new Point([10, 0])]);

  arcCurve.translate(new Vector([5, 5]));

  const flatValues = (arcCurve.values as TArcAbsoluteValues).map((value) => ('values' in value ? value.values : +value));

  expect(flatValues).toStrictEqual([[5, 5], 5, 10, 0, 0, 0, [15, 5]]);
});

it('should correctly rotate', () => {
  const arcCurve = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(0, 'degrees'), new Flag(false), new Flag(false), new Point([10, 0])]);

  arcCurve.rotate(new Angle(180, 'degrees'));

  const flatValues = (arcCurve.values as TArcAbsoluteValues).map((value) => ('values' in value ? value.values : +value));

  expect(flatValues).toStrictEqual([[0, 0], 5, 10, Math.PI, 0, 0, [-10, 0]]);
});

it('should return the center of the underlying ellipse', () => {
  const arcCurve = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(0, 'degrees'), new Flag(false), new Flag(false), new Point([10, 0])]);

  expect(arcCurve.center.values).toStrictEqual([5, 0]);
});

it('should correctly compute bounding box with a relative endpoint', () => {
  const absoluteArc = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(0, 'degrees'), new Flag(true), new Flag(false), new Point([10, 0])]);
  const relativeArc = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(0, 'degrees'), new Flag(true), new Flag(false), new Vector([10, 0])]);

  expect(relativeArc.boundingBox).toStrictEqual(absoluteArc.boundingBox);
});

it('should produce an independent clone', () => {
  const arcCurve = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(0, 'degrees'), new Flag(false), new Flag(false), new Point([10, 0])]);
  const arcCurveClone = arcCurve.clone();

  arcCurve.translate(new Vector([5, 5]));

  const cloneFlatValues = (arcCurveClone.values as TArcAbsoluteValues).map((value) => ('values' in value ? value.values : +value));

  expect(cloneFlatValues).toStrictEqual([[0, 0], 5, 10, 0, 0, 0, [10, 0]]);
});

// TO CUBIC BEZIER CURVES

it('should produce 2 cubic bezier curves for a semicircular arc', () => {
  const arcCurve = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(0, 'degrees'), new Flag(false), new Flag(false), new Point([10, 0])]);
  const curves = arcCurve.toCubicBezierCurves();

  expect(curves).toHaveLength(2);
});

it('should produce continuous cubic bezier curves', () => {
  const arcCurve = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(0, 'degrees'), new Flag(true), new Flag(false), new Point([10, 0])]);
  const curves = arcCurve.toCubicBezierCurves();

  expect(curves.length).toBeGreaterThan(1);

  for (let i = 0; i < curves.length - 1; i++) {
    const endPoint = (curves[i].values as TCubicBezierAbsoluteValues)[3];
    const startPoint = (curves[i + 1].values as TCubicBezierAbsoluteValues)[0];

    expect(Calculator.isEqual(endPoint.x, startPoint.x)).toBe(true);
    expect(Calculator.isEqual(endPoint.y, startPoint.y)).toBe(true);
  }
});

it('should start at P0 and end at P1', () => {
  const arcCurve = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(0, 'degrees'), new Flag(false), new Flag(false), new Point([10, 0])]);
  const curves = arcCurve.toCubicBezierCurves();
  const firstStart = (curves[0].values as TCubicBezierAbsoluteValues)[0];
  const lastEnd = (curves[curves.length - 1].values as TCubicBezierAbsoluteValues)[3];

  expect(Calculator.isEqual(firstStart.x, 0)).toBe(true);
  expect(Calculator.isEqual(firstStart.y, 0)).toBe(true);
  expect(Calculator.isEqual(lastEnd.x, 10)).toBe(true);
  expect(Calculator.isEqual(lastEnd.y, 0)).toBe(true);
});

it('should approximate the arc midpoint accurately', () => {
  const arcCurve = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(0, 'degrees'), new Flag(false), new Flag(false), new Point([10, 0])]);
  const curves = arcCurve.toCubicBezierCurves();
  const [p0, p1, p2, p3] = curves[0].values as TCubicBezierAbsoluteValues;

  // Evaluate B(0.5) = (P0 + 3*P1 + 3*P2 + P3) / 8
  const bx = +Calculator.add(p0.x, Calculator.mul(3, p1.x)).add(Calculator.mul(3, p2.x)).add(p3.x).div(8);
  const by = +Calculator.add(p0.y, Calculator.mul(3, p1.y)).add(Calculator.mul(3, p2.y)).add(p3.y).div(8);

  // First segment spans θ from π to 3π/2. Midpoint θ = 5π/4.
  // Ellipse point at θ=5π/4: center=(5,0), rx=5, ry=10, phi=0
  const midTheta = (5 * Math.PI) / 4;
  const expectedX = +Calculator.add(5, Calculator.mul(5, Calculator.cos(midTheta)));
  const expectedY = +Calculator.mul(10, Calculator.sin(midTheta));

  expect(Math.abs(bx - expectedX)).toBeLessThan(0.05);
  expect(Math.abs(by - expectedY)).toBeLessThan(0.05);
});

it('should handle a rotated arc', () => {
  const arcCurve = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(45, 'degrees'), new Flag(false), new Flag(false), new Point([10, 0])]);
  const curves = arcCurve.toCubicBezierCurves();
  const firstStart = (curves[0].values as TCubicBezierAbsoluteValues)[0];
  const lastEnd = (curves[curves.length - 1].values as TCubicBezierAbsoluteValues)[3];

  expect(curves.length).toBeGreaterThanOrEqual(1);
  expect(Calculator.isEqual(firstStart.x, 0)).toBe(true);
  expect(Calculator.isEqual(firstStart.y, 0)).toBe(true);
  expect(Calculator.isEqual(lastEnd.x, 10)).toBe(true);
  expect(Calculator.isEqual(lastEnd.y, 0)).toBe(true);
});

it('should handle a large arc', () => {
  const arcCurve = new ArcCurve([new Point([0, 0]), new Magnitude(5), new Magnitude(10), new Angle(0, 'degrees'), new Flag(true), new Flag(false), new Point([10, 0])]);
  const curves = arcCurve.toCubicBezierCurves();
  const firstStart = (curves[0].values as TCubicBezierAbsoluteValues)[0];
  const lastEnd = (curves[curves.length - 1].values as TCubicBezierAbsoluteValues)[3];

  expect(curves.length).toBeGreaterThanOrEqual(2);
  expect(Calculator.isEqual(firstStart.x, 0)).toBe(true);
  expect(Calculator.isEqual(firstStart.y, 0)).toBe(true);
  expect(Calculator.isEqual(lastEnd.x, 10)).toBe(true);
  expect(Calculator.isEqual(lastEnd.y, 0)).toBe(true);
});
