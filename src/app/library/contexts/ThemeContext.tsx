import { ColorTheme, ThemeContextParams } from '@/app/constants';
import { usePathname } from 'next/navigation';
import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext<ThemeContextParams | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
   const [theme, setTheme] = useState<ColorTheme | null>(null);
   const path = usePathname();

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const localTheme = window.localStorage.getItem('theme') as ColorTheme;
         setTheme(localTheme);
      }
   }, [path]);

   useEffect(() => {
      /**
       * light mode is the default mode
       * inside home path there is no option to toggle
       * when the path is home set it back to the default theme
       */
      if (path === '/') {
         document.body.classList.remove('dark');
         setTheme(null);
      }

      if (path !== '/' && theme) {
         window.localStorage.setItem('theme', theme);
      }
   }, [path, theme]);

   return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
