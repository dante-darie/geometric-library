import { TEllipseValues, IBoundingBox, IPoint, IEllipse, TEllipseCriticalPoints, IMagnitude, IVector, ILine, IAngle } from '../types';
import { Calculator } from '../utilities/Calculator';
import { Angle } from '../abstracts/Angle';
import { Point } from '../abstracts/Point';
import { Figure } from '../abstracts/Figure';
import { xAxis } from '../utilities';

export class Ellipse extends Figure implements IEllipse {
  private _center: IPoint;
  private _criticalPoints: TEllipseCriticalPoints;
  private _phi: IAngle;
  private _rx: IMagnitude;
  private _ry: IMagnitude;

  constructor(values: TEllipseValues) {
    super(values);

    const [center, rx, ry, phi] = values;

    this._center = center;
    this._rx = rx;
    this._ry = ry;
    this._phi = phi;
    this._criticalPoints = this.computeCriticalPoints({ center, rx, ry, phi } as IEllipse);
  }

  public get boundingBox(): IBoundingBox {
    return Figure.computeBoundingBox(this.criticalPoints);
  }

  public get center() {
    return this._center;
  }

  public get criticalPoints() {
    return this._criticalPoints;
  }

  public get isCircle() {
    return +this.rx === +this.ry;
  }

  public get phi() {
    return this._phi;
  }

  public get rx() {
    return this._rx;
  }

  public get ry() {
    return this._ry;
  }

  public clone(): IEllipse {
    const values = (this.values as TEllipseValues).map((value) => value.clone());

    return new Ellipse(values as TEllipseValues);
  }

  public computePointForTheta(theta: IAngle, ellipse: IEllipse = this): IPoint {
    const { center, rx, ry, phi } = ellipse;
    const x = +Calculator.mul(+rx, phi.cos).mul(theta.cos).sub(Calculator.mul(+ry, phi.sin).mul(theta.sin)).add(center.x);
    const y = +Calculator.mul(+rx, phi.sin).mul(theta.cos).add(Calculator.mul(+ry, phi.cos).mul(theta.sin)).add(center.y);

    return new Point([x, y]);
  }

  public computeThetaForPoint({ x, y }: IPoint): IAngle {
    const { center, phi, rx, ry } = this;
    const { x: cx, y: cy } = center;
    const dy = Calculator.sub(y, cy);
    const dx = Calculator.sub(x, cx);
    const sinTheta = dy.mul(phi.cos).sub(dx.mul(phi.sin)).div(+ry);
    const cosTheta = dx.mul(phi.cos).add(dy.mul(phi.sin)).div(+rx);
    const theta = new Angle(+Calculator.atan2(sinTheta, cosTheta), 'radians').normalize();

    return theta;
  }

  public reflect(about: IPoint | ILine): this {
    super.reflect(about);

    if (!this.isCircle && 'V' in about) {
      const alpha = about.angleTo(xAxis);

      this._phi.replace(+Calculator.mul(2, alpha.radians).sub(this.phi.radians), 'radians');
      this._phi.normalize();
    }

    this.recompute();

    return this;
  }

  public rotate(alpha: IAngle, about?: IPoint | undefined): this {
    this._center.rotate(alpha, about);

    if (!this.isCircle) {
      this._phi.replace(+Calculator.add(this.phi.radians, alpha.radians), 'radians');
      this._phi.normalize();
    }

    this.recompute();

    return this;
  }

  public scale(factor: number, about: IPoint = new Point([0, 0])): this {
    super.scale(factor, about);

    this.recompute();

    return this;
  }

  public translate(vector: IVector): this {
    this._center.translate(vector);

    this.recompute();

    return this;
  }

  protected computeCriticalPoints(ellipse: IEllipse = this): TEllipseCriticalPoints {
    const { rx, ry, phi } = ellipse;
    const { computePointForTheta } = this;
    const xThetaPrincipal = new Angle(+Calculator.neg(+ry).mul(phi.tan).div(+rx).atan(), 'radians');
    const yThetaPrincipal = new Angle(+Calculator.mul(+ry, phi.cot).div(+rx).atan(), 'radians');
    const xThetaSecondary = new Angle(+Calculator.add(+xThetaPrincipal, Math.PI), 'radians');
    const yThetaSecondary = new Angle(+Calculator.add(+yThetaPrincipal, Math.PI), 'radians');
    const firstPoint = computePointForTheta(xThetaPrincipal, ellipse);
    const secondPoint = computePointForTheta(yThetaPrincipal, ellipse);
    const thirdPoint = computePointForTheta(xThetaSecondary, ellipse);
    const fourthPoint = computePointForTheta(yThetaSecondary, ellipse);

    return [firstPoint, secondPoint, thirdPoint, fourthPoint];
  }

  private recompute(): void {
    this._criticalPoints = this.computeCriticalPoints();
  }
}
