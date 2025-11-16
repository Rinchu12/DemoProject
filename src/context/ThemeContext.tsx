import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';

interface ThemeContextType {
  theme: THEME;
  toggleTheme: () => void;
}

type THEME = 'light' | 'dark';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<THEME>(systemScheme as THEME);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
