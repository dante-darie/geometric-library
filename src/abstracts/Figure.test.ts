import { IMagnitude, IPoint, IVector, TFigureValues } from 'types';
import { Angle } from 'abstracts/Angle';
import { Magnitude } from 'abstracts/Magnitude';
import { Point } from 'abstracts/Point';
import { Vector } from 'abstracts/Vector';
import { Figure } from 'abstracts/Figure';
import { yAxis } from 'utilities';

class SpecificFigure extends Figure {
  constructor(values: TFigureValues) {
    super(values);
  }
}

// VALUES

it('should assign the correct values', () => {
  const specificFigure = new SpecificFigure([new Point([0, 0]), new Point([6, 0]), new Point([3, 4])]);
  const flatPointValues = specificFigure.values.map((point) => (point as IPoint).values);

  expect(flatPointValues).toStrictEqual([
    [0, 0],
    [6, 0],
    [3, 4]
  ]);
});

// BOUNDING BOX

it('should correctly compute the bounding box', () => {
  const specificFigure = new SpecificFigure([new Point([0, 0]), new Point([6, 0]), new Point([3, 4])]);

  expect(specificFigure.boundingBox).toStrictEqual({
    xMax: 6,
    xMin: 0,
    yMax: 4,
    yMin: 0
  });
});

// REFLECT

it('should reflect correctly with absolute values about a point', () => {
  const specificFigure = new SpecificFigure([new Point([0, 0]), new Point([6, 0]), new Point([3, 4])]);

  specificFigure.reflect(new Point([0, 0]));

  const flatPointValues = specificFigure.values.map((point) => (point as IPoint).values);

  expect(flatPointValues).toStrictEqual([
    [0, 0],
    [-6, 0],
    [-3, -4]
  ]);
});

it('should reflect correctly with relative values about a point', () => {
  const specificFigure = new SpecificFigure([new Point([0, 0]), new Vector([6, 0]), new Vector([3, 4])]);

  specificFigure.reflect(new Point([0, 0]));

  const { values } = specificFigure;
  const firstPoint = values[0];
  const flatPointValues = values.map((value) => {
    if (value instanceof Point) {
      return value.values;
    }

    return firstPoint.clone().translate(value as IVector).values;
  });

  expect(flatPointValues).toStrictEqual([
    [0, 0],
    [-6, 0],
    [-3, -4]
  ]);
});

it('should reflect correctly with absolute values about a line', () => {
  const specificFigure = new SpecificFigure([new Point([0, 0]), new Point([6, 0]), new Point([3, 4])]);

  specificFigure.reflect(yAxis);

  const flatPointValues = specificFigure.values.map((point) => (point as IPoint).values);

  expect(flatPointValues).toStrictEqual([
    [0, 0],
    [-6, 0],
    [-3, 4]
  ]);
});

it('should reflect correctly with relative values about a line', () => {
  const specificFigure = new SpecificFigure([new Point([0, 0]), new Vector([6, 0]), new Vector([3, 4])]);

  specificFigure.reflect(yAxis);

  const { values } = specificFigure;
  const firstPoint = values[0];
  const flatPointValues = values.map((value) => {
    if (value instanceof Point) {
      return value.values;
    }

    return firstPoint.clone().translate(value as IVector).values;
  });

  expect(flatPointValues).toStrictEqual([
    [0, 0],
    [-6, 0],
    [-3, 4]
  ]);
});

// ROTATE

it('should rotate correctly with absolute values', () => {
  const specificFigure = new SpecificFigure([new Point([0, 0]), new Point([6, 0]), new Point([3, 4])]);
  const about = new Point([6, 0]);
  const phi = new Angle(180, 'degrees');

  specificFigure.rotate(phi, about);

  const flatPointValues = specificFigure.values.map((point) => (point as IPoint).values);

  expect(flatPointValues).toStrictEqual([
    [12, 0],
    [6, 0],
    [9, -4]
  ]);
});

it('should rotate correctly with relative values', () => {
  const specificFigure = new SpecificFigure([new Point([0, 0]), new Vector([6, 0]), new Vector([3, 4])]);
  const about = new Point([6, 0]);
  const phi = new Angle(180, 'degrees');

  specificFigure.rotate(phi, about);

  const { values } = specificFigure;
  const firstPoint = values[0];
  const flatPointValues = values.map((value) => {
    if (value instanceof Point) {
      return value.values;
    }

    return firstPoint.clone().translate(value as IVector).values;
  });

  expect(flatPointValues).toStrictEqual([
    [12, 0],
    [6, 0],
    [9, -4]
  ]);
});

// SCALE

it('should scale correctly with absolute values', () => {
  const specificFigure = new SpecificFigure([new Point([0, 0]), new Point([6, 0]), new Point([3, 4])]);
  const about = new Point([6, 0]);

  specificFigure.scale(2, about);

  const flatPointValues = specificFigure.values.map((point) => (point as IPoint).values);

  expect(flatPointValues).toStrictEqual([
    [-6, 0],
    [6, 0],
    [0, 8]
  ]);
});

it('should scale correctly with relative values', () => {
  const specificFigure = new SpecificFigure([new Point([0, 0]), new Vector([6, 0]), new Vector([3, 4])]);
  const about = new Point([6, 0]);

  specificFigure.scale(2, about);

  const { values } = specificFigure;
  const firstPoint = values[0];
  const flatPointValues = values.map((value) => {
    if (value instanceof Point) {
      return value.values;
    }

    return firstPoint.clone().translate(value as IVector).values;
  });

  expect(flatPointValues).toStrictEqual([
    [-6, 0],
    [6, 0],
    [0, 8]
  ]);
});

it('should scale correctly with magnitudes', () => {
  const specificFigure = new SpecificFigure([new Point([0, 0]), new Magnitude(8)]);
  const about = new Point([6, 0]);

  specificFigure.scale(2, about);

  const { values } = specificFigure;
  const flatValues = values.map((value) => {
    if (value instanceof Point) {
      return value.values;
    }

    return +(value as IMagnitude);
  });

  expect(flatValues).toStrictEqual([[-6, 0], 16]);
});

// TRANSLATE

it('should translate correctly with absolute values', () => {
  const specificFigure = new SpecificFigure([new Point([0, 0]), new Point([6, 0]), new Point([3, 4])]);
  const translationVector = new Vector([2, 2]);

  specificFigure.translate(translationVector);

  const flatPointValues = specificFigure.values.map((point) => (point as IPoint).values);

  expect(flatPointValues).toStrictEqual([
    [2, 2],
    [8, 2],
    [5, 6]
  ]);
});

it('should translate correctly with relative values', () => {
  const specificFigure = new SpecificFigure([new Point([0, 0]), new Vector([6, 0]), new Vector([3, 4])]);
  const translationVector = new Vector([2, 2]);

  specificFigure.translate(translationVector);

  const { values } = specificFigure;
  const firstPoint = values[0];
  const flatPointValues = values.map((value) => {
    if (value instanceof Point) {
      return value.values;
    }

    return firstPoint.clone().translate(value as IVector).values;
  });

  expect(flatPointValues).toStrictEqual([
    [2, 2],
    [8, 2],
    [5, 6]
  ]);
});
