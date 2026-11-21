'use client';

import { EMAIL, GITHUB, LINKEDIN, profile, ui } from '@/content';
import { useLang } from '@/lang';
import { GitHubIcon, LinkedInIcon } from './icons';

/**
 * The profile header: avatar inside a story ring, handle and actions,
 * the counter row, and the bio. Desktop puts the avatar beside the text,
 * the phone layout stacks it and moves the counters to their own rule,
 * which is how a real profile reorganizes itself.
 */
export function ProfileHeader() {
  const { t, lang } = useLang();

  return (
    <header className="px-4 pt-6 pb-2 sm:px-6 md:pt-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-12">
        {/* The profile picture, inside the gradient story ring. */}
        <div className="shrink-0 self-start md:mx-6">
          <div className="story-ring rounded-full p-[3px]">
            <div className="rounded-full bg-page p-[3px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/avatar.jpg"
                alt={profile.name}
                width={150}
                height={150}
                fetchPriority="high"
                className="h-[88px] w-[88px] rounded-full bg-surface-2 object-cover md:h-[150px] md:w-[150px]"
              />
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          {/* Handle, verified tick and the action buttons. */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <h1 className="text-xl font-normal tracking-tight text-fg sm:text-2xl">
              {profile.handle}
            </h1>

            <span
              title={t(ui.verifiedLabel)}
              className="inline-flex items-center"
              aria-label={t(ui.verifiedLabel)}
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" role="img" aria-hidden="true">
                <path
                  fill="var(--color-brand)"
                  d="M12 1.5l2.6 2.1 3.3-.3.9 3.2 2.9 1.6-1.3 3.1 1.3 3.1-2.9 1.6-.9 3.2-3.3-.3L12 22.5l-2.6-2.1-3.3.3-.9-3.2-2.9-1.6L3.6 12.8 2.3 9.7l2.9-1.6.9-3.2 3.3.3L12 1.5z"
                />
                <path
                  fill="#fff"
                  d="M10.8 15.4l-3-3 1.3-1.3 1.7 1.7 4.2-4.2 1.3 1.3-5.5 5.5z"
                />
              </svg>
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${EMAIL}`}
                className="rounded-lg bg-brand px-5 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {t(ui.followLabel)}
              </a>
              <a
                href="#contact"
                className="rounded-lg bg-surface-2 px-5 py-1.5 text-sm font-semibold text-fg transition-colors hover:bg-line"
              >
                {t(ui.messageLabel)}
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-lg bg-surface-2 p-2 text-fg transition-colors hover:bg-line"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg bg-surface-2 p-2 text-fg transition-colors hover:bg-line"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Counters: inline on desktop, on their own rule on a phone. */}
          <dl className="mt-6 hidden gap-10 md:flex">
            {profile.counts.map((count) => (
              <div key={count.value} className="flex items-baseline gap-1.5 text-base">
                <dd className="font-semibold text-fg tabular-nums">{count.value}</dd>
                <dt className="text-fg-dim">{t(count.label)}</dt>
              </div>
            ))}
          </dl>

          {/* Bio. */}
          <div className="mt-5 space-y-0.5 text-sm leading-relaxed md:mt-6">
            <p className="font-semibold text-fg">{profile.name}</p>
            <p className="text-muted">{t(profile.role)}</p>
            {profile.bio[lang].map((line) => (
              <p key={line} className="text-fg-dim">
                {line}
              </p>
            ))}
            <p className="pt-1">
              <span className="text-muted">📍 {t(profile.location)}</span>
            </p>
            <p className="flex items-center gap-1.5 pt-0.5 text-brand">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-live"
              />
              {t(profile.availability)}
            </p>
          </div>
        </div>
      </div>

      {/* The phone counter row, on its own rules. */}
      <dl className="mt-6 grid grid-cols-3 border-y border-line py-3 text-center md:hidden">
        {profile.counts.map((count) => (
          <div key={count.value}>
            <dd className="text-base font-semibold text-fg tabular-nums">{count.value}</dd>
            <dt className="text-xs text-muted">{t(count.label)}</dt>
          </div>
        ))}
      </dl>
    </header>
  );
}
