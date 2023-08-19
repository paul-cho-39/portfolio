import { useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';

export const ArrowDown = () => {
   const pathRef = useRef<SVGPathElement>();
   const pathLength = 100;
   useEffect(() => {
      if (pathRef.current) {
         const length = pathRef.current.getTotalLength();

         console.log('the length of the path is: ', pathRef.current);

         pathRef.current.style.strokeDashoffset = length;
         pathRef.current.style.strokeDasharray = length;
      }
   }, []);

   const iconVariants: Variants = {
      hidden: {
         strokeDashoffset: pathLength,
         strokeDasharray: pathLength,
      },
      visible: {
         strokeDashoffset: 0,
         transition: {
            duration: 2,
            repeatDelay: 0.5,
            repeatType: 'loop',
            repeat: Infinity,
         },
      },
   };

   const icons: Variants = {
      hidden: {
         strokeDashoffset: 10,
         pathOffset: 1,
      },
      visible: {
         strokeDashoffset: 0,
         pathOffset: 0,
      },
   };

   return (
      <div className='flex items-center align-center justify-center w-full min-h-screen stroke-red-700'>
         <motion.svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 221.6 311.36'
            height={100}
            width={100}
            className='rotate-180 align-center items-center justify-center'
            variants={icons}
            initial='hidden'
            animate='visible'
         >
            <motion.path
               // ref={pathRef}
               initial='hidden'
               animate='visible'
               variants={icons}
               strokeWidth={4}
               strokeDasharray='1'
               fill='none'
               transition={{
                  //  default: { duration: 2, ease: 'easeInOut' },
                  duration: 2,
                  repeatDelay: 0.5,
                  repeatType: 'loop',
                  repeat: Infinity,
               }}
               d='M40.38,48.58C25.72,51.46,18.27,69,0,63.24,2.4,59.87,3.61,57.71,5.53,56,26.2,38.72,46.87,21.66,67.78,4.83,71.14,2.19,76.91-.94,80.52.27,87,2.19,85.8,8.68,84.36,14.45c-4.08,17.54-7.93,35.09-12,52.87-9.85-4.56-9.85-4.56-7.45-35.09C26.2,72.61,32.21,133.9,78.83,162.74c2.65-4.81,5-9.61,7.94-14.18C94.94,134.86,106,125,121.62,120.2c11.53-3.61,21.87-2.4,30.28,6.49,8.65,9.13,7.69,19.95,3.61,30.76-9.14,23.56-30,35.09-55,30.29-3.13-.48-6.25-.72-10.58-1.2-2.4,32,3.85,61,22.83,86,29.57,38.46,70.43,29.32,97.59,8.89,3.36-2.4,6.24-5.77,11.29-10.33-1,10.57-6.49,15.86-11.78,21.15-21.15,20.19-56.72,25-82.68,11.29-16.58-8.65-28.84-21.63-37-38.45-12-24.76-17.79-50.47-14.9-78.11.24-2.65.48-5.53.72-9.14C55.52,163,37.25,146.16,30.28,120.2,23.07,95.44,32.93,72.37,40.38,48.58ZM92.77,170.67c23.8,10.82,45,3.13,51.68-18.26,1.44-5,1-12.26-1.68-16.83-3.85-6.25-11.06-5.29-17.79-2.88C107.68,139.67,98.3,152.65,92.77,170.67Z'
            />
         </motion.svg>
      </div>
   );
};

// export const Boxes = () => {
//    return (
//       <motion.div
//          className='w-12 h-12 bg-red-300'
//          animate={{
//             scale: [1, 2, 2, 1, 1],
//             rotate: [0, 0, 180, 180, 0],
//             borderRadius: ['0%', '0%', '50%', '50%', '0%'],
//          }}
//          transition={{
//             duration: 2,
//             ease: 'easeInOut',
//             times: [0, 0.2, 0.5, 0.8, 1],
//             repeat: Infinity,
//             repeatDelay: 1,
//          }}
//       />
//    );
// };
