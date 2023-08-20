'use client';

import { createContext, useState, useEffect } from 'react';
import { ColorTheme, ThemeContextParams } from '../../constants';

export const ThemeContext = createContext<ThemeContextParams | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
   const [theme, setTheme] = useState<ColorTheme>('light');

   useEffect(() => {
      const localTheme = window.localStorage.getItem('theme') as ColorTheme;
      setTheme(localTheme || 'light');
   }, []);

   return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
