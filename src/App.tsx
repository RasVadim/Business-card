import { useEffect } from 'react';

import { useInitLanguage } from './hooks';
import { Routes } from './Routes';
import { useThemeMode } from './store/atoms';
import { toggleTheme } from './utils';

const App = () => {
  const [theme] = useThemeMode();

  useInitLanguage();

  // Initialize theme
  useEffect(() => {
    // Apply theme changes
    toggleTheme(theme);
  }, [theme]);

  return (
    <>
      <Routes />
    </>
  );
};

export default App;
