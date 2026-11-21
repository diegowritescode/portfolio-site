'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import {
  experience,
  type HighlightId,
  highlights,
  practices,
  projects,
  stackGroups,
  ui,
} from '@/content';
import { useLang } from '@/lang';
import { ApproachIcon, BriefcaseIcon, DocumentIcon, StackIcon, TrophyIcon } from './icons';

/** One drawn icon per highlight, so the circles read as a set. */
const ICONS: Record<HighlightId, (props: { className?: string }) => React.ReactElement> = {
  stack: StackIcon,
  approach: ApproachIcon,
  experience: BriefcaseIcon,
  awards: TrophyIcon,
  cv: DocumentIcon,
};

/**
 * The story highlights: circles that open a panel of existing content.
 * The panel is a dialog rather than a story player, because the content
 * is read rather than watched.
 */
export function HighlightsRail() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<HighlightId | null>(null);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);

    // Pin the body at its current offset so the page behind stays put.
    const y = window.scrollY;
    const { body } = document;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = 'fixed';
    body.style.top = `-${y}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, y);
    };
  }, [close, open]);

  const current = highlights.find((h) => h.id === open) ?? null;

  return (
    <>
      <ul
        aria-label={t(ui.highlightsLabel)}
        className="no-scrollbar flex gap-6 overflow-x-auto px-4 py-6 sm:px-6 md:gap-8 md:px-12"
      >
        {highlights.map((highlight) => {
          const Icon = ICONS[highlight.id];
          return (
            <li key={highlight.id} className="shrink-0">
              <button
                type="button"
                onClick={() => setOpen(highlight.id)}
                className="group flex w-[72px] flex-col items-center gap-1.5 md:w-[88px]"
              >
                {/* The ring lights up on hover, as an unseen story does. */}
                <span className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-line transition-colors group-hover:bg-transparent group-hover:[background:linear-gradient(45deg,var(--ring-from),var(--ring-via),var(--ring-to))] md:h-[80px] md:w-[80px]">
                  <span className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-page md:h-[76px] md:w-[76px]">
                    <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-surface-2 text-muted transition-colors group-hover:text-fg md:h-[72px] md:w-[72px]">
                      <Icon className="h-6 w-6 md:h-7 md:w-7" />
                    </span>
                  </span>
                </span>
                <span className="truncate text-xs text-fg-dim">{t(highlight.label)}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {current ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t(current.label)}
            onClick={close}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              onClick={(event) => event.stopPropagation()}
              className="flex max-h-[88dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-line bg-page sm:rounded-2xl"
              initial={reduced ? false : { y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduced ? undefined : { y: 16, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <h2 className="flex items-center gap-2.5 text-sm font-semibold text-fg">
                  {(() => {
                    const Icon = ICONS[current.id];
                    return <Icon className="h-[18px] w-[18px] text-muted" />;
                  })()}
                  {t(current.label)}
                </h2>
                <button
                  type="button"
                  onClick={close}
                  aria-label={t(ui.closeLabel)}
                  className="rounded-full px-2 py-1 text-xl leading-none text-muted transition-colors hover:text-fg"
                >
                  ✕
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
                <HighlightBody id={current.id} />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function HighlightBody({ id }: { id: HighlightId }) {
  const { t } = useLang();

  if (id === 'stack') {
    return (
      <div className="space-y-5">
        {stackGroups.map((group) => (
          <section key={group.title.en}>
            <h3 className="text-xs font-semibold tracking-wide text-muted uppercase">
              {t(group.title)}
            </h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-surface-2 px-3 py-1 text-[13px] text-fg-dim"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    );
  }

  if (id === 'approach') {
    return (
      <div className="space-y-5">
        {practices.map((practice) => (
          <section key={practice.title.en}>
            <h3 className="text-sm font-semibold text-fg">{t(practice.title)}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-dim">{t(practice.body)}</p>
          </section>
        ))}
      </div>
    );
  }

  if (id === 'experience') {
    return (
      <ol className="space-y-6">
        {experience.map((role) => (
          <li key={role.company} className="border-l-2 border-line pl-4">
            <p className="text-sm font-semibold text-fg">{role.company}</p>
            <p className="text-xs text-muted">
              {t(role.title)} · {t(role.period)}
            </p>
            {role.client ? <p className="mt-0.5 text-xs text-muted">{t(role.client)}</p> : null}
            <p className="mt-2 text-sm leading-relaxed text-fg-dim">{t(role.body)}</p>
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {role.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[12px] text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    );
  }

  if (id === 'awards') {
    const awarded = projects.filter((project) => project.award);
    return (
      <div className="space-y-5">
        {awarded.map((project) => (
          <section key={project.id}>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-fg">
              <span aria-hidden="true" className="text-award">
                ★
              </span>
              {project.name}
            </h3>
            {project.award ? <p className="mt-1 text-sm text-fg-dim">{t(project.award)}</p> : null}
            <ul className="mt-2 space-y-1.5">
              {project.metrics.map((metric) => (
                <li key={metric.value} className="text-sm text-fg-dim">
                  <span className="font-semibold text-fg">{metric.value}</span> {t(metric.label)}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    );
  }

  // The CV panel.
  return (
    <div className="space-y-4 text-sm leading-relaxed text-fg-dim">
      <p>
        {t({
          en: 'The full CV, as a PDF, in English or Spanish.',
          es: 'La hoja de vida completa, en PDF, en inglés o español.',
        })}
      </p>
      <div className="flex flex-wrap gap-2">
        <a
          href="/cv/Diego-Ramirez-CV-EN.pdf"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          CV — English
        </a>
        <a
          href="/cv/Diego-Ramirez-CV-ES.pdf"
          className="rounded-lg bg-surface-2 px-4 py-2 text-sm font-semibold text-fg transition-colors hover:bg-line"
        >
          CV — Español
        </a>
      </div>
    </div>
  );
}
