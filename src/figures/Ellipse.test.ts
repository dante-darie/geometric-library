import { Angle } from '../abstracts/Angle';
import { Magnitude } from '../abstracts/Magnitude';
import { Point } from '../abstracts/Point';
import { Vector } from '../abstracts/Vector';
import { Line } from './Line';
import { Ellipse } from './Ellipse';

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
    [0, -8],
    [-8, -3],
    [-16, -8],
    [-8, -13]
  ]);
});

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
