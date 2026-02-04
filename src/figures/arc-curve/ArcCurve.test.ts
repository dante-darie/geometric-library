import { Angle, Flag, Magnitude, Point, Vector } from '@abstracts';
import { ArcCurve, Line, TArcAbsoluteValues } from '@figures';

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
