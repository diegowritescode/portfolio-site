import type { Metadata, Viewport } from 'next';
import { DEFAULT_LANG, profile, SITE_URL } from '@/content';
import { LangProvider } from '@/lang';
import { SkipLink } from '@/components/skip-link';
import './globals.css';

const title = `${profile.name} — ${profile.role[DEFAULT_LANG]}`;
const description =
  'Software engineer building production systems with Node.js, NestJS, TypeScript and PostgreSQL: a multi-tenant SaaS with an AI ordering agent, an identity and authorization platform, and a double-entry ledger, all live.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: SITE_URL, title, description, siteName: profile.name },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8fa' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0f17' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={DEFAULT_LANG}>
      <body className="min-h-screen">
        <LangProvider>
          <SkipLink />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
