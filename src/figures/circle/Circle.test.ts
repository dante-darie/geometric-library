import { Angle, Magnitude, Point, Vector } from '@abstracts';
import { Circle, Line, TCircleValues } from '@figures';

it('should correctly assign the given values', () => {
  const circle = new Circle([new Point([5, 5]), new Magnitude(5)]);
  const flatValues = (circle.values as TCircleValues).map((value) => ('values' in value ? value.values : +value));

  expect(flatValues).toStrictEqual([[5, 5], 5]);
});

it('should correctly compute its bounding box', () => {
  const circle = new Circle([new Point([5, 5]), new Magnitude(5)]);

  expect(circle.boundingBox).toStrictEqual({
    xMax: 10,
    yMax: 10,
    xMin: 0,
    yMin: 0
  });
});

it('should correctly compute its critical points', () => {
  const circle = new Circle([new Point([5, 5]), new Magnitude(5)]);
  const flatCriticalPoints = circle.criticalPoints.map(({ values }) => values);

  expect(flatCriticalPoints).toStrictEqual([
    [5, 10],
    [10, 5],
    [5, 0],
    [0, 5]
  ]);
});

it('should correctly reflect about a point', () => {
  const circle = new Circle([new Point([5, 5]), new Magnitude(5)]);

  circle.reflect(new Point([0, 0]));

  expect(circle.center.values).toStrictEqual([-5, -5]);
});

it('should correctly reflect about a line', () => {
  const circle = new Circle([new Point([5, 5]), new Magnitude(5)]);

  circle.reflect(new Line([new Point([0, 0]), new Point([5, 0])]));

  expect(circle.center.values).toStrictEqual([5, -5]);
});

it('should correctly scale', () => {
  const circle = new Circle([new Point([5, 5]), new Magnitude(5)]);

  circle.scale(2);

  expect(+circle.radius).toStrictEqual(10);
});

it('should correctly translate', () => {
  const circle = new Circle([new Point([5, 5]), new Magnitude(5)]);

  circle.translate(new Vector([5, 5]));

  expect(circle.center.values).toStrictEqual([10, 10]);
});

it('should correctly rotate', () => {
  const circle = new Circle([new Point([5, 5]), new Magnitude(5)]);

  circle.rotate(new Angle(180, 'degrees'));

  expect(circle.center.values).toStrictEqual([-5, -5]);
});

it('should produce an independent clone', () => {
  const circle = new Circle([new Point([5, 5]), new Magnitude(5)]);
  const circleClone = circle.clone();

  circle.translate(new Vector([5, 5]));

  expect(circleClone.center.values).not.toStrictEqual([10, 10]);
});
