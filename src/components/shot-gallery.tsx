'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { type Shot, ui } from '@/content';
import { useLang } from '@/lang';

/** Thumbnails that open one screenshot at a time in a dialog. */
export function ShotGallery({ shots, label }: { shots: readonly Shot[]; label: string }) {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const active = open === null ? null : (shots[open] ?? null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % shots.length));
      if (event.key === 'ArrowLeft')
        setOpen((i) => (i === null ? i : (i - 1 + shots.length) % shots.length));
    };
    document.addEventListener('keydown', onKey);

    // Lock the page without losing the scroll position: fixing the body to
    // the current offset keeps the background still and restores it exactly.
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
  }, [close, open, shots.length]);

  return (
    <>
      <ul aria-label={label} className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {shots.map((shot, i) => (
          <li key={shot.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full overflow-hidden rounded-lg border border-line bg-surface-2 transition-colors hover:border-brand"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={t(shot.alt)}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && open !== null ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t(active.alt)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={close}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.figure
              className="flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-sm border border-line bg-surface"
              onClick={(event) => event.stopPropagation()}
              initial={reduced ? false : { scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduced ? undefined : { scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
                <span className="font-mono text-[11.5px] text-muted tabular-nums">
                  {open + 1} / {shots.length}
                </span>
                <div className="ml-auto flex items-center gap-1.5">
                  {shots.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setOpen((i) => ((i ?? 0) - 1 + shots.length) % shots.length)}
                        aria-label={t(ui.prevImage)}
                        className="rounded-sm border border-line px-2.5 py-1 font-mono text-xs transition-colors hover:border-brand hover:text-brand"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpen((i) => ((i ?? 0) + 1) % shots.length)}
                        aria-label={t(ui.nextImage)}
                        className="rounded-sm border border-line px-2.5 py-1 font-mono text-xs transition-colors hover:border-brand hover:text-brand"
                      >
                        →
                      </button>
                    </>
                  ) : null}
                  <button
                    type="button"
                    onClick={close}
                    aria-label={t(ui.closeImage)}
                    className="rounded-sm border border-line px-2.5 py-1 font-mono text-xs transition-colors hover:border-brand hover:text-brand"
                  >
                    ✕ Esc
                  </button>
                </div>
              </div>

              {/* The image scrolls inside the dialog when it is taller than
                  the viewport, so nothing is ever cut off. */}
              <div className="min-h-0 flex-1 overflow-auto overscroll-contain">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.src} alt={t(active.alt)} className="w-full" />
              </div>

              <figcaption className="border-t border-line px-4 py-3 text-sm text-fg-dim">
                {t(active.alt)}
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
