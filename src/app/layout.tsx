import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { DEFAULT_LANG, profile, SITE_URL } from '@/content';
import { LangProvider } from '@/lang';
import { ThemeProvider, THEME_SCRIPT } from '@/theme';
import { SkipLink } from '@/components/skip-link';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

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
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={DEFAULT_LANG} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Sets the theme before first paint, so there is no flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <LangProvider>
            <SkipLink />
            {children}
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
