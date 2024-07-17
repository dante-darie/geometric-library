import { IAngle, IArcCurve, IBoundingBox, IEllipse, ILine, IMagnitude, IPoint, TAngleRange, TArcValues, IFlag } from '../types';
import { Calculator } from '../utilities/Calculator';
import { Point } from '../abstracts/Point';
import { Figure } from '../abstracts/Figure';
import { Ellipse } from './Ellipse';

export class ArcCurve extends Figure implements IArcCurve {
  private ellipse: IEllipse;
  private largeArcFlag: IFlag;
  private phi: IAngle;
  private rx: IMagnitude;
  private ry: IMagnitude;
  private sweepFlag: IFlag;

  constructor(values: TArcValues) {
    super(values);

    const [, rx, ry, phi, largeArcFlag, sweepFlag] = values;

    this.rx = rx;
    this.ry = ry;
    this.phi = phi;
    this.largeArcFlag = largeArcFlag;
    this.sweepFlag = sweepFlag;

    this.adjustRadii();

    const center = this.computeCenter();

    this.ellipse = new Ellipse([center, rx, ry, phi]);
  }

  public get boundingBox(): IBoundingBox {
    const { P0, P1 } = this;
    const points = [P0, P1, ...this.criticalPoints] as IPoint[];

    return Figure.computeBoundingBox(points);
  }

  public get center() {
    return this.ellipse.center;
  }

  public get criticalPoints(): IPoint[] {
    const { ellipse } = this;
    const [minTheta, maxTheta] = this.computeThetaRange();

    return ellipse.criticalPoints.filter((point) => {
      const { P0, P1 } = this;

      if ((point.x === P0.x && point.y === P0.y) || (point.x === P1.x && point.y === P1.y)) {
        return false;
      }

      const theta = ellipse.computeThetaForPoint(point);

      return +theta >= +minTheta && +theta <= +maxTheta;
    });
  }

  private get P0() {
    return this.points[0];
  }

  private get P1() {
    if (this.isRelative) {
      return this.P0.clone().translate(this.vectors[0]);
    }

    return this.points[1];
  }

  public clone() {
    const values = this.values.map((value) => (typeof value === 'object' && 'clone' in value ? value.clone() : value));

    return new ArcCurve(values as TArcValues);
  }

  public reflect(about: IPoint | ILine): this {
    super.reflect(about);

    this.sweepFlag.invert();

    return this;
  }

  private adjustRadii(): void {
    const { rx, ry } = this;
    const P0_prime = this.computeP0Prime();
    const { x: x1_prime, y: y1_prime } = P0_prime;
    const rx_sq = Calculator.pow(+rx, 2);
    const ry_sq = Calculator.pow(+ry, 2);
    const x1_prime_sq = Calculator.pow(x1_prime, 2);
    const y1_prime_sq = Calculator.pow(y1_prime, 2);

    const radii_check = x1_prime_sq.div(rx_sq).add(y1_prime_sq.div(ry_sq));

    if (+radii_check > 1) {
      rx.replace(+Calculator.mul(+rx, radii_check.sqrt()));
      ry.replace(+Calculator.mul(+ry, radii_check.sqrt()));
    }
  }

  private computeCenter(): IPoint {
    const { P0, P1, phi } = this;
    const center_prime = this.computeCenterPrime();
    const { x: x1, y: y1 } = P0;
    const { x: x2, y: y2 } = P1;
    const { x: cx_prime, y: cy_prime } = center_prime;
    const dx = Calculator.add(x1, x2).div(2);
    const dy = Calculator.add(y1, y2).div(2);
    const cx = Calculator.mul(phi.cos, cx_prime).sub(Calculator.mul(phi.sin, cy_prime)).add(dx);
    const cy = Calculator.mul(phi.sin, cx_prime).add(Calculator.mul(phi.cos, cy_prime)).add(dy);

    return new Point([+cx, +cy]);
  }

  private computeCenterPrime(): IPoint {
    const { largeArcFlag, sweepFlag, rx, ry } = this;
    const P0_prime = this.computeP0Prime();
    const { x: x1_prime, y: y1_prime } = P0_prime;
    const rx_sq = Calculator.pow(+rx, 2);
    const ry_sq = Calculator.pow(+ry, 2);
    const x1_prime_sq = Calculator.pow(x1_prime, 2);
    const y1_prime_sq = Calculator.pow(y1_prime, 2);

    const sign = new Calculator(+largeArcFlag === +sweepFlag ? -1 : 1);
    let sq = rx_sq
      .mul(ry_sq)
      .sub(rx_sq.mul(y1_prime_sq))
      .sub(ry_sq.mul(x1_prime_sq))
      .div(rx_sq.mul(y1_prime_sq).add(ry_sq.mul(x1_prime_sq)));

    sq = +sq < 0 ? new Calculator(0) : sq;

    const coef = sign.mul(sq.sqrt());
    const cx_prime = coef.mul(Calculator.mul(+rx, y1_prime).div(+ry));
    const cy_prime = coef.mul(Calculator.mul(+ry, x1_prime).div(+rx).neg());

    return new Point([+cx_prime, +cy_prime]);
  }

  private computeP0Prime(): IPoint {
    const { P0, P1, phi } = this;
    const { x: x1, y: y1 } = P0;
    const { x: x2, y: y2 } = P1;
    const mx = Calculator.sub(x1, x2).div(2);
    const my = Calculator.sub(y1, y2).div(2);
    const x1_prime = Calculator.mul(phi.cos, mx).add(Calculator.mul(phi.sin, my));
    const y1_prime = Calculator.mul(phi.sin, mx).neg().add(Calculator.mul(phi.cos, my));

    return new Point([+x1_prime, +y1_prime]);
  }

  private computeThetaRange(): TAngleRange {
    const { P0, P1, ellipse, sweepFlag } = this;
    const theta1 = ellipse.computeThetaForPoint(P0);
    const theta2 = ellipse.computeThetaForPoint(P1);

    if (+theta2 === 0 && !sweepFlag.value) {
      theta2.replace(360, 'degrees');
    }

    const thetaRange = [theta1, theta2].sort((a, b) => +Calculator.sub(a.radians, b.radians)) as TAngleRange;

    return thetaRange;
  }
}
