'use client';

import { ui } from '@/content';
import { useLang } from '@/lang';

export function SkipLink() {
  const { t } = useLang();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:shadow"
    >
      {t(ui.skipToContent)}
    </a>
  );
}
