import { createContext, useContext } from 'react';

export const ThemeContext = createContext({
    themeMode: 'dark',
    toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
