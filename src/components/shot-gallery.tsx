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
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
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
        {active ? (
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
              className="max-h-full w-full max-w-5xl overflow-hidden rounded-xl bg-surface"
              onClick={(event) => event.stopPropagation()}
              initial={reduced ? false : { scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduced ? undefined : { scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.src}
                alt={t(active.alt)}
                className="max-h-[78vh] w-full object-contain"
              />
              <figcaption className="flex items-center justify-between gap-4 border-t border-line px-4 py-3 text-sm text-muted">
                <span>{t(active.alt)}</span>
                <button
                  type="button"
                  onClick={close}
                  className="shrink-0 rounded-md border border-line px-2.5 py-1 text-xs font-medium text-fg hover:bg-surface-2"
                >
                  {t(ui.closeImage)}
                </button>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
