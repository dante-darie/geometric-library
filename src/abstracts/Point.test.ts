import { TPointValues } from 'types';
import { Angle } from 'abstracts/Angle';
import { Point } from './Point';
import { Vector } from './Vector';

it('should assign specified x value', () => {
  const x = 5;
  const point = new Point([x, 0]);

  expect(point.x).toBe(x);
});

it('should assign specified y value', () => {
  const y = 5;
  const point = new Point([0, y]);

  expect(point.y).toBe(y);
});

it('should assign specified values', () => {
  const values: TPointValues = [5, 8];
  const point = new Point(values);

  expect(point.values).toStrictEqual(values);
});

it('should translate correctly given a vector', () => {
  const point = new Point([0, 0]);
  const translationVector = new Vector([5, 8]);

  point.translate(translationVector);

  expect(point.values).toStrictEqual([5, 8]);
});

it('should reflect correctly given another point', () => {
  const point = new Point([5, 8]);
  const reflectionPoint = new Point([0, 0]);

  point.reflect(reflectionPoint);

  expect(point.values).toStrictEqual([-5, -8]);
});

it('should rotate correctly around the origin when no point is given', () => {
  const point = new Point([5, 8]);
  const phi = new Angle(180, 'degrees');

  point.rotate(phi);

  expect(point.values).toStrictEqual([-5, -8]);
});

it('should rotate correctly around a given point', () => {
  const point = new Point([5, 8]);
  const anchor = new Point([8, 8]);
  const phi = new Angle(180, 'degrees');

  point.rotate(phi, anchor);

  expect(point.values).toStrictEqual([11, 8]);
});

it('should replace its values', () => {
  const point = new Point([0, 0]);
  const anotherPoint = new Point([8, 8]);

  point.replace(anotherPoint);

  expect(point.values).toStrictEqual([8, 8]);
});

it('should produce an independent clone', () => {
  const point = new Point([0, 0]);
  const pointClone = point.clone();

  pointClone.replace(new Point([5, 8]));

  expect(point.values).toStrictEqual([0, 0]);
});
