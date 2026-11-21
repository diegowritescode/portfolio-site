'use client';

import { experience } from '@/content';
import { useLang } from '@/lang';
import { Reveal } from './reveal';

export function ExperienceTimeline() {
  const { t } = useLang();
  return (
    <ol className="relative space-y-10 border-l border-line pl-6 sm:pl-8">
      {experience.map((role, i) => (
        <Reveal key={role.company} as="li" delay={i * 0.06} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-2 -left-[1.78rem] h-2 w-2 rounded-sm bg-brand sm:-left-[2.28rem]"
          />
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-mono text-[15px] font-semibold tracking-tight text-brand">
              {t(role.title)}
            </h3>
            <span className="text-muted">·</span>
            <span className="font-mono text-[15px] font-medium">{role.company}</span>
          </div>
          <p className="mt-1.5 font-mono text-[11.5px] tracking-wide text-muted">
            {t(role.period)}
          </p>
          {role.client ? (
            <p className="mt-1 font-mono text-[11.5px] text-muted">{t(role.client)}</p>
          ) : null}
          <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-fg-dim">{t(role.body)}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {role.stack.map((item) => (
              <li key={item} className="font-mono text-[11px] text-muted">
                <span className="text-brand-dim">/</span> {item}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </ol>
  );
}
