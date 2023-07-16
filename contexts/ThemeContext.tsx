'use client';

import { createContext, useState, useEffect } from 'react';
import { ColorTheme } from '../constants';

export interface ThemeContextProps {
   theme: ColorTheme;
   setTheme: (theme: ColorTheme) => void;
}

const defaultContext: ThemeContextProps = {
   theme: 'light',
   setTheme: (theme: ColorTheme) => {},
};

export const ThemeContext = createContext<ThemeContextProps>(defaultContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
   const [theme, setTheme] = useState<ColorTheme>('light');

   useEffect(() => {
      const localTheme = window.localStorage.getItem('theme') as ColorTheme;
      setTheme(localTheme || 'light');
   }, []);

   return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
