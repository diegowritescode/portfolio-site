'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { DEFAULT_LANG, type I18n, type Lang } from '@/content';

const STORAGE_KEY = 'deviego-lang';

interface LangContextValue {
  readonly lang: Lang;
  readonly setLang: (next: Lang) => void;
  readonly t: (value: I18n) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (value) => value[DEFAULT_LANG],
});

function readStoredLang(): Lang | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'es' ? stored : null;
  } catch {
    return null;
  }
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  // Always render DEFAULT_LANG first so the static export and the first client
  // paint agree; the real preference is applied right after mount.
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const stored = readStoredLang();
    if (stored) {
      setLangState(stored);
      return;
    }
    if (navigator.language?.toLowerCase().startsWith('es')) setLangState('es');
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // A private window can refuse storage; the choice still applies this visit.
    }
  }, []);

  const t = useCallback((value: I18n) => value[lang], [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}
