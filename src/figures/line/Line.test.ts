import { Angle, Point, Vector } from '@abstracts';
import { Line } from '@figures';
import { xAxis, yAxis } from '@utilities';

it('should assign the correct points and vector', () => {
  const line = new Line([new Point([1, 1]), new Point([3, 3])]);

  expect(line.P0.values).toStrictEqual([1, 1]);
  expect(line.P1.values).toStrictEqual([3, 3]);
  expect(line.V.values).toStrictEqual([2, 2]);
});

it('should assign the correct points and vector from a Vector argument', () => {
  const line = new Line([new Point([1, 1]), new Vector([2, 2])]);

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

it('should compute the correct standard parameters for an oblique line with negative slope', () => {
  const line = new Line([new Point([0, 4]), new Point([4, 0])]);

  const abc = [line.a, line.b, line.c];

  expect(abc).toStrictEqual([1, 1, 4]);
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

it('should correctly calculate the perpendicular projection point of a given point onto a vertical line', () => {
  const line = new Line([new Point([2, 3]), new Point([2, 7])]);
  const perpendicularRoot = line.getPerpendicularProjection(new Point([6, 9]));

  expect(perpendicularRoot.values).toStrictEqual([2, 9]);
});

it('should correctly calculate the perpendicular projection point of a given point onto an oblique line', () => {
  const line = new Line([new Point([0, 0]), new Point([4, 4])]);
  const perpendicularRoot = line.getPerpendicularProjection(new Point([6, 2]));

  expect(perpendicularRoot.values).toStrictEqual([4, 4]);
});

it('should correctly calculate the point at a given t parameter value (parametric equation)', () => {
  const line = new Line([new Point([2, 3]), new Point([8, 3])]);

  expect(line.getPointAtParameter(1).values).toStrictEqual([8, 3]);
});

it('should correctly calculate the x value at a given y value', () => {
  const line = new Line([new Point([2, 2]), new Point([8, 8])]);

  expect(line.getXValueAtY(4)).toBe(4);
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

it('should correctly tell if a vertical line contains a given point', () => {
  const line = new Line([new Point([2, 3]), new Point([2, 7])]);

  expect(line.hasPoint(new Point([2, 5]))).toBe(true);
  expect(line.hasPoint(new Point([3, 5]))).toBe(false);
});

it('should produce an independent clone', () => {
  const line = new Line([new Point([2, 2]), new Point([8, 8])]);
  const lineClone = line.clone();
  const phi = new Angle(45, 'degrees');

  lineClone.rotate(phi);

  expect(line.P0.values).toStrictEqual([2, 2]);
  expect(lineClone.P0.values).not.toStrictEqual([2, 2]);
});

// LAZY COMPUTATION

it('should have correct derived properties after translate', () => {
  const line = new Line([new Point([0, 0]), new Point([4, 0])]);

  line.translate(new Vector([0, 3]));

  expect(line.slope).toBe(0);
  expect(line.yIntercept).toBe(3);
  expect(line.isHorizontal).toBe(true);
});

it('should have correct derived properties after chained rotate and translate', () => {
  const line = new Line([new Point([0, 0]), new Point([4, 0])]);
  const phi = new Angle(90, 'degrees');

  line.rotate(phi).translate(new Vector([5, 0]));

  expect(line.isVertical).toBe(true);
  expect(line.slope).toBeUndefined();
  expect(line.xIntercept).toBe(5);
});

it('should correctly update isVertical and isHorizontal after rotation', () => {
  const horizontal = new Line([new Point([0, 0]), new Point([4, 0])]);
  const phi = new Angle(90, 'degrees');

  horizontal.rotate(phi);

  expect(horizontal.isVertical).toBe(true);
  expect(horizontal.isHorizontal).toBe(false);
});

// NUMERICAL EDGE CASES

it('should detect a midpoint on the line after a 37-degree rotation', () => {
  const line = new Line([new Point([0, 0]), new Point([10, 0])]);
  const phi = new Angle(37, 'degrees');

  line.rotate(phi);

  const midpoint = line.getPointAtParameter(0.5);

  expect(line.hasPoint(midpoint)).toBe(true);
});

it('should keep perpendicular lines perpendicular after a 33-degree rotation', () => {
  const line1 = new Line([new Point([0, 0]), new Point([5, 0])]);
  const line2 = new Line([new Point([0, 0]), new Point([0, 5])]);
  const phi = new Angle(33, 'degrees');

  line1.rotate(phi);
  line2.rotate(phi);

  expect(line1.isPerpendicularTo(line2)).toBe(true);
});

it('should remain horizontal after 360 one-degree rotations', () => {
  const line = new Line([new Point([0, 0]), new Point([5, 0])]);
  const oneDeg = new Angle(1, 'degrees');

  for (let i = 0; i < 360; i++) {
    line.rotate(oneDeg);
  }

  expect(line.isHorizontal).toBe(true);
});

it('should detect a point on a vertical line after 90-degree rotation', () => {
  const line = new Line([new Point([0, 0]), new Point([5, 0])]);
  const phi = new Angle(90, 'degrees');

  line.rotate(phi);

  expect(line.hasPoint(new Point([0, 3]))).toBe(true);
});

// ANGLE TO

it('should return angle PI/2 for perpendicular lines', () => {
  const horizontal = new Line([new Point([0, 0]), new Point([5, 0])]);
  const vertical = new Line([new Point([0, 0]), new Point([0, 5])]);

  expect(+horizontal.angleTo(vertical)).toBe(+new Angle(90, 'degrees'));
});

it('should return angle 0 for parallel lines', () => {
  const line1 = new Line([new Point([0, 0]), new Point([5, 0])]);
  const line2 = new Line([new Point([0, 3]), new Point([5, 3])]);

  expect(+line1.angleTo(line2)).toBe(0);
});

it('should return correct angle when this is vertical and other has slope', () => {
  const vertical = new Line([new Point([0, 0]), new Point([0, 5])]);
  const oblique = new Line([new Point([0, 0]), new Point([5, 5])]);

  expect(+vertical.angleTo(oblique)).toBe(+new Angle(45, 'degrees'));
});

it('should return correct angle when other line is vertical', () => {
  const oblique = new Line([new Point([0, 0]), new Point([5, 5])]);
  const vertical = new Line([new Point([0, 0]), new Point([0, 5])]);

  expect(+oblique.angleTo(vertical)).toBe(+new Angle(45, 'degrees'));
});

it('should return the angle to a vector', () => {
  const line = new Line([new Point([0, 0]), new Point([5, 0])]);
  const vector = new Vector([0, 5]);

  expect(+line.angleTo(vector)).toBe(+new Angle(90, 'degrees'));
});

it('should return the angle between two oblique non-perpendicular lines', () => {
  const line1 = new Line([new Point([0, 0]), new Point([5, 5])]);
  const line2 = new Line([new Point([0, 0]), new Point([5, 0])]);

  const angle = line1.angleTo(line2);

  expect(+angle).toBe(+new Angle(45, 'degrees'));
});

// PERPENDICULAR PROJECTION

it('should correctly calculate the perpendicular projection onto a horizontal line', () => {
  const line = new Line([new Point([0, 3]), new Point([10, 3])]);
  const projection = line.getPerpendicularProjection(new Point([5, 7]));

  expect(projection.values).toStrictEqual([5, 3]);
});

it('should return a clone of the point when it is on the line', () => {
  const line = new Line([new Point([0, 0]), new Point([4, 4])]);
  const pointOnLine = new Point([2, 2]);
  const projection = line.getPerpendicularProjection(pointOnLine);

  expect(projection.values).toStrictEqual([2, 2]);
});

// PERPENDICULAR THROUGH

it('should return a rotated clone when the point is on the line', () => {
  const line = new Line([new Point([0, 0]), new Point([4, 4])]);
  const pointOnLine = new Point([2, 2]);
  const perpendicular = line.getPerpendicularThrough(pointOnLine);

  expect(line.isPerpendicularTo(perpendicular)).toBe(true);
  expect(perpendicular.hasPoint(pointOnLine)).toBe(true);
});

// GET X VALUE AT Y

it('should return undefined for a horizontal line', () => {
  const line = new Line([new Point([0, 3]), new Point([10, 3])]);

  expect(line.getXValueAtY(3)).toBeUndefined();
});

it('should return the correct x value for an oblique line', () => {
  const line = new Line([new Point([0, 0]), new Point([4, 4])]);

  expect(line.getXValueAtY(2)).toBe(2);
});

it('should return xIntercept for a vertical line', () => {
  const line = new Line([new Point([5, 0]), new Point([5, 10])]);

  expect(line.getXValueAtY(3)).toBe(5);
});

// GET Y VALUE AT X

it('should return undefined for a vertical line', () => {
  const line = new Line([new Point([5, 0]), new Point([5, 10])]);

  expect(line.getYValueAtX(5)).toBeUndefined();
});

// IS PERPENDICULAR TO

it('should detect perpendicularity between two oblique lines', () => {
  const line1 = new Line([new Point([0, 0]), new Point([2, 1])]);
  const line2 = new Line([new Point([0, 0]), new Point([1, -2])]);

  expect(line1.isPerpendicularTo(line2)).toBe(true);
});

it('should detect non-perpendicularity between two oblique lines', () => {
  const line1 = new Line([new Point([0, 0]), new Point([5, 5])]);
  const line2 = new Line([new Point([0, 0]), new Point([5, 3])]);

  expect(line1.isPerpendicularTo(line2)).toBe(false);
});

// REFLECT OVERRIDE

it('should recompute derived properties after reflect about a point', () => {
  const line = new Line([new Point([1, 1]), new Point([3, 3])]);

  line.reflect(new Point([0, 0]));

  expect(line.slope).toBe(1);
  expect(line.P0.values).toStrictEqual([-1, -1]);
});

// SCALE OVERRIDE

it('should recompute derived properties after scale', () => {
  const line = new Line([new Point([1, 1]), new Point([3, 3])]);

  line.scale(2);

  expect(line.slope).toBe(1);
  expect(line.P0.values).toStrictEqual([2, 2]);
  expect(line.P1.values).toStrictEqual([6, 6]);
});

// DEAD CODE BRANCHES (forced via internal state)

it('should return reciprocal * y when xIntercept is undefined', () => {
  const line = new Line([new Point([0, 0]), new Point([4, 4])]);

  // Force internal state: reciprocal defined but xIntercept undefined
  const internals = line as unknown as { _dirty: boolean; _reciprocal: number | undefined; _slope: number | undefined; _xIntercept: number | undefined; _yIntercept: number | undefined };
  internals._dirty = false;
  internals._slope = 1;
  internals._reciprocal = 1;
  internals._xIntercept = undefined;
  internals._yIntercept = 0;

  expect(line.getXValueAtY(3)).toBe(3);
});

it('should return slope * x when yIntercept is undefined', () => {
  const line = new Line([new Point([0, 0]), new Point([4, 4])]);

  // Force internal state: slope defined but yIntercept undefined
  const internals = line as unknown as { _dirty: boolean; _reciprocal: number | undefined; _slope: number | undefined; _xIntercept: number | undefined; _yIntercept: number | undefined };
  internals._dirty = false;
  internals._slope = 2;
  internals._reciprocal = 0.5;
  internals._xIntercept = 0;
  internals._yIntercept = undefined;

  expect(line.getYValueAtX(3)).toBe(6);
});
