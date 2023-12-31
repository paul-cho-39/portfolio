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

   return { theme, setTheme };
}
