'use client';

import dynamic from 'next/dynamic';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { useEffect, useRef } from 'react';
import { GITHUB, LINKEDIN, profile, ui } from '@/content';
import { useLang } from '@/lang';
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon } from './icons';
import { PortraitParticles } from './portrait-particles';

const HeroScene = dynamic(() => import('./hero-scene').then((m) => m.HeroScene), { ssr: false });

export function Hero() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const scrollValue = useRef(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => scrollYProgress.on('change', (v) => (scrollValue.current = v)), [scrollYProgress]);

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <header className="relative isolate flex min-h-[92vh] items-center overflow-hidden border-b border-line">
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-90">
        <HeroScene scrollRef={scrollValue} />
      </div>

      {/* A single slow scan sweep, the one piece of pure atmosphere. */}
      {!reduced ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -z-10 h-32 bg-gradient-to-b from-transparent via-brand/5 to-transparent motion-safe:[animation:scan_9s_linear_infinite]"
        />
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-page/85 via-page/40 to-page"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
        <div>
          <motion.p
            {...rise(0)}
            className="prompt font-mono text-xs tracking-wide text-muted uppercase"
          >
            {t(profile.role)}
          </motion.p>

          <motion.h1
            {...rise(0.1)}
            className="mt-5 text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl"
          >
            {t(profile.headlineLead)}{' '}
            <span className="glow text-brand">{t(profile.headlineAccent)}</span>
          </motion.h1>

          <motion.p {...rise(0.2)} className="mt-6 max-w-xl text-lg text-fg-dim">
            {t(profile.summary)}
          </motion.p>

          <motion.div {...rise(0.3)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="glow-box inline-flex items-center gap-2 rounded-sm bg-brand px-5 py-3 font-mono text-sm font-semibold text-page transition-colors hover:bg-brand-strong"
            >
              {t(ui.seeTheWork)}
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-line px-4 py-3 font-mono text-sm transition-colors hover:border-brand hover:text-brand"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
              <ArrowUpRightIcon className="h-3.5 w-3.5 opacity-60" />
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center rounded-sm border border-line px-3.5 py-3 transition-colors hover:border-brand hover:text-brand"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.dl
            {...rise(0.4)}
            className="mt-12 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-sm border border-line bg-line"
          >
            {profile.stats.map((stat) => (
              <div key={stat.value} className="bg-surface px-4 py-4">
                <dd className="font-mono text-2xl font-semibold text-brand tabular-nums">
                  {stat.value}
                </dd>
                <dt className="mt-1 font-mono text-[10.5px] leading-tight tracking-wide text-muted uppercase">
                  {t(stat.label)}
                </dt>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div {...rise(0.25)} className="hidden justify-self-end lg:block">
          <div className="relative">
            <PortraitParticles src="/media/portrait.jpg" alt={t(ui.portraitAlt)} />
            <p className="mt-4 font-mono text-[11px] tracking-wide text-muted">
              <span className="text-brand">#</span> {t(ui.portraitHint)}
            </p>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
