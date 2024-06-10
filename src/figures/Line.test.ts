import { Angle } from 'abstracts/Angle';
import { Point } from 'abstracts/Point';
import { Line } from 'figures/Line';
import { xAxis, yAxis } from 'utilities';

it('should assign the correct points and vector', () => {
  const line = new Line([new Point([1, 1]), new Point([3, 3])]);

  expect(line.P0.values).toStrictEqual([1, 1]);
  expect(line.P1.values).toStrictEqual([3, 3]);
  expect(line.V.values).toStrictEqual([2, 2]);
});

// SLOPE-INTERCEPT PARAMETERS

it('should correctly compute the x intercept of a vertical line', () => {
  const line = new Line([new Point([2, 3]), new Point([2, 7])]);

  expect(line.xIntercept).toEqual(2);
});

it('should correctly compute the x intercept of a horizontal line', () => {
  const line = new Line([new Point([2, 3]), new Point([5, 3])]);

  expect(line.xIntercept).toBeUndefined();
});

it('should correctly compute the x intercept of an oblique line', () => {
  const line = new Line([new Point([2, 2]), new Point([8, 8])]);

  expect(line.xIntercept).toEqual(0);
});

it('should correctly compute the y intercept of a vertical line', () => {
  const line = new Line([new Point([2, 3]), new Point([2, 7])]);

  expect(line.yIntercept).toBeUndefined();
});

it('should correctly compute the y intercept of a horizontal line', () => {
  const line = new Line([new Point([2, 3]), new Point([5, 3])]);

  expect(line.yIntercept).toBe(3);
});

it('should correctly compute the y intercept of an oblique line', () => {
  const line = new Line([new Point([2, 2]), new Point([8, 8])]);

  expect(line.yIntercept).toEqual(0);
});

it('should correctly compute the slope of a vertical line', () => {
  const line = new Line([new Point([2, 3]), new Point([2, 7])]);

  expect(line.slope).toBeUndefined();
});

it('should correctly compute the slope of a horizontal line', () => {
  const line = new Line([new Point([2, 3]), new Point([5, 3])]);

  expect(line.slope).toBe(0);
});

it('should correctly compute the slope of an oblique line', () => {
  const line = new Line([new Point([2, 2]), new Point([8, 8])]);

  expect(line.slope).toBe(1);
});

it('should correctly compute the reciprocal of a vertical line', () => {
  const line = new Line([new Point([2, 3]), new Point([2, 7])]);

  expect(line.reciprocal).toBe(0);
});

it('should correctly compute the reciprocal of a horizontal line', () => {
  const line = new Line([new Point([2, 3]), new Point([5, 3])]);

  expect(line.reciprocal).toBeUndefined();
});

it('should correctly compute the reciprocal of an oblique line', () => {
  const line = new Line([new Point([2, 2]), new Point([8, 8])]);

  expect(line.reciprocal).toBe(1);
});

// STANDARD PARAMETERS

it('should compute the correct standard parameters for a horizontal line', () => {
  const line = new Line([new Point([2, 3]), new Point([8, 3])]);

  const abc = [line.a, line.b, line.c];

  expect(abc).toStrictEqual([0, 1, 3]);
});

it('should compute the correct standard parameters for a vertical line', () => {
  const line = new Line([new Point([2, 3]), new Point([2, 9])]);

  const abc = [line.a, line.b, line.c];

  expect(abc).toStrictEqual([1, 0, 2]);
});

it('should compute the correct standard parameters for an oblique line', () => {
  const line = new Line([new Point([2, 3]), new Point([4, 7])]);

  const abc = [line.a, line.b, line.c];

  expect(abc).toStrictEqual([2, -1, 1]);
});

// LINE TYPE

it('should correctly discern if it is horizontal', () => {
  const horizontal = new Line([new Point([2, 3]), new Point([8, 3])]);
  const vertical = new Line([new Point([2, 3]), new Point([2, 9])]);
  const oblique = new Line([new Point([2, 3]), new Point([4, 7])]);

  expect(horizontal.isHorizontal).toBe(true);
  expect(vertical.isHorizontal).toBe(false);
  expect(oblique.isHorizontal).toBe(false);
});

it('should correctly discern if it is vertical', () => {
  const horizontal = new Line([new Point([2, 3]), new Point([8, 3])]);
  const vertical = new Line([new Point([2, 3]), new Point([2, 9])]);
  const oblique = new Line([new Point([2, 3]), new Point([4, 7])]);

  expect(horizontal.isVertical).toBe(false);
  expect(vertical.isVertical).toBe(true);
  expect(oblique.isVertical).toBe(false);
});

