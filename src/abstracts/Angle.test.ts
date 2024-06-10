import { Angle } from './Angle';

it('should correctly assign the radians', () => {
  const angle = new Angle(5, 'radians');

  expect(angle.radians).toBe(5);
});

it('should correctly assign the degrees', () => {
  const angle = new Angle(5, 'degrees');

  expect(angle.degrees).toBe(5);
});

it('should correctly compute the degrees', () => {
  const angle = new Angle(Math.PI, 'radians');

  expect(angle.degrees).toBe(180);
});

it('should correctly compute the radians', () => {
  const angle = new Angle(180, 'degrees');

  expect(angle.radians).toBe(Math.PI);
});

it('should correctly compute the cos', () => {
  const angle = new Angle(90, 'degrees');

  expect(angle.cos).toBe(0);
});

it('should correctly compute the cot', () => {
  const angle = new Angle(135, 'degrees');

  expect(angle.cot).toBe(-1);
});

it('should correctly compute the sin', () => {
  const angle = new Angle(90, 'degrees');

  expect(angle.sin).toBe(1);
});

it('should correctly compute the tan', () => {
  const angle = new Angle(45, 'degrees');

  expect(angle.tan).toBe(1);
});

it('should correctly normalize angles bigger than 360 degrees', () => {
  const angle = new Angle(400, 'degrees');

  angle.normalize();

  expect(angle.degrees).toBe(40);
});

it('should replace the value in radians', () => {
  const angle = new Angle(90, 'degrees');

  angle.replace(2, 'radians');

  expect(angle.radians).toBe(2);
});

it('should replace the value in degrees', () => {
  const angle = new Angle(2, 'radians');

  angle.replace(90, 'degrees');

  expect(angle.degrees).toBe(90);
});

it('should correctly scale', () => {
  const angle = new Angle(90, 'degrees');

  angle.scale(3);

  expect(angle.degrees).toBe(270);
});

it('should return the radians value when used mathematically', () => {
  const angle = new Angle(1, 'radians');
  const result = +angle + 9;

  expect(result).toBe(10);
});

it('should produce an independent clone', () => {
  const angle = new Angle(90, 'degrees');
  const angleClone = angle.clone();

  angle.scale(3);

  expect(angleClone.degrees).not.toBe(270);
});
