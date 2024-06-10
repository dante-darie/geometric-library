import { TPolygonValues } from 'types';
import { Angle } from 'abstracts/Angle';
import { Point } from 'abstracts/Point';
import { Vector } from 'abstracts/Vector';
import { Line } from 'figures/Line';
import { Polygon } from './Polygon';

it('should correctly assign the given values', () => {
  const polygon = new Polygon([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);
  const flatValues = (polygon.values as TPolygonValues).map(({ values }) => values);

  expect(flatValues).toStrictEqual([
    [0, 0],
    [5, 5],
    [10, 0]
  ]);
});

it('should correctly compute its bounding box', () => {
  const polygon = new Polygon([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);

  expect(polygon.boundingBox).toStrictEqual({
    xMax: 10,
    yMax: 5,
    xMin: 0,
    yMin: 0
  });
});

it('should correctly compute its number of sides', () => {
  const polygon = new Polygon([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);

  expect(polygon.sides).toStrictEqual(3);
});

it('should correctly reflect about a point', () => {
  const polygon = new Polygon([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);

  polygon.reflect(new Point([0, 0]));

  const flatValues = (polygon.values as TPolygonValues).map(({ values }) => values);

  expect(flatValues).toStrictEqual([
    [0, 0],
    [-5, -5],
    [-10, 0]
  ]);
});

it('should correctly reflect about a line', () => {
  const polygon = new Polygon([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);

  polygon.reflect(new Line([new Point([0, 0]), new Point([0, 5])]));

  const flatValues = (polygon.values as TPolygonValues).map(({ values }) => values);

  expect(flatValues).toStrictEqual([
    [0, 0],
    [-5, 5],
    [-10, 0]
  ]);
});

it('should correctly scale', () => {
  const polygon = new Polygon([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);

  polygon.scale(2);

  const flatValues = (polygon.values as TPolygonValues).map(({ values }) => values);

  expect(flatValues).toStrictEqual([
    [0, 0],
    [10, 10],
    [20, 0]
  ]);
});

it('should correctly translate', () => {
  const polygon = new Polygon([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);

  polygon.translate(new Vector([5, 5]));

  const flatValues = (polygon.values as TPolygonValues).map(({ values }) => values);

  expect(flatValues).toStrictEqual([
    [5, 5],
    [10, 10],
    [15, 5]
  ]);
});

it('should correctly rotate', () => {
  const polygon = new Polygon([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);

  polygon.rotate(new Angle(180, 'degrees'));

  const flatValues = (polygon.values as TPolygonValues).map(({ values }) => values);

  expect(flatValues).toStrictEqual([
    [0, 0],
    [-5, -5],
    [-10, 0]
  ]);
});

it('should produce an independent clone', () => {
  const polygon = new Polygon([new Point([0, 0]), new Point([5, 5]), new Point([10, 0])]);
  const polygonClone = polygon.clone();

  polygon.translate(new Vector([5, 5]));

  const flatCloneValues = (polygonClone.values as TPolygonValues).map(({ values }) => values);

  expect(flatCloneValues).not.toStrictEqual([
    [5, 5],
    [10, 10],
    [15, 5]
  ]);
});
