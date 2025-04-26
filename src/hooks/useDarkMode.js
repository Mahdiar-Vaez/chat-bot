import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

/**
 * Hook to manage dark mode
 * @returns {Array} [theme, setTheme]
 */
const useDarkMode = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  useEffect(() => {
    const html = window.document.documentElement;
    html.setAttribute('data-theme', theme);
    html.classList.toggle('dark', theme === 'dark'); // Optional: Add 'dark' class for Tailwind utilities
  }, [theme]);

  return [theme, setTheme];
};

export default useDarkMode;