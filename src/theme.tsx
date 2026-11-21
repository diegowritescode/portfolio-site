'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/**
 * Light or dark, chosen by the visitor and remembered.
 * `system` means no attribute at all, so the CSS media query decides.
 */
export type Theme = 'light' | 'dark';

const KEY = 'theme';

interface ThemeValue {
  readonly theme: Theme;
  readonly toggle: () => void;
}

const ThemeContext = createContext<ThemeValue>({ theme: 'light', toggle: () => {} });

/**
 * Runs before paint, so the page never flashes the wrong theme.
 * Inlined into the document head as a blocking script.
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('${KEY}');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Starts light to match the server render; the effect reconciles with the
  // attribute the blocking script already set, so there is no flash.
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === 'dark' ? 'dark' : 'light');
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem(KEY, next);
      } catch {
        // A blocked store only costs the memory of the choice.
      }
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
