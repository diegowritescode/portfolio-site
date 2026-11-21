'use client';

import { type Project, ui } from '@/content';
import { useLang } from '@/lang';
import { ExternalLink } from './external-link';
import { ShotGallery } from './shot-gallery';
import { AwardIcon } from './icons';

export function ProjectCard({ project }: { project: Project }) {
  const { t, lang } = useLang();
  const [primary, ...rest] = project.links;

  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-name`}
      className="rounded-2xl border border-line bg-surface p-6 shadow-[0_1px_2px_rgba(15,21,34,0.04)] sm:p-8"
    >
      <div className="flex flex-wrap items-center gap-3">
        <h3 id={`${project.id}-name`} className="text-xl font-semibold tracking-tight">
          {project.name}
        </h3>
        {project.links.length > 0 ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-live-soft px-2.5 py-0.5 text-xs font-medium text-live">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-live" />
            {t(ui.liveLabel)}
          </span>
        ) : null}
        <span className="text-sm text-muted">{t(project.kind)}</span>
      </div>

      {project.award ? (
        <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-next-soft px-3 py-1.5 text-sm font-medium text-next">
          <AwardIcon className="h-4 w-4 shrink-0" />
          {t(project.award)}
        </p>
      ) : null}

      <p className="mt-4 text-lg leading-snug font-medium">{t(project.tagline)}</p>
      <p className="mt-3 text-muted">{t(project.summary)}</p>

      <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {project.metrics.map((metric) => (
          <div key={metric.value + t(metric.label)} className="rounded-xl bg-surface-2 px-4 py-3">
            <dt className="text-xs text-muted">{t(metric.label)}</dt>
            <dd className="mt-1 font-mono text-xl font-semibold tabular-nums">{metric.value}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-6 space-y-2.5">
        {project.highlights[lang].map((highlight) => (
          <li key={highlight} className="flex gap-3 text-[15px] leading-relaxed">
            <span aria-hidden="true" className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-brand" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      {project.shots ? (
        <ShotGallery shots={project.shots} label={`${project.name} — ${t(ui.screenshots)}`} />
      ) : null}

      <ul aria-label={`${project.name} ${t(ui.stackLabel)}`} className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li
            key={item}
            className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-muted"
          >
            {item}
          </li>
        ))}
      </ul>

      {project.links.length > 0 ? (
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

      {project.note ? <p className="mt-4 text-sm text-muted">{t(project.note)}</p> : null}
    </article>
  );
}
