import { IPoint } from '../types';
import { Angle } from '../abstracts/Angle';
import { Point } from '../abstracts/Point';
import { Vector } from '../abstracts/Vector';
import { Line } from './Line';
import { QuadraticBezierCurve } from './QuadraticBezierCurve';

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
