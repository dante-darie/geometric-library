import { Angle, IPoint, Magnitude, Point, Vector } from '@abstracts';
import { Ellipse, Line, TCubicBezierAbsoluteValues } from '@figures';
import { Calculator } from '@utilities/calculator';

it('should correctly assign the given values', () => {
  const phi = new Angle(90, 'degrees');
  const center = new Point([10, 10]);
  const rx = new Magnitude(8);
  const ry = new Magnitude(5);
  const ellipse = new Ellipse([center, rx, ry, phi]);
  const flatValues = ellipse.values.map((value) => {
    if (typeof value === 'object') {
      return ('values' in value && value.values) || +value;
    }

    return value;
  });

  expect(flatValues).toStrictEqual([[10, 10], 8, 5, phi.radians]);
});

it('should correctly compute its bounding box', () => {
  const phi = new Angle(90, 'degrees');
  const center = new Point([10, 10]);
  const rx = new Magnitude(8);
  const ry = new Magnitude(5);
  const ellipse = new Ellipse([center, rx, ry, phi]);

  expect(ellipse.boundingBox).toStrictEqual({
    xMax: 15,
    xMin: 5,
    yMax: 18,
    yMin: 2
  });
});

it('should correctly calculate critical points', () => {
  const phi = new Angle(90, 'degrees');
  const center = new Point([10, 10]);
  const rx = new Magnitude(8);
  const ry = new Magnitude(5);
  const ellipse = new Ellipse([center, rx, ry, phi]);
  const flatCriticalPoints = ellipse.criticalPoints.map(({ values }) => values);

  expect(flatCriticalPoints).toStrictEqual([
    [15, 10],
    [10, 18],
    [5, 10],
    [10, 2]
  ]);
});

it('should correctly scale', () => {
  const phi = new Angle(90, 'degrees');
  const center = new Point([10, 10]);
  const rx = new Magnitude(8);
  const ry = new Magnitude(5);
  const ellipse = new Ellipse([center, rx, ry, phi]);

  ellipse.scale(2, center);

  const flatCriticalPoints = ellipse.criticalPoints.map(({ values }) => values);

  expect(flatCriticalPoints).toStrictEqual([
    [20, 10],
    [10, 26],
    [0, 10],
    [10, -6]
  ]);
});

it('should correctly translate', () => {
  const phi = new Angle(90, 'degrees');
  const center = new Point([10, 10]);
  const rx = new Magnitude(8);
  const ry = new Magnitude(5);
  const ellipse = new Ellipse([center, rx, ry, phi]);

  ellipse.translate(new Vector([-5, 2]));

  const flatCriticalPoints = ellipse.criticalPoints.map(({ values }) => values);

  expect(flatCriticalPoints).toStrictEqual([
    [10, 12],
    [5, 20],
    [0, 12],
    [5, 4]
  ]);
});

it('should correctly rotate', () => {
  const phi = new Angle(90, 'degrees');
  const center = new Point([10, 10]);
  const rx = new Magnitude(8);
  const ry = new Magnitude(5);
  const ellipse = new Ellipse([center, rx, ry, phi]);
  const alpha = new Angle(90, 'degrees');

  ellipse.rotate(alpha);

  const flatCriticalPoints = ellipse.criticalPoints.map(({ values }) => values);

  expect(flatCriticalPoints).toStrictEqual([
    [-18, 10],
    [-10, 15],
    [-2, 10],
    [-10, 5]
  ]);
});

it('should correctly reflect about a point', () => {
  const phi = new Angle(90, 'degrees');
  const center = new Point([10, 10]);
  const rx = new Magnitude(8);
  const ry = new Magnitude(5);
  const ellipse = new Ellipse([center, rx, ry, phi]);
  const about = new Point([2, 2]);

  ellipse.reflect(about);

  const flatCriticalPoints = ellipse.criticalPoints.map(({ values }) => values);

  expect(flatCriticalPoints).toStrictEqual([
    [-1, -6],
    [-6, 2],
    [-11, -6],
    [-6, -14]
  ]);
});

