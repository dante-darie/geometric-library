import { Calculator } from 'utilities/Calculator';
import { Point } from 'abstracts/Point';
import { Line } from 'figures/Line';

export const coordinateOrigin = new Point([0, 0]);

export const xAxis = new Line([coordinateOrigin, new Point([1, 0])]);

export const yAxis = new Line([coordinateOrigin, new Point([0, 1])]);

export const PI2 = +Calculator.mul(Math.PI, 2); // 360 degrees
