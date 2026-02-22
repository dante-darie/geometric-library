import { Angle, IPoint, Point, Vector } from '@abstracts';
import { Line, QuadraticBezierCurve, TCubicBezierValues } from '@figures';
import { Calculator } from '@utilities';

it('should correctly assign the given values', () => {
  const quadraticCurve = new QuadraticBezierCurve([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);
  const flatValues = quadraticCurve.values.map((point) => (point as IPoint).values);

  expect(flatValues).toStrictEqual([
    [0, 0],
    [5, 5],
    [10, 0]
  ]);
});

it('should correctly compute its bounding box', () => {
  const quadraticCurve = new QuadraticBezierCurve([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);

  expect(quadraticCurve.boundingBox).toStrictEqual({
    xMax: 10,
    yMax: 2.5,
    yMin: 0,
    xMin: 0
  });
});

it('should correctly compute its critical points', () => {
  const quadraticCurve = new QuadraticBezierCurve([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);
  const flatCriticalPoints = quadraticCurve.criticalPoints.map(({ values }) => values);

  expect(flatCriticalPoints).toStrictEqual([[5, 2.5]]);
});

it('should correctly reflect about a point', () => {
  const quadraticCurve = new QuadraticBezierCurve([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);

  quadraticCurve.reflect(new Point([5, 5]));

  const flatValues = quadraticCurve.values.map((point) => (point as IPoint).values);

  expect(flatValues).toStrictEqual([
    [10, 10],
    [5, 5],
    [0, 10]
  ]);
});

it('should correctly reflect about a line', () => {
  const quadraticCurve = new QuadraticBezierCurve([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);

  quadraticCurve.reflect(new Line([new Point([0, 5]), new Point([10, 5])]));

  const flatValues = quadraticCurve.values.map((point) => (point as IPoint).values);

  expect(flatValues).toStrictEqual([
    [0, 10],
    [5, 5],
    [10, 10]
  ]);
});

it('should correctly scale', () => {
  const quadraticCurve = new QuadraticBezierCurve([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);

  quadraticCurve.scale(2);

  const flatValues = quadraticCurve.values.map((point) => (point as IPoint).values);

  expect(flatValues).toStrictEqual([
    [0, 0],
    [10, 10],
    [20, 0]
  ]);
});

it('should correctly translate', () => {
  const quadraticCurve = new QuadraticBezierCurve([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);

  quadraticCurve.translate(new Vector([5, 5]));

  const flatValues = quadraticCurve.values.map((point) => (point as IPoint).values);

  expect(flatValues).toStrictEqual([
    [5, 5],
    [10, 10],
    [15, 5]
  ]);
});

it('should correctly rotate', () => {
  const quadraticCurve = new QuadraticBezierCurve([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);

  quadraticCurve.rotate(new Angle(180, 'degrees'), new Point([5, 5]));

  const flatValues = quadraticCurve.values.map((point) => (point as IPoint).values);

  expect(flatValues).toStrictEqual([
    [10, 10],
    [5, 5],
    [0, 10]
  ]);
});

it('should produce an independent clone', () => {
  const quadraticCurve = new QuadraticBezierCurve([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);
  const quadraticCurveClone = quadraticCurve.clone();

  quadraticCurve.translate(new Vector([5, 5]));

  const flatCloneValues = quadraticCurveClone.values.map((point) => (point as IPoint).values);

  expect(flatCloneValues).not.toStrictEqual([
    [5, 5],
    [10, 10],
    [15, 5]
  ]);
});

it('should correctly compute critical points with relative values', () => {
  const absoluteCurve = new QuadraticBezierCurve([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);
  const relativeCurve = new QuadraticBezierCurve([new Point([0, 0]), new Vector([5, 5]), new Vector([10, 0])]);

  const absoluteCritical = absoluteCurve.criticalPoints.map(({ values }) => values);
  const relativeCritical = relativeCurve.criticalPoints.map(({ values }) => values);

  expect(relativeCritical).toStrictEqual(absoluteCritical);
});

it('should have no critical points for collinear control points', () => {
  const quadraticCurve = new QuadraticBezierCurve([new Point([0, 0]), new Point([5, 5]), new Point([10, 10])]);

  expect(quadraticCurve.criticalPoints).toStrictEqual([]);
});

it('should return undefined from getPointAtParameter for non-finite t', () => {
  const quadraticCurve = new QuadraticBezierCurve([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);
  const result = (quadraticCurve as unknown as { getPointAtParameter(t: Calculator): IPoint | undefined }).getPointAtParameter(new Calculator(Infinity));

  expect(result).toBeUndefined();
});

it('should return empty critical points when getPointAtParameter returns undefined', () => {
  const quadraticCurve = new QuadraticBezierCurve([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);

  vi.spyOn(quadraticCurve as unknown as { getPointAtParameter: (t: Calculator) => IPoint | undefined }, 'getPointAtParameter').mockReturnValue(undefined);

  quadraticCurve.recompute();

  expect(quadraticCurve.criticalPoints).toStrictEqual([]);
});

it('should correctly convert to a cubic bezier curve', () => {
  const quadraticCurve = new QuadraticBezierCurve([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);
  const cubicCurve = quadraticCurve.toCubicBezierCurve();

  const flatValues = (cubicCurve.values as TCubicBezierValues).map((point) => (point as IPoint).values);

  expect(flatValues).toStrictEqual([
    [0, 0],
    [3.333333333333333, 3.333333333333333],
    [6.666666666666667, 3.333333333333333],
    [10, 0]
  ]);
});