it('should correctly reflect about a line', () => {
  const phi = new Angle(90, 'degrees');
  const center = new Point([10, 10]);
  const rx = new Magnitude(8);
  const ry = new Magnitude(5);
  const ellipse = new Ellipse([center, rx, ry, phi]);
  const about = new Line([new Point([0, 0]), new Point([1, -1])]);

  ellipse.reflect(about);

  const flatCriticalPoints = ellipse.criticalPoints.map(({ values }) => values);

  expect(flatCriticalPoints).toStrictEqual([
    [-2, -10],
    [-10, -5],
    [-18, -10],
    [-10, -15]
  ]);
});

// TO CUBIC BEZIER CURVES

it('should produce 4 cubic bezier curves', () => {
  const ellipse = new Ellipse([new Point([0, 0]), new Magnitude(5), new Magnitude(3), new Angle(0, 'radians')]);
  const curves = ellipse.toCubicBezierCurves();

  expect(curves).toHaveLength(4);
});

it('should produce continuous curves', () => {
  const ellipse = new Ellipse([new Point([0, 0]), new Magnitude(5), new Magnitude(3), new Angle(45, 'degrees')]);
  const curves = ellipse.toCubicBezierCurves();

  for (let i = 0; i < curves.length; i++) {
    const endPoint = (curves[i].values as TCubicBezierAbsoluteValues)[3];
    const startPoint = (curves[(i + 1) % curves.length].values as TCubicBezierAbsoluteValues)[0];

    expect(Calculator.isEqual(endPoint.x, startPoint.x)).toBe(true);
    expect(Calculator.isEqual(endPoint.y, startPoint.y)).toBe(true);
  }
});

it('should start and end at the correct ellipse points', () => {
  const ellipse = new Ellipse([new Point([10, 10]), new Magnitude(8), new Magnitude(5), new Angle(0, 'radians')]);
  const curves = ellipse.toCubicBezierCurves();
  const firstStart = (curves[0].values as TCubicBezierAbsoluteValues)[0];
  const lastEnd = (curves[3].values as TCubicBezierAbsoluteValues)[3];
  const expectedPoint = ellipse.computePointForTheta(new Angle(0, 'radians'));

  expect(Calculator.isEqual(firstStart.x, expectedPoint.x)).toBe(true);
  expect(Calculator.isEqual(firstStart.y, expectedPoint.y)).toBe(true);
  expect(Calculator.isEqual(lastEnd.x, expectedPoint.x)).toBe(true);
  expect(Calculator.isEqual(lastEnd.y, expectedPoint.y)).toBe(true);
});

it('should correctly handle a rotated ellipse', () => {
  const ellipse = new Ellipse([new Point([0, 0]), new Magnitude(10), new Magnitude(5), new Angle(90, 'degrees')]);
  const curves = ellipse.toCubicBezierCurves();
  const firstStart = (curves[0].values as TCubicBezierAbsoluteValues)[0];
  const expectedPoint = ellipse.computePointForTheta(new Angle(0, 'radians'));

  expect(Calculator.isEqual(firstStart.x, expectedPoint.x)).toBe(true);
  expect(Calculator.isEqual(firstStart.y, expectedPoint.y)).toBe(true);
});

// CLONE

it('should produce an independent clone', () => {
  const phi = new Angle(90, 'degrees');
  const center = new Point([10, 10]);
  const rx = new Magnitude(8);
  const ry = new Magnitude(5);
  const ellipse = new Ellipse([center, rx, ry, phi]);
  const ellipseClone = ellipse.clone();

  ellipse.translate(new Vector([-5, 2]));

  expect(ellipse.center.values).toStrictEqual([5, 12]);
  expect(ellipseClone.center.values).toStrictEqual([10, 10]);
});
