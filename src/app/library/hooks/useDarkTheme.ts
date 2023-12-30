import { ThemeContextParams } from '@/app/constants';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { usePathname } from 'next/navigation';

export default function useDarkTheme() {
   const context = useContext<ThemeContextParams | undefined>(ThemeContext);
   const path = usePathname();

   if (!context) {
      throw new Error('At least one component must be used within ThemeProvider component');
   }

   const { theme, setTheme } = context;

   useEffect(() => {
      if (theme === 'dark') {
         document.body.classList.add('dark');
      } else {
         document.body.classList.remove('dark');
      }
   }, [theme]);

   useEffect(() => {
      /**
       * light mode is the default mode
       * inside home path there is no option to toggle
       * when the path is home set it back to the default theme
       */
      if (!path || path !== '/') return;

      setTheme('light');

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [path, theme]);

   return { theme, setTheme };
}
