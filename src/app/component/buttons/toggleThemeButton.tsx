import { ThemeContextProps } from '../../../../contexts/ThemeContext';
import LightThemeIcon from '../themes';

import styles from './../styles.module.css';
import { useEffect, useState } from 'react';

const DarkThemeIcon = () => {
   return <div className={`${styles.crescent}`}></div>;
};

const ToggleTheme = ({ theme, setTheme }: ThemeContextProps) => {
   const [isTransitioning, setIsTransitioning] = useState(false);
   const toggleTheme = () => {
      setIsTransitioning(true);
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      window.localStorage.setItem('theme', newTheme);
      setIsTransitioning(false);
   };

   return (
      <>
         {/* small should be hidden(?) */}
         <button className='relative top-0' onClick={toggleTheme}>
            <span className='sr-only'>{theme} theme</span>
            {isTransitioning ? (
               <DarkThemeIcon />
            ) : theme === 'light' ? (
               <LightThemeIcon toggle={isTransitioning} radius={30} offsetRayDistance={48} />
            ) : (
               <DarkThemeIcon />
            )}
         </button>
      </>
   );
};

export default ToggleTheme;
