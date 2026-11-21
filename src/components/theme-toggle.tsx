'use client';

import { ui } from '@/content';
import { useLang } from '@/lang';
import { useTheme } from '@/theme';

/** Light or dark, on one button. */
export function ThemeToggle() {
  const { t } = useLang();
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t(dark ? ui.themeToLight : ui.themeToDark)}
      title={t(dark ? ui.themeToLight : ui.themeToDark)}
      className="rounded-full p-2 text-fg transition-colors hover:bg-surface-2"
    >
      {dark ? (
        // A sun: the page is dark, so the button offers light.
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 2.4v2.6M12 19v2.6M2.4 12h2.6M19 12h2.6" />
            <path d="M5.2 5.2l1.9 1.9M16.9 16.9l1.9 1.9M18.8 5.2l-1.9 1.9M7.1 16.9l-1.9 1.9" />
          </g>
        </svg>
      ) : (
        // A moon: the page is light, so the button offers dark.
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M20.7 14.6A8.8 8.8 0 1 1 9.4 3.3a7.1 7.1 0 0 0 11.3 11.3z"
          />
        </svg>
      )}
    </button>
  );
}
