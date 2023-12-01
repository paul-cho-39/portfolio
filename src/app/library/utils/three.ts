import { PositionRange } from '@/app/library/@types';
import { Vector3 } from 'three';

// store this inside the utils file:
// limit for x:  -12 - 4
// limit for y:  -5 - 10
// limit for z - 20 - 60

export function generateEvenPosition(clouds: number) {
   const positions: Vector3[] = [];

   const xRange = { low: -12, high: 4 };
   const yRange = { low: -5, high: 10 };
   const zRange = { low: 10, high: 50 };

   const initialCount = Math.round(Math.pow(clouds, 1 / 3));

   const xCount = initialCount;
   const yCount = initialCount;
   const zCount = clouds / (xCount * yCount);

   const xStep = computeStep(xRange, xCount);
   const yStep = computeStep(yRange, yCount);
   const zStep = computeStep(zRange, zCount);

   const computePosition = (i: number, j: number, k: number) =>
      new Vector3(xRange.low + i * xStep, yRange.low + j * yStep, zRange.low + k * zStep);

   for (let i = 0; i < xCount; i++) {
      for (let j = 0; j < yCount && positions.length < clouds; j++) {
         for (let k = 0; k < zCount && positions.length < clouds; k++) {
            positions.push(computePosition(i, j, k));
         }
      }
   }

   return positions;
}

export function generateScale(dimension: number[]) {
   const [scaleX, scaleY, scaleZ] = getRandomRatio();

   return new Vector3(dimension[0] * scaleX, dimension[1] * scaleY, dimension[2] * scaleZ);
}

export const smoothstep = (low: number, high: number, f: number) => {
   f = (f - low) / (high - low);
   f = Math.max(0, Math.min(1, f));
   return Math.pow(f, 2) * (3 - 2 * f);
};

export const drag = (d: number = 0.86) => d + 0.02 * Math.random(); // 0.96

const getRandomRatio = () => {
   const ratios = [
      [1, 1, 1],
      [2.5, 4, 5],
      [3, 1.5, 2],
      [4.5, 3, 2],
   ];

   return ratios[Math.floor(Math.random() * ratios.length)];
};

const computeStep = (range: PositionRange, count: number) => (range.high - range.low) / (count - 1);

export const randomizeVelocity = (value: number) => {
   const ran = Math.random();
   return ran > 0.5 ? value : -value;
};
