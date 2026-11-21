'use client';

import { type Project, ui } from '@/content';
import { useLang } from '@/lang';
import { ExternalLink } from './external-link';
import { ShotGallery } from './shot-gallery';
import { AwardIcon } from './icons';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, lang } = useLang();
  const [primary, ...rest] = project.links;
  const live = project.links.length > 0;

  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-name`}
      className="panel group relative rounded-sm transition-colors"
    >
      {/* Title bar: the project reads as a window in the system. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line px-5 py-3 sm:px-7">
        <span className="font-mono text-[11px] text-muted tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 id={`${project.id}-name`} className="font-mono text-base font-semibold tracking-tight">
          {project.name}
        </h3>
        {live ? (
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-live-soft px-2 py-0.5 font-mono text-[10.5px] tracking-wide text-live uppercase">
            <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-live" />
            {t(ui.liveLabel)}
          </span>
        ) : null}
        <span className="ml-auto font-mono text-[11px] text-muted">{t(project.kind)}</span>
      </div>

      <div className="px-5 py-6 sm:px-7 sm:py-7">
        {project.award ? (
          <p className="mb-5 inline-flex items-center gap-2 rounded-sm border border-amber/30 bg-next-soft px-3 py-1.5 font-mono text-[11.5px] text-next">
            <AwardIcon className="h-3.5 w-3.5 shrink-0" />
            {t(project.award)}
          </p>
        ) : null}

        <p className="max-w-2xl text-xl leading-snug font-medium text-balance">
          {t(project.tagline)}
        </p>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-dim">
          {t(project.summary)}
        </p>

        <dl className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-line bg-line">
          {project.metrics.map((metric) => (
            <div key={metric.value + t(metric.label)} className="bg-surface-2 px-3 py-3.5">
              <dd className="font-mono text-lg font-semibold text-brand tabular-nums">
                {metric.value}
              </dd>
              <dt className="mt-0.5 font-mono text-[10px] leading-tight tracking-wide text-muted uppercase">
                {t(metric.label)}
              </dt>
            </div>
          ))}
        </dl>

        {/* Two highlights, not four: the rest lives in the repository. */}
        <ul className="mt-6 space-y-3">
          {project.highlights[lang].slice(0, 2).map((highlight) => (
            <li key={highlight} className="flex gap-3 text-[14.5px] leading-relaxed text-fg-dim">
              <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-brand-dim" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {project.shots ? (
          <ShotGallery shots={project.shots} label={`${project.name} — ${t(ui.screenshots)}`} />
        ) : null}

        <ul
          aria-label={`${project.name} ${t(ui.stackLabel)}`}
          className="mt-6 flex flex-wrap gap-1.5"
        >
          {project.stack.map((item) => (
            <li key={item} className="font-mono text-[11px] text-muted">
              <span className="text-brand-dim">/</span> {item}
            </li>
          ))}
        </ul>

        {live ? (
          <div className="mt-7 flex flex-wrap gap-2.5">
            {primary ? (
              <ExternalLink href={primary.href} variant="primary">
                {t(primary.label)}
              </ExternalLink>
            ) : null}
            {rest.map((link) => (
              <ExternalLink key={link.href} href={link.href}>
                {t(link.label)}
              </ExternalLink>
            ))}
          </div>
        ) : null}

        {project.note ? (
          <p className="mt-4 font-mono text-[11.5px] text-muted">{t(project.note)}</p>
        ) : null}
      </div>
    </article>
  );
}
