import Image from 'next/image';
import { ThemeContextProps } from '../../../../contexts/ThemeContext';

import styles from './../styles.module.css';
import { useState } from 'react';

// radius, offsetBy, rayHeight, numberOfRays;
const LightThemeIcon = () => {
   const [middle, setMiddle] = useState(0);
   const numberOfRays = 14;
   const radius = 100;
   let cx = 100,
      cy = 100;

   const adjustPosition = (type: 'bottom' | 'right') => {
      return type === 'bottom' ? `${radius + radius / 2}px` : `${radius / 2}px`;
   };

   let rays = [];
   for (let i = 0; i < numberOfRays; i++) {
      let θ = i * ((2 * Math.PI) / numberOfRays); // angle for each ray
      let x = cx + radius * Math.cos(θ); // x-coordinate
      let y = cy + radius * Math.sin(θ); // y-coordinate

      rays.push(
         <div
            key={i}
            className='absolute h-2 w-1 bg-yellow-100'
            style={{ left: `${x}px`, top: `${y}px` }}
         />
      );
   }

   return (
      <>
         <div
            style={{
               height: `${radius}px`,
               width: `${radius}px`,
            }}
            className={`bg-yellow-200 rounded-full relative `}
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

const ToggleTheme = ({ theme, setTheme }: ThemeContextProps) => {
   const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      window.localStorage.setItem('theme', newTheme);
   };

   return (
      <button onClick={toggleTheme}>
         <LightThemeIcon />
      </button>
   );
};

export default ToggleTheme;
