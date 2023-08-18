import { ReactThreeFiber } from 'react-three-fiber';
import { Water } from 'three-stdlib';

declare global {
   namespace JSX {
      interface IntrinsicElements {
         water: ReactThreeFiber.Object3DNode<Water, typeof Water>;
      }
   }
}
