import { Calculator } from './calculator';
import { Point } from '@abstracts';
import { Line } from '@figures';
export * from './calculator';
export const coordinateOrigin = new Point([0, 0]);
export const xAxis = new Line([coordinateOrigin, new Point([1, 0])]);
export const yAxis = new Line([coordinateOrigin, new Point([0, 1])]);
export const PI2 = Calculator.PI2; // 360 degrees
