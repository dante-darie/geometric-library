import { TSegment, TVectorValues } from '../types';
import { Angle } from './Angle';
import { Vector } from './Vector';
import { Point } from './Point';

it('should assign specified x value', () => {
  const x = 5;
  const vector = new Vector([x, 0]);

  expect(vector.dx).toBe(x);
});

it('should assign specified y value', () => {
  const y = 5;
  const vector = new Vector([0, y]);

  expect(vector.dy).toBe(y);
});

it('should assign specified values', () => {
  const values: TVectorValues = [5, 8];
  const vector = new Vector(values);

  expect(vector.values).toStrictEqual(values);
});

it('should assign correct values when defined by two points', () => {
  const values: TSegment = [new Point([2, 1]), new Point([5, 8])];
  const vector = new Vector(values);

  expect(vector.values).toStrictEqual([3, 7]);
});

it('should calculate the magnitude correctly', () => {
  const vector = new Vector([3, 4]);

  expect(vector.magnitude).toEqual(5);
});

it('should calculate the angle to another vector correctly', () => {
  const firstVector = new Vector([0, 5]);
  const secondVector = new Vector([8, 0]);
  const angleTo = firstVector.angleTo(secondVector);
  const expectedAngle = new Angle(90, 'degrees');

  expect(+angleTo).toEqual(+expectedAngle);
});

it('should calculate the dot product correctly', () => {
  const firstVector = new Vector([4, 5]);
  const secondVector = new Vector([2, 3]);
  const dotProduct = firstVector.dotProduct(secondVector);

  expect(dotProduct).toEqual(23);
});

it('should correctly reflect about x axis', () => {
  const vector = new Vector([5, 8]);

  vector.reflect({
    x: true,
    y: false
  });

  expect(vector.values).toStrictEqual([-5, 8]);
});

it('should correctly reflect about y axis', () => {
  const vector = new Vector([5, 8]);

  vector.reflect({
    x: false,
    y: true
  });

  expect(vector.values).toStrictEqual([5, -8]);
});

it('should correctly reflect about both axii', () => {
  const vector = new Vector([5, 8]);

  vector.reflect({
    x: true,
    y: true
  });

  expect(vector.values).toStrictEqual([-5, -8]);
});

it('should rotate correctly', () => {
  const vector = new Vector([5, 8]);
  const phi = new Angle(180, 'degrees');

  vector.rotate(phi);

  expect(vector.values).toStrictEqual([-5, -8]);
});

it('should scale correctly', () => {
  const vector = new Vector([5, 8]);

  vector.scale(2);

  expect(vector.values).toStrictEqual([10, 16]);
});

it('should replace its values', () => {
  const vector = new Vector([0, 0]);
  const anotherVector = new Vector([8, 8]);

  vector.replace(anotherVector);

  expect(vector.values).toStrictEqual([8, 8]);
});

it('should produce an independent clone', () => {
  const vector = new Vector([0, 0]);
  const vectorClone = vector.clone();

  vectorClone.replace(new Vector([5, 8]));

  expect(vector.values).toStrictEqual([0, 0]);
});
