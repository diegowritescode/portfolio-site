'use client';

import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { GITHUB, LINKEDIN, profile, ui } from '@/content';
import { useLang } from '@/lang';
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon } from './icons';

// WebGL stays out of the first bundle: the page is readable before it loads.
const HeroScene = dynamic(() => import('./hero-scene').then((m) => m.HeroScene), { ssr: false });

export function Hero() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: [0.22, 0.61, 0.36, 1] as const },
        };

  return (
    <header className="relative overflow-hidden border-b border-line">
      {/* The graph lives to the right of the column on wide screens, and fades
          to a faint texture behind the text on narrow ones. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45 [mask-image:radial-gradient(75%_70%_at_60%_50%,black,transparent)] lg:left-[42%] lg:opacity-100 lg:[mask-image:radial-gradient(80%_80%_at_45%_50%,black,transparent)]"
      >
        <HeroScene paused={paused} />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 py-20 sm:px-6 sm:py-28">
        <motion.p {...rise(0)} className="font-mono text-sm text-muted">
          {t(profile.role)} · {t(profile.location)}
        </motion.p>

        <motion.h1
          {...rise(0.08)}
          className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
        >
          {t(profile.headline)}
        </motion.h1>

        <motion.p {...rise(0.16)} className="mt-5 max-w-2xl text-lg text-muted">
          {t(profile.summary)}
        </motion.p>

        <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap items-center gap-2.5">
          <a
            href="#work"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-strong"
          >
            {t(ui.seeTheWork)}
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-line-strong hover:bg-surface-2"
          >
            <GitHubIcon className="h-4 w-4" />
            {t(ui.githubProfile)}
            <ArrowUpRightIcon className="h-3.5 w-3.5 opacity-60" />
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2.5 text-sm font-medium transition-colors hover:border-line-strong hover:bg-surface-2"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div {...rise(0.32)} className="mt-10 max-w-md">
          <p className="text-xs leading-relaxed text-muted">{t(ui.heroCaption)}</p>
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="mt-2 rounded border border-line px-2 py-0.5 text-[11px] text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            {paused ? t(ui.heroPlay) : t(ui.heroPause)}
          </button>
        </motion.div>
      </div>
    </header>
  );
}
