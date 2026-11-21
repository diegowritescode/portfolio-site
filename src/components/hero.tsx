'use client';

import dynamic from 'next/dynamic';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { GITHUB, LINKEDIN, profile, ui } from '@/content';
import { useLang } from '@/lang';
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon } from './icons';

const HeroScene = dynamic(() => import('./hero-scene').then((m) => m.HeroScene), { ssr: false });

/** The lines the terminal types out, in order. */
const BOOT: readonly { readonly text: string; readonly tone: 'dim' | 'out' | 'ok' }[] = [
  { text: 'whoami', tone: 'dim' },
  { text: 'diego — software engineer · medellín, colombia', tone: 'out' },
  { text: 'systems --status', tone: 'dim' },
  { text: 'toque          multi-tenant saas      LIVE', tone: 'ok' },
  { text: 'accesscore     authz platform         LIVE', tone: 'ok' },
  { text: 'miniledger     double-entry ledger    LIVE', tone: 'ok' },
  { text: 'stack --top', tone: 'dim' },
  { text: 'typescript · node · react · postgres · java · .net', tone: 'out' },
];

function Terminal() {
  const [visible, setVisible] = useState(0);
  const [typed, setTyped] = useState('');
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(BOOT.length);
      return;
    }
    const current = BOOT[visible];
    if (!current) return;

    // Commands type character by character; their output appears at once.
    if (current.tone !== 'dim') {
      const id = setTimeout(() => setVisible((v) => v + 1), 260);
      return () => clearTimeout(id);
    }
    if (typed.length < current.text.length) {
      const id = setTimeout(() => setTyped(current.text.slice(0, typed.length + 1)), 38);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setVisible((v) => v + 1);
      setTyped('');
    }, 340);
    return () => clearTimeout(id);
  }, [reduced, typed, visible]);

  return (
    <div className="panel w-full max-w-md rounded-sm font-mono text-[12.5px] leading-[1.75] sm:text-[13px]">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="ml-1 text-[11px] text-muted">deviego.xyz — zsh</span>
      </div>
      <div className="min-h-[13.5rem] px-3 py-3">
        {BOOT.slice(0, visible).map((line, i) => (
          <p
            key={`${line.text}-${i}`}
            className={
              line.tone === 'dim'
                ? 'text-fg'
                : line.tone === 'ok'
                  ? 'text-brand'
                  : 'text-fg-dim'
            }
          >
            {line.tone === 'dim' ? <span className="text-brand">$ </span> : null}
            {line.text}
          </p>
        ))}
        {visible < BOOT.length && BOOT[visible]?.tone === 'dim' ? (
          <p className="text-fg">
            <span className="text-brand">$ </span>
            <span className="caret">{typed}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}

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
          <Terminal />
        </motion.div>
      </div>
    </header>
  );
}
