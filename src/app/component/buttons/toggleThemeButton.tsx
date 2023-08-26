import { useEffect, useState } from 'react';
import LightThemeIcon from '../themes';
import { ThemeContextParams } from '@/constants/index';

import styles from './../styles.module.css';
import { Toggler } from './toggler';

const DarkThemeIcon = () => {
   return <div className={`${styles.crescent}`}></div>;
};

const ToggleTheme = ({ theme, setTheme }: ThemeContextParams) => {
   const [themeEnabled, setThemeEnabled] = useState(false);

   const toggleTheme = () => {
      setThemeEnabled(true);
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      window.localStorage.setItem('theme', newTheme);
      setThemeEnabled(false);
   };

   return (
      <>
         <Toggler enabled={} />
         {/* small should be hidden(?) */}
         {/* <button className='relative top-0' onClick={toggleTheme}>
            <span className='sr-only'>{theme} theme</span>
            {isTransitioning ? (
               <DarkThemeIcon />
            ) : theme === 'light' ? (
               <LightThemeIcon toggle={isTransitioning} radius={30} offsetRayDistance={48} />
            ) : (
               <DarkThemeIcon />
            )}
         </button> */}
      </>
   );
};

export default ToggleTheme;
