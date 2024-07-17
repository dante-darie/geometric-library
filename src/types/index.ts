export type TSegment = [IPoint, IPoint];

export type TAxis = 'x' | 'y';
export type TAxii = ['x', 'y'];

export interface IBoundingBox {
  xMax: number;
  xMin: number;
  yMax: number;
  yMin: number;
}

export interface ISize {
  height: number;
  width: number;
}

export interface IClonable<T> {
  clone(): T;
}

export interface IFlag extends IClonable<IFlag> {
  readonly value: boolean;
  invert(): this;
  replace(value: boolean): this;
  valueOf(): number;
}

export type TAngleUnit = 'radians' | 'degrees';

export interface IAngle extends IClonable<IAngle> {
  readonly cos: number;
  readonly cot: number;
  readonly degrees: number;
  readonly radians: number;
  readonly sin: number;
  readonly tan: number;
  normalize(): this;
  replace(value: number, unit: TAngleUnit): this;
  scale(factor: number): this;
  valueOf(): number;
}

export type TAngleRange = [IAngle, IAngle];

export interface IMagnitude extends IClonable<IMagnitude> {
  readonly value: number;
  replace(value: number): this;
  scale(factor: number): this;
  valueOf(): number;
}

export type TPointValues = [number, number];

export interface IPoint extends IClonable<IPoint> {
  readonly values: TPointValues;
  readonly x: number;
  readonly y: number;
  reflect(about: IPoint): this;
  replace(point: IPoint): this;
  rotate(phi: IAngle, about?: IPoint): this;
  translate(vector: IVector): this;
}

export type TVectorValues = [number, number];

export interface IVector extends IClonable<IVector> {
  readonly dx: number;
  readonly dy: number;
  readonly values: TVectorValues;
  angleTo(vector: IVector): IAngle;
  dotProduct(vector: IVector): number;
  reflect(about: { x: boolean; y: boolean }): this;
  replace(vector: IVector): this;
  rotate(phi: IAngle): this;
  scale(factor: number): this;
}

export type TFigureValue = IFlag | IMagnitude | IAngle | IPoint | IVector;
export type TFigureValues = [IPoint, ...TFigureValue[]];

export interface IFigure {
  readonly boundingBox: IBoundingBox;
  readonly values: TFigureValues;
  reflect(about: IPoint | ILine): this;
  rotate(phi: IAngle, about?: IPoint): this;
  scale(factor: number, about?: IPoint): this;
  translate(vector: IVector): this;
}

export type TLineRelativeValues = [IPoint, IVector];
export type TLineAbsoluteValues = [IPoint, IPoint];
export type TLineValues = TLineAbsoluteValues | TLineRelativeValues;

export interface ILine extends IFigure, IClonable<ILine> {
  readonly P0: IPoint;
  readonly P1: IPoint;
  readonly V: IVector;
  readonly a: number;
  readonly b: number;
  readonly c: number;
  readonly isHorizontal: boolean;
  readonly isVertical: boolean;
  readonly reciprocal: number | undefined;
  readonly slope: number | undefined;
  readonly xIntercept: number | undefined;
  readonly yIntercept: number | undefined;
  angleTo(reference: ILine | IVector): IAngle;
  getIntersectionPoint(line: ILine): IPoint | undefined;
  getPerpendicularProjection(point: IPoint): IPoint;
  getPerpendicularThrough(point: IPoint): ILine;
  getPointAtParameter(t: number): IPoint | undefined;
  getXValueAtY(y: number): number | undefined;
  getYValueAtX(x: number): number | undefined;
  hasPoint(point: IPoint): boolean;
  isParallelTo(line: ILine): boolean;
  isPerpendicularTo(line: ILine): boolean;
}

export type TEllipseValues = [IPoint, IMagnitude, IMagnitude, IAngle];
export type TEllipseCriticalPoints = [IPoint, IPoint, IPoint, IPoint];

export interface IEllipse extends IFigure, IClonable<IEllipse> {
  readonly center: IPoint;
  readonly criticalPoints: TEllipseCriticalPoints;
  readonly phi: IAngle;
  readonly rx: IMagnitude;
  readonly ry: IMagnitude;
  computePointForTheta(theta: IAngle): IPoint;
  computeThetaForPoint(point: IPoint): IAngle;
}

export type TCircleValues = [IPoint, IMagnitude];

export interface ICircle extends IFigure, IClonable<ICircle> {
  readonly center: IPoint;
  readonly criticalPoints: TEllipseCriticalPoints;
  readonly radius: IMagnitude;
}

export type TArcAbsoluteValues = [IPoint, IMagnitude, IMagnitude, IAngle, IFlag, IFlag, IPoint];
export type TArcRelativeValues = [IPoint, IMagnitude, IMagnitude, IAngle, IFlag, IFlag, IVector];
export type TArcValues = TArcAbsoluteValues | TArcRelativeValues;

export interface IArcCurve extends IFigure, IClonable<IArcCurve> {
  readonly center: IPoint;
  readonly criticalPoints: IPoint[];
}

export type TCubicBezierAbsoluteValues = [IPoint, IPoint, IPoint, IPoint];
export type TCubicBezierRelativeValues = [IPoint, IVector, IVector, IVector];
export type TCubicBezierValues = TCubicBezierAbsoluteValues | TCubicBezierRelativeValues;

export interface ICubicBezierCurve extends IFigure, IClonable<ICubicBezierCurve> {
  readonly criticalPoints: IPoint[];
}

export type TQuadraticBezierAbsoluteValues = [IPoint, IPoint, IPoint];
export type TQuadraticBezierRelativeValues = [IPoint, IVector, IVector];
export type TQuadraticBezierValues = TQuadraticBezierAbsoluteValues | TQuadraticBezierRelativeValues;

export interface IQuadraticBezierCurve extends IFigure, IClonable<IQuadraticBezierCurve> {
  readonly criticalPoints: IPoint[];
}

export type TPolygonValues = [IPoint, IPoint, IPoint, ...IPoint[]];

export interface IPolygon extends IFigure, IClonable<IPolygon> {
  readonly sides: number;
}
