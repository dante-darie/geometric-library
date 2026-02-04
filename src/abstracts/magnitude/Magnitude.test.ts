import { Magnitude } from './Magnitude';

it('should correctly assign a value', () => {
  const magnitude = new Magnitude(6);

  expect(+magnitude).toBe(6);
});

it('should correctly scale', () => {
  const magnitude = new Magnitude(6);

  magnitude.scale(2);

  expect(+magnitude).toBe(12);
});

it('should replace its value correctly', () => {
  const magnitude = new Magnitude(6);

  magnitude.replace(2);

  expect(+magnitude).toBe(2);
});

it('should produce an independent clone', () => {
  const magnitude = new Magnitude(6);
  const magnitudeClone = magnitude.clone();

  magnitude.replace(2);

  expect(+magnitude).toBe(2);
  expect(+magnitudeClone).toBe(6);
});

it('should return the value via the value getter', () => {
  const magnitude = new Magnitude(6);

  expect(magnitude.value).toBe(6);
});
