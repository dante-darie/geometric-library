import { Decimal } from 'decimal.js';

type TInput = Calculator | number;

export class Calculator {
  public static readonly EPSILON: number = 1e-8;
  public static readonly PI2: number = +Calculator.mul(Math.PI, 2);

  private _instance: Decimal;

  constructor(arg: number) {
    this._instance = new Decimal(arg);
  }

  // STATIC METHODS

  public static abs(arg: TInput): Calculator {
    return Calculator.computeUnaryOperation('abs', arg);
  }

  public static acos(arg: TInput): Calculator {
    return Calculator.computeUnaryOperation('acos', arg);
  }

  public static add(first: TInput, second: TInput): Calculator {
    return Calculator.computeBinaryOperation('add', [first, second]);
  }

  public static atan(arg: TInput): Calculator {
    return Calculator.computeUnaryOperation('atan', arg);
  }

  public static atan2(first: TInput, second: TInput): Calculator {
    return Calculator.computeBinaryOperation('atan2', [first, second]);
  }

  public static cos(arg: TInput): Calculator {
    return Calculator.computeUnaryOperation('cos', arg);
  }

  public static div(first: TInput, second: TInput): Calculator {
    return Calculator.computeBinaryOperation('div', [first, second]);
  }

  public static isEqual(a: number, b: number): boolean {
    return Math.abs(a - b) <= Calculator.EPSILON;
  }

  public static isNearZero(a: number): boolean {
    return Math.abs(a) <= Calculator.EPSILON;
  }

  public static max(args: TInput[]): Calculator {
    return Calculator.computeIndefiniteOperation('max', args);
  }

  public static min(args: TInput[]): Calculator {
    return Calculator.computeIndefiniteOperation('min', args);
  }

  public static mod(first: TInput, second: TInput): Calculator {
    return Calculator.computeBinaryOperation('mod', [first, second]);
  }

  public static mul(first: TInput, second: TInput): Calculator {
    return Calculator.computeBinaryOperation('mul', [first, second]);
  }

  public static neg(arg: TInput): Calculator {
    return Calculator.computeUnaryOperation('neg', arg);
  }

  public static pow(first: TInput, second: TInput): Calculator {
    return Calculator.computeBinaryOperation('pow', [first, second]);
  }

  public static sin(arg: TInput): Calculator {
    return Calculator.computeUnaryOperation('sin', arg);
  }

  public static sqrt(arg: TInput): Calculator {
    return Calculator.computeUnaryOperation('sqrt', arg);
  }

  public static sub(first: TInput, second: TInput): Calculator {
    return Calculator.computeBinaryOperation('sub', [first, second]);
  }

  public static tan(arg: TInput): Calculator {
    return Calculator.computeUnaryOperation('tan', arg);
  }

  // PRIVATE METHODS

  private static computeBinaryOperation(operation: 'mul' | 'div' | 'add' | 'sub' | 'pow' | 'atan2' | 'mod', args: [TInput, TInput]): Calculator {
    const [a, b] = Calculator.toDecimalArgs(args);
    const result = Decimal[operation](a, b);
    const roundedResult = this.roundDecimalWithPrecision(result);

    return new Calculator(roundedResult);
  }

  private static computeIndefiniteOperation(operation: 'max' | 'min', args: TInput[]): Calculator {
    const nargs = Calculator.toDecimalArgs(args);
    const result = Decimal[operation](...nargs);
    const roundedResult = this.roundDecimalWithPrecision(result);

    return new Calculator(roundedResult);
  }

  private static computeUnaryOperation(operation: 'neg' | 'sqrt' | 'sin' | 'cos' | 'acos' | 'tan' | 'atan' | 'abs', arg: TInput): Calculator {
    const [a] = Calculator.toDecimalArgs([arg]);
    const result = new Decimal(a)[operation]();
    const roundedResult = this.roundDecimalWithPrecision(result);

    return new Calculator(roundedResult);
  }

  /**
   * @todo The precision calculation could be improved to test at what decimal point is the distance less
   * than epsilon, and then to round up to that point instead of choosing an arbitrary precision.
   */
  private static roundDecimalWithPrecision(value: Decimal): number {
    const epsilon = new Decimal(Calculator.EPSILON);
    const distanceToLowerInt = value.sub(value.floor());
    const distanceToUpperInt = value.ceil().sub(value);

    if (distanceToLowerInt.lte(epsilon)) {
      return value.floor().toNumber();
    }

    if (distanceToUpperInt.lte(epsilon)) {
      return value.ceil().toNumber();
    }

    return value.toNumber();
  }

  private static toDecimalArgs(args: TInput[]): number[] {
    return args.map((arg) => +arg);
  }

  // INSTANCE METHODS

  public abs(): Calculator {
    return Calculator.computeUnaryOperation('abs', this);
  }

  public acos(): Calculator {
    return Calculator.computeUnaryOperation('acos', this);
  }

  public add(second: TInput): Calculator {
    return Calculator.computeBinaryOperation('add', [this, second]);
  }

  public atan(): Calculator {
    return Calculator.computeUnaryOperation('atan', this);
  }

  public atan2(second: TInput): Calculator {
    return Calculator.computeBinaryOperation('atan2', [this, second]);
  }

  public cos(): Calculator {
    return Calculator.computeUnaryOperation('cos', this);
  }

  public div(second: TInput): Calculator {
    return Calculator.computeBinaryOperation('div', [this, second]);
  }

  public isFinite() {
    return this._instance.isFinite();
  }

  public mod(second: TInput): Calculator {
    return Calculator.computeBinaryOperation('mod', [this, second]);
  }

  public mul(second: TInput): Calculator {
    return Calculator.computeBinaryOperation('mul', [this, second]);
  }

  public neg(): Calculator {
    return Calculator.computeUnaryOperation('neg', this);
  }

  public pow(second: TInput): Calculator {
    return Calculator.computeBinaryOperation('pow', [this, second]);
  }

  public sin(): Calculator {
    return Calculator.computeUnaryOperation('sin', this);
  }

  public sqrt(): Calculator {
    return Calculator.computeUnaryOperation('sqrt', this);
  }

  public sub(second: TInput): Calculator {
    return Calculator.computeBinaryOperation('sub', [this, second]);
  }

  public tan(): Calculator {
    return Calculator.computeUnaryOperation('tan', this);
  }

  public valueOf(): number {
    return this._instance.toNumber();
  }
}
