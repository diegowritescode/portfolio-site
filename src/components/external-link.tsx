'use client';

import { ui } from '@/content';
import { useLang } from '@/lang';
import { ArrowUpRightIcon } from './icons';

export function ExternalLink({
  href,
  children,
  variant = 'quiet',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'quiet';
}) {
  const { t } = useLang();
  const styles =
    variant === 'primary'
      ? 'bg-brand text-page font-semibold hover:bg-brand-strong glow-box'
      : 'border border-line text-fg-dim hover:border-brand hover:text-brand';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-sm px-3.5 py-2 font-mono text-[13px] transition-colors ${styles}`}
    >
      {children}
      <ArrowUpRightIcon className="h-3.5 w-3.5 opacity-70" />
      <span className="sr-only">({t(ui.newTab)})</span>
    </a>
  );
}
