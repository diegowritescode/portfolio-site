import Link from 'next/link';
import { profile } from '@/content';

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">This page does not exist.</h1>
      <p className="mt-3 text-muted">The link may be old, or the address mistyped.</p>
      <Link
        href="/"
        className="mt-8 inline-flex w-fit items-center rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-strong"
      >
        Back to {profile.name}
      </Link>
    </main>
  );
}
