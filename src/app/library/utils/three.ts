import { Vector3 } from 'three';

// store this inside the utils file:
export function generateRandomPosition(pos: Vector3) {
   const offsetX = 6;
   const offsetY = 4;
   const offsetZ = 2;

   const randomOffset = (offset: number) => (Math.random() - 0.5) * offset;
   return new Vector3(
      pos.x + randomOffset(offsetX),
      pos.y + randomOffset(offsetY),
      pos.z + randomOffset(offsetZ)
   );
}

const ratios = [
   [4, 1.5],
   [3, 1],
   [3, 1.5],
];

export function generateScale(index: number, baseWidth: number = 1, baseHeight: number = 1) {
   const [widthRatio, heightRatio] = ratios[index];

   const width = baseWidth * widthRatio;
   const height = baseHeight * heightRatio;

   return new Vector3(width, height, 1);
}

export const smoothstep = (low: number, high: number, f: number) => {
   f = (f - low) / (high - low);
   f = Math.max(0, Math.min(1, f));
   return Math.pow(f, 2) * (3 - 2 * f);
};

export const drag = (d: number = 0.86) => d + 0.02 * Math.random(); // 0.96
