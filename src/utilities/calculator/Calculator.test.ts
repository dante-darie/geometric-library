import { Calculator } from './Calculator';

// EPSILON

it('should have EPSILON equal to 1e-8', () => {
  expect(Calculator.EPSILON).toBe(1e-8);
});

// PI2

it('should have PI2 equal to 2 * PI', () => {
  expect(Calculator.PI2).toBe(+Calculator.mul(Math.PI, 2));
});

// isEqual

it('should return true for equal numbers', () => {
  expect(Calculator.isEqual(1, 1)).toBe(true);
});

it('should return true for numbers within epsilon', () => {
  expect(Calculator.isEqual(1, 1 + 5e-9)).toBe(true);
});

it('should return false for numbers outside epsilon', () => {
  expect(Calculator.isEqual(1, 1 + 1e-7)).toBe(false);
});

// isNearZero

it('should return true for zero', () => {
  expect(Calculator.isNearZero(0)).toBe(true);
});

it('should return true for values within epsilon of zero', () => {
  expect(Calculator.isNearZero(5e-9)).toBe(true);
});

it('should return false for values outside epsilon of zero', () => {
  expect(Calculator.isNearZero(1e-7)).toBe(false);
});

// EPSILON ROUNDING

it('should round 2.9999999999 to 3 via add', () => {
  expect(+Calculator.add(2.9999999999, 0)).toBe(3);
});

it('should round 3.0000000001 to 3 via sub', () => {
  expect(+Calculator.sub(3.0000000001, 0)).toBe(3);
});

it('should not round 2.999 to 3 via add', () => {
  expect(+Calculator.add(2.999, 0)).not.toBe(3);
});

// INSTANCE METHODS

it('should compute sin via instance method', () => {
  expect(+new Calculator(Math.PI / 2).sin()).toBe(1);
});

it('should compute cos via instance method', () => {
  expect(+new Calculator(0).cos()).toBe(1);
});

it('should compute tan via instance method', () => {
  expect(+new Calculator(Math.PI / 4).tan()).toBe(1);
});

it('should compute atan2 via instance method', () => {
  const quarterPi = +Calculator.div(Math.PI, 4);

  expect(+new Calculator(1).atan2(1)).toBe(quarterPi);
});

it('should compute sqrt via instance method', () => {
  expect(+new Calculator(4).sqrt()).toBe(2);
});

it('should compute mod via instance method', () => {
  expect(+new Calculator(10).mod(3)).toBe(1);
});

it('should compute abs via static method', () => {
  expect(+Calculator.abs(-5)).toBe(5);
});

it('should compute acos via static method', () => {
  expect(+Calculator.acos(1)).toBe(0);
});

it('should compute sqrt via static method', () => {
  expect(+Calculator.sqrt(9)).toBe(3);
});
