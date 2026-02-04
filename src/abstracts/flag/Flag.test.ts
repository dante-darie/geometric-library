import { Flag } from './Flag';

it('should correctly assign a value', () => {
  const flag = new Flag(false);

  expect(flag.value).toBe(false);
});

it('should correctly invert', () => {
  const flag = new Flag(false);

  flag.invert();

  expect(flag.value).toBe(true);
});

it('should replace its value correctly', () => {
  const flag = new Flag(false);

  flag.replace(true);

  expect(flag.value).toBe(true);
});

it('should output a correct numeric value', () => {
  const flag = new Flag(false);

  expect(+flag).toBe(0);
});

it('should produce an independent clone', () => {
  const flag = new Flag(false);
  const flagClone = flag.clone();

  flagClone.replace(true);

  expect(flag.value).toBe(false);
});
