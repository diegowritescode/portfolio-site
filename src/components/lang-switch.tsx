'use client';

import { ui } from '@/content';
import { useLang } from '@/lang';
import { GlobeIcon } from './icons';

export function LangSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
      aria-label={t(ui.langSwitchLabel)}
      className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-sm font-medium transition-colors hover:border-line-strong hover:bg-surface-2"
    >
      <GlobeIcon className="h-3.5 w-3.5 opacity-70" />
      {t(ui.langSwitch)}
    </button>
  );
}
