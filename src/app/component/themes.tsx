import styles from './styles.module.css';

interface LightThemeIconParams {
   toggle: boolean;
   radius?: number;
   offsetRayDistance?: number;
}

const LightThemeIcon = ({ radius = 75, offsetRayDistance = 28, toggle }: LightThemeIconParams) => {
   const NUMBER_OF_RAYS = 18;
   let cx = radius,
      cy = radius;

   const adjustPosition = (type: 'bottom' | 'right') => {
      return type === 'bottom' ? `${radius + radius / 1.7}px` : `${radius / 1.85}px`;
   };

   let rays = [];
   let rotationDegree;
   for (let i = 0; i < NUMBER_OF_RAYS; i++) {
      let θ = i * ((2 * Math.PI) / NUMBER_OF_RAYS); // angle for each ray
      let x = cx + (radius - offsetRayDistance) * Math.cos(θ); // x-coordinate
      let y = cy + (radius - offsetRayDistance) * Math.sin(θ); // y-coordinate

      // this will only work for 12 rays. If number of rays increase/decrease have to recalculate
      // the rotation degree
      rotationDegree = 90 - (θ * 180) / Math.PI;
      if (i % 3 !== 0) {
         let offset = i % 3 === 2 ? 5 : -5;
         rotationDegree = (i % 6 < 3 ? 135 : 45) + offset;
      }

      rays.push(
         <div
            key={i}
            // className={toggle ? `${styles.ray}` : `${styles.ray}`}
            // className={styles.ray}
            style={{
               left: `${x}px`,
               top: `${y}px`,
               transform: `rotate(${rotationDegree}deg)`,
               animationDelay: `${i * 0.05}s`,
            }}
         />
      );
   }

   return (
      <>
         <div
            className={toggle ? `${styles.sun}` : `${styles.sun}`}
            style={{
               position: 'relative',
               height: `${radius}px`,
               width: `${radius}px`,
               borderRadius: '99%',
            }}
         ></div>
         <div
            style={{
               bottom: adjustPosition('bottom'),
               right: adjustPosition('right'),
            }}
            className='relative'
         >
            {rays}
         </div>
      </>
   );
};

export default LightThemeIcon;
