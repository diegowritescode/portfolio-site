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
      className="inline-flex items-center gap-1.5 rounded-sm border border-line px-2.5 py-1.5 font-mono text-[12.5px] transition-colors hover:border-brand hover:text-brand"
    >
      <GlobeIcon className="h-3.5 w-3.5 opacity-70" />
      {t(ui.langSwitch)}
    </button>
  );
}
