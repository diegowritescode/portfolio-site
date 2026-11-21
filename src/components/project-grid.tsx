'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { type Project, projects, ui } from '@/content';
import { useLang } from '@/lang';
import { ArrowUpRightIcon, TrophyIcon } from './icons';

/**
 * The grid, three across as a profile is. A project with screenshots shows
 * its first one; a project without shows its headline number instead, so
 * every tile carries something true rather than a placeholder.
 *
 * Opening a tile opens the project, the way opening a post opens the post.
 */
export function ProjectGrid() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<string | null>(null);

  // Holds the offset while the body is pinned. A layout effect reads it
  // before the browser paints, so the document has not yet shortened and
  // window.scrollY has not been clamped.
  const scrollY = useRef(0);
  const close = useCallback(() => setOpen(null), []);
  const active = open === null ? null : (projects.find((p) => p.id === open) ?? null);

  useLayoutEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);

    const y = window.scrollY;
    scrollY.current = y;
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
      window.scrollTo(0, scrollY.current);
    };
  }, [active, close]);

  return (
    <>
      <ul className="grid grid-cols-3 gap-1 md:gap-2">
        {projects.map((project) => (
          <li key={project.id}>
            <button
              type="button"
              onClick={() => setOpen(project.id)}
              aria-label={`${t(ui.openProject)}: ${project.name}`}
              className="tile group block w-full text-left"
            >
              <ProjectTile project={project} />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.name}
            onClick={close}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              onClick={(event) => event.stopPropagation()}
              className="flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-line bg-page sm:rounded-2xl"
              initial={reduced ? false : { y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduced ? undefined : { y: 16, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <ProjectDetail project={active} onClose={close} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/**
 * One tile, composed rather than cropped: the project's own colour, its
 * name, its headline number, and — when it has one — the real screenshot
 * sitting at the bottom like a device on a desk. A raw screenshot scaled
 * into a 320px square is unreadable, so the tile carries the meaning and
 * the screenshot only has to suggest the product.
 */
function ProjectTile({ project }: { project: Project }) {
  const { t } = useLang();
  const cover = project.shots?.[0];
  const lead = project.metrics[0];

  return (
    <span
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{
        background: `linear-gradient(155deg, ${project.tint}1f 0%, ${project.tint}0a 45%, transparent 100%), var(--color-surface-2)`,
      }}
    >
      {/* The text block, always legible whatever the screenshot looks like. */}
      <span className="relative z-10 flex flex-col gap-1 p-3 sm:p-4">
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: project.tint }}
          />
          <span className="truncate text-[11px] font-semibold tracking-[0.1em] text-muted uppercase sm:text-[12px]">
            {project.name}
          </span>
          {project.award ? (
            <TrophyIcon className="ml-auto h-3.5 w-3.5 shrink-0 text-award" />
          ) : null}
        </span>

        <span className="text-[clamp(1.1rem,3.4vw,1.9rem)] leading-none font-semibold tracking-tight text-fg tabular-nums">
          {lead?.value}
        </span>
        <span className="line-clamp-2 text-[10px] leading-tight text-muted sm:text-[11px]">
          {lead ? t(lead.label) : null}
        </span>
      </span>

      {/* The screenshot, held at the bottom and scaled so the product is
          recognisable as a shape rather than read as text. */}
      {cover ? (
        <span className="relative mt-auto block h-[52%] w-[84%] self-center overflow-hidden rounded-t-md border border-b-0 border-line/80 bg-page shadow-[0_-2px_14px_-4px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:-translate-y-0.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover.src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        </span>
      ) : null}

      {/* The hover plate. */}
      <span className="tile-overlay z-20 px-3">
        <span className="flex flex-col items-center gap-0.5 text-center">
          <span className="text-sm font-semibold sm:text-base">{project.name}</span>
          <span className="hidden text-[11px] opacity-85 sm:block">{t(project.kind)}</span>
        </span>
      </span>
    </span>
  );
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t, lang } = useLang();
  const shots = project.shots ?? [];

  return (
    <>
      {/* The post header, as a profile row above the content. */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span
          aria-hidden="true"
          className="story-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-full p-[2px]"
        >
          <span className="flex h-full w-full items-center justify-center rounded-full bg-page text-[11px] font-semibold text-fg">
            {project.name.slice(0, 2).toUpperCase()}
          </span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-fg">{project.name}</p>
          <p className="truncate text-xs text-muted">{t(project.kind)}</p>
        </div>
        {project.award ? (
          <span className="shrink-0 rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-award">
            ★ {t(ui.awardLabel)}
          </span>
        ) : null}
        <button
          type="button"
          onClick={onClose}
          aria-label={t(ui.closeLabel)}
          className="shrink-0 rounded-full px-2 py-1 text-xl leading-none text-muted transition-colors hover:text-fg"
        >
          ✕
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {/* The screenshots, scrolled across like a carousel. */}
        {shots.length > 0 ? (
          <ul className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto bg-surface-2">
            {shots.map((shot) => (
              <li key={shot.src} className="w-full shrink-0 snap-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={t(shot.alt)}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[52dvh] w-full object-contain"
                />
              </li>
            ))}
          </ul>
        ) : null}

        <div className="space-y-5 px-4 py-5">
          <p className="text-[15px] leading-snug font-medium text-fg">{t(project.tagline)}</p>

          {/* The numbers, on one rule, as a post's counts would be. */}
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {project.metrics.map((metric) => (
              <div key={metric.value} className="bg-page px-3 py-3 text-center">
                <dd className="text-base font-semibold text-fg tabular-nums">{metric.value}</dd>
                <dt className="mt-0.5 text-[11px] leading-tight text-muted">{t(metric.label)}</dt>
              </div>
            ))}
          </dl>

          <p className="text-sm leading-relaxed text-fg-dim">{t(project.summary)}</p>

          <ul className="space-y-2">
            {project.highlights[lang].map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-fg-dim">
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand"
                />
                {item}
              </li>
            ))}
          </ul>

          {/* The stack, as the hashtags under a caption. */}
          <p className="flex flex-wrap gap-x-2 gap-y-1 text-[13px] leading-relaxed text-brand">
            {project.stack.map((item) => (
              <span key={item}>#{item.replace(/[\s./]/g, '')}</span>
            ))}
          </p>

          {project.links.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-surface-2 px-3.5 py-2 text-[13px] font-medium text-fg transition-colors hover:bg-line"
                >
                  {t(link.label)}
                  <ArrowUpRightIcon className="h-3 w-3 opacity-60" />
                </a>
              ))}
            </div>
          ) : null}

          {project.note ? (
            <p className="border-t border-line pt-4 text-xs leading-relaxed text-muted">
              {t(project.note)}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
