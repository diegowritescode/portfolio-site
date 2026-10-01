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
  const styles =
    variant === 'primary'
      ? 'bg-brand text-white hover:bg-brand-strong'
      : 'border border-line bg-surface text-fg hover:border-line-strong hover:bg-surface-2';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${styles}`}
    >
      {children}
      <ArrowUpRightIcon className="h-3.5 w-3.5 opacity-70" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
