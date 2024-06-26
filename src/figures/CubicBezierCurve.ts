import { Figure, Point, Vector } from '~abstracts';
import { IComplex, IDimensional, TAxii, TAxis, TCubicValues } from '~types';
import { Calculator } from '~utilities';

export class CubicBezierCurve extends Figure implements IDimensional, IComplex {
  private _P0: Point;
  private _P1: Point;
  private _P2: Point;
  private _P3: Point;
  private _V1: Vector;
  private _V2: Vector;
  private _V3: Vector;
  private _criticalPoints: Point[]|undefined;

  constructor(values: TCubicValues) {
    super();

    const [firstControl, secondControl, thirdControl, fourthControl] = values;
    const secondControlIsVector = secondControl instanceof Vector;
    const thirdControlIsVector = thirdControl instanceof Vector;
    const fourthControlIsVector = fourthControl instanceof Vector;

    this._P0 = firstControl;
    this._P1 = !secondControlIsVector ? secondControl : firstControl.clone().translate(secondControl);
    this._P2 = !thirdControlIsVector ? thirdControl : firstControl.clone().translate(thirdControl);
    this._P3 = !fourthControlIsVector ? fourthControl : firstControl.clone().translate(fourthControl);
    this._V1 = secondControlIsVector ? secondControl : new Vector([firstControl, secondControl]);
    this._V2 = thirdControlIsVector ? thirdControl : new Vector([firstControl, thirdControl]);
    this._V3 = fourthControlIsVector ? fourthControl : new Vector([firstControl, fourthControl]);
    this._criticalPoints = this.computeCriticalPoints();

    this.points = [this.P0, this.P1, this.P2, this.P3];
    this.vectors = [this.V1, this.V2, this.V3];
  }

  get P0() {
    return this._P0;
  }

  get P1() {
    return this._P1;
  }

  get P2() {
    return this._P2;
  }

  get P3() {
    return this._P3;
  }

  get V1() {
    return this._V1;
  }

  get V2() {
    return this._V2;
  }

  get V3() {
    return this._V3;
  }

  get criticalPoints() {
    return this._criticalPoints;
  }

  get values(): TCubicValues {
    const { P0, P1, P2, P3, V1, V2, V3 } = this;

    if (!this.isRelative) {
      return [P0, P1, P2, P3];
    }

    return [P0, V1, V2, V3];
  }

  public clone() {
    const values = this.values.map((value) => value.clone());

    return new CubicBezierCurve(values as TCubicValues);
  }

  public recompute() {
    this._criticalPoints = this.computeCriticalPoints();
  }

  private computeCriticalPoints(): Point[]|undefined {
    const tValues = this.computeCriticalPointsTValues();

    if (!tValues) {
      return;
    }

    const criticalPoints = tValues.reduce((criticalPoints, t) => {
      const criticalPoint = this.getPointAtParameter(t);

      criticalPoint && criticalPoints.push(criticalPoint);

      return criticalPoints;
    }, [] as Point[]);

    if (!criticalPoints.length) {
      return;
    }

    return criticalPoints;
  }

  private computeCriticalPointsTValues(): Calculator[]|undefined {
    const axii: TAxii = ['x', 'y'];
    const { _P0, _P1, _P2, _P3 } = this;
    const signs = [1, -1];

    const tValues = [];
    for (let i = 0; i < axii.length; i++) {
      const axis = axii[i];
      const p0 = new Calculator(_P0[axis]);
      const p1 = new Calculator(_P1[axis]);
      const p2 = new Calculator(_P2[axis]);
      const p3 = new Calculator(_P3[axis]);
      const a = (p3.sub(p2.mul(3)).add(p1.mul(3)).sub(p0)).mul(3);
      const b = (p2.sub(p1.mul(2)).add(p0)).mul(6);
      const c = (p1.sub(p0)).mul(3);

      for (let n = 0; n < signs.length; n++) {
        const sign = signs[n];
        const tValue = +a === 0
          ? c.neg().div(b) //1st degree equation to avoid n/0
          : (b.neg().add(Calculator.mul(sign, (b.pow(2).sub(a.mul(c).mul(4))).sqrt()))).div(a.mul(2)); //2nd degree equation

        if (this.isValidParameter(tValue)) {
          tValues.push(tValue);
        }
      }
    }

    if (!tValues.length) {
      return;
    }

    return tValues.filter((value, index, array) => index === array.findIndex((v) => +value === +v));
  }

  private getPointAtParameter(t: Calculator): Point|undefined {
    const x = this.getCoordinateAtParameter(t, 'x');
    const y = this.getCoordinateAtParameter(t, 'y');

    if (typeof x === 'undefined' || typeof y === 'undefined') {
      return;
    }

    return new Point({ x: +x, y: +y });
  }

  private getCoordinateAtParameter(t: Calculator, axis: TAxis): Calculator|undefined {
    const { _P0, _P1, _P2, _P3 } = this;
    const p0 = _P0[axis],  p1 = _P1[axis], p2 = _P2[axis], p3 = _P3[axis];

    // parametric cubic bezier equation
    const coordinate = Calculator.sub(1, t).pow(3).mul(p0)
      .add(Calculator.sub(1, t).pow(2).mul(3).mul(t).mul(p1))
      .add(Calculator.sub(1, t).mul(3).mul(t.pow(2)).mul(p2))
      .add(t.pow(3).mul(p3));

    if (!coordinate.isFinite()) {
      return;
    }

    return coordinate;
  }

  private isValidParameter(t: Calculator) {
    return t.isFinite() && +t >= 0 && +t <= 1;
  }
}
