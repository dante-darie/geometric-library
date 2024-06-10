import { TCubicBezierValues } from 'types';
import { Point } from 'abstracts/Point';
import { CubicBezierCurve } from './CubicBezierCurve';
import { Line } from 'figures/Line';
import { Vector } from 'abstracts/Vector';
import { Angle } from 'abstracts/Angle';

it('should correctly assign the given values', () => {
  const cubicBezierCurve = new CubicBezierCurve([new Point([0, 0]), new Point([5, 5]), new Point([10, -5]), new Point([15, 0])]);
  const flatPointValues = (cubicBezierCurve.values as TCubicBezierValues).map(({ values }) => values);

  expect(flatPointValues).toStrictEqual([
    [0, 0],
    [5, 5],
    [10, -5],
    [15, 0]
  ]);
});

it('should correctly compute its bounding box', () => {
  const cubicBezierCurve = new CubicBezierCurve([new Point([0, 0]), new Point([5, 10]), new Point([10, -10]), new Point([15, 0])]);

  expect(cubicBezierCurve.boundingBox).toStrictEqual({
    xMax: 15,
    xMin: 0,
    yMax: 2.8867513459481287,
    yMin: -2.8867513459481287
  });
});

it('should correctly compute its critical points', () => {
  const cubicBezierCurve = new CubicBezierCurve([new Point([0, 0]), new Point([5, 10]), new Point([10, -10]), new Point([15, 0])]);
  const flatCriticalPoints = cubicBezierCurve.criticalPoints.map(({ values }) => values);

  expect(flatCriticalPoints).toStrictEqual([
    [11.830127018922195, -2.8867513459481287],
    [3.1698729810778064, 2.8867513459481287]
  ]);
});

it('should correctly reflect about a point', () => {
  const cubicBezierCurve = new CubicBezierCurve([new Point([0, 0]), new Point([5, 10]), new Point([10, -10]), new Point([15, 0])]);

  cubicBezierCurve.reflect(new Point([0, 0]));

  const flatPointValues = (cubicBezierCurve.values as TCubicBezierValues).map(({ values }) => values);

  expect(flatPointValues).toStrictEqual([
    [0, 0],
    [-5, -10],
    [-10, 10],
    [-15, 0]
  ]);
});

it('should correctly reflect about a line', () => {
  const cubicBezierCurve = new CubicBezierCurve([new Point([0, 0]), new Point([5, 10]), new Point([10, -10]), new Point([15, 0])]);

  cubicBezierCurve.reflect(new Line([new Point([0, 0]), new Point([5, 0])]));

  const flatPointValues = (cubicBezierCurve.values as TCubicBezierValues).map(({ values }) => values);

  expect(flatPointValues).toStrictEqual([
    [0, 0],
    [5, -10],
    [10, 10],
    [15, 0]
  ]);
});

it('should correctly scale', () => {
  const cubicBezierCurve = new CubicBezierCurve([new Point([0, 0]), new Point([5, 10]), new Point([10, -10]), new Point([15, 0])]);

  cubicBezierCurve.scale(2);

  const flatPointValues = (cubicBezierCurve.values as TCubicBezierValues).map(({ values }) => values);

  expect(flatPointValues).toStrictEqual([
    [0, 0],
    [10, 20],
    [20, -20],
    [30, 0]
  ]);
});

it('should correctly translate', () => {
  const cubicBezierCurve = new CubicBezierCurve([new Point([0, 0]), new Point([5, 10]), new Point([10, -10]), new Point([15, 0])]);

  cubicBezierCurve.translate(new Vector([5, 5]));

  const flatPointValues = (cubicBezierCurve.values as TCubicBezierValues).map(({ values }) => values);

  expect(flatPointValues).toStrictEqual([
    [5, 5],
    [10, 15],
    [15, -5],
    [20, 5]
  ]);
});

it('should correctly rotate', () => {
  const cubicBezierCurve = new CubicBezierCurve([new Point([0, 0]), new Point([5, 10]), new Point([10, -10]), new Point([15, 0])]);

  cubicBezierCurve.rotate(new Angle(180, 'degrees'));

  const flatPointValues = (cubicBezierCurve.values as TCubicBezierValues).map(({ values }) => values);

  expect(flatPointValues).toStrictEqual([
    [0, 0],
    [-5, -10],
    [-10, 10],
    [-15, 0]
  ]);
});

it('should produce an independent clone', () => {
  const cubicBezierCurve = new CubicBezierCurve([new Point([0, 0]), new Point([5, 10]), new Point([10, -10]), new Point([15, 0])]);
  const cubicBezierCurveClone = cubicBezierCurve.clone();

  cubicBezierCurve.rotate(new Angle(180, 'degrees'));

  const cloneFlatPointValues = (cubicBezierCurveClone.values as TCubicBezierValues).map(({ values }) => values);

  expect(cloneFlatPointValues).not.toStrictEqual([
    [0, 0],
    [-5, -10],
    [-10, 10],
    [-15, 0]
  ]);
});