// COMPARISSON METHODS

it('should correctly tell if it is perpendicular to another line', () => {
  const horizontal = new Line([new Point([2, 3]), new Point([8, 3])]);
  const vertical = new Line([new Point([2, 3]), new Point([2, 9])]);
  const oblique = new Line([new Point([2, 3]), new Point([4, 7])]);

  expect(horizontal.isPerpendicularTo(vertical)).toBe(true);
  expect(horizontal.isPerpendicularTo(oblique)).toBe(false);
  expect(vertical.isPerpendicularTo(oblique)).toBe(false);
});

it('should correctly tell if it is parallel to another line', () => {
  const horizontal = new Line([new Point([2, 3]), new Point([8, 3])]);
  const vertical = new Line([new Point([2, 3]), new Point([2, 9])]);
  const oblique = new Line([new Point([2, 3]), new Point([4, 7])]);

  expect(horizontal.isParallelTo(vertical)).toBe(false);
  expect(horizontal.isParallelTo(oblique)).toBe(false);
  expect(vertical.isParallelTo(oblique)).toBe(false);
  expect(horizontal.isParallelTo(xAxis)).toBe(true);
  expect(vertical.isParallelTo(yAxis)).toBe(true);
});

// UTILITY METHODS

it('should correctly calculate the angle to another line', () => {
  const vertical = new Line([new Point([2, 3]), new Point([2, 9])]);
  const oblique = new Line([new Point([2, 2]), new Point([8, 8])]);
  const phi = new Angle(45, 'degrees');

  expect(+vertical.angleTo(oblique)).toBe(+phi);
});

it('should correctly calculate the intersection point with another line', () => {
  const vertical = new Line([new Point([2, 3]), new Point([2, 9])]);
  const oblique = new Line([new Point([2, 2]), new Point([8, 6])]);

  expect(vertical.getIntersectionPoint(oblique)!.values).toStrictEqual([-2, -2]);
});

it('should not have an intersection point to a parallel line', () => {
  const vertical = new Line([new Point([2, 3]), new Point([2, 9])]);
  const anotherVertical = new Line([new Point([5, 1]), new Point([5, 11])]);

  expect(vertical.getIntersectionPoint(anotherVertical)).toBeUndefined();
});

it('should correctly calculate the perpendicular line passing through a given point', () => {
  const line = new Line([new Point([2, 3]), new Point([4, 7])]);
  const perpendicular = line.getPerpendicularThrough(new Point([3, 4]));

  expect(line.isPerpendicularTo(perpendicular)).toBe(true);
});

it('should correctly calculate the perpendicular projection point of a given point', () => {
  const line = new Line([new Point([2, 3]), new Point([2, 7])]);
  const perpendicularRoot = line.getPerpendicularProjection(new Point([6, 9]));

  expect(perpendicularRoot.values).toStrictEqual([2, 9]);
});

it('should correctly calculate the point at a given t parameter value (parametric equation)', () => {
  const line = new Line([new Point([2, 3]), new Point([8, 3])]);

  expect(line.getPointAtParameter(1).values).toStrictEqual([8, 3]);
});

it('should correctly calculate the x value at a given y value', () => {
  const line = new Line([new Point([2, 2]), new Point([8, 8])]);

  expect(line.getYValueAtX(4)).toBe(4);
});

it('should correctly calculate the y value at a given x value', () => {
  const line = new Line([new Point([2, 2]), new Point([8, 8])]);

  expect(line.getYValueAtX(6)).toBe(6);
});

it('should correctly tell if it contains a given point', () => {
  const line = new Line([new Point([2, 2]), new Point([8, 8])]);
  const Pa = new Point([9, 9]);
  const Pb = new Point([3, 6]);

  expect(line.hasPoint(Pa)).toBe(true);
  expect(line.hasPoint(Pb)).toBe(false);
});

it('should produce an independent clone', () => {
  const line = new Line([new Point([2, 2]), new Point([8, 8])]);
  const lineClone = line.clone();
  const phi = new Angle(45, 'degrees');

  lineClone.rotate(phi);

  expect(line.P0.values).toStrictEqual([2, 2]);
  expect(lineClone.P0.values).not.toStrictEqual([2, 2]);
});
