import type { Project } from '@/content';
import { ExternalLink } from './external-link';

export function ProjectCard({ project }: { project: Project }) {
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
        <span className="inline-flex items-center gap-1.5 rounded-full bg-live-soft px-2.5 py-0.5 text-xs font-medium text-live">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-live" />
          Live
        </span>
        <span className="text-sm text-muted">{project.kind}</span>
      </div>

      <p className="mt-4 text-lg leading-snug font-medium">{project.tagline}</p>
      <p className="mt-3 text-muted">{project.summary}</p>

      <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl bg-surface-2 px-4 py-3">
            <dt className="text-xs text-muted">{metric.label}</dt>
            <dd className="mt-1 font-mono text-xl font-semibold tabular-nums">{metric.value}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-6 space-y-2.5">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-3 text-[15px] leading-relaxed">
            <span aria-hidden="true" className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-brand" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <ul aria-label={`${project.name} stack`} className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li
            key={item}
            className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-muted"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap gap-2.5">
        {primary ? (
          <ExternalLink href={primary.href} variant="primary">
            {primary.label}
          </ExternalLink>
        ) : null}
        {rest.map((link) => (
          <ExternalLink key={link.href} href={link.href}>
            {link.label}
          </ExternalLink>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">{project.note}</p>
    </article>
  );
}
