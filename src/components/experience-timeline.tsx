'use client';

import { experience } from '@/content';
import { useLang } from '@/lang';
import { Reveal } from './reveal';

export function ExperienceTimeline() {
  const { t } = useLang();
  return (
    <ol className="relative space-y-8 border-l border-line pl-6 sm:pl-8">
      {experience.map((role, i) => (
        <Reveal key={role.company} as="li" delay={i * 0.06} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-[1.9rem] h-2.5 w-2.5 rounded-full border-2 border-page bg-brand sm:-left-[2.4rem]"
          />
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-lg font-semibold tracking-tight">{t(role.title)}</h3>
            <span className="text-muted">·</span>
            <span className="font-medium">{role.company}</span>
          </div>
          <p className="mt-1 font-mono text-xs text-muted">{t(role.period)}</p>
          {role.client ? <p className="mt-1 text-sm text-muted">{t(role.client)}</p> : null}
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{t(role.body)}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {role.stack.map((item) => (
              <li
                key={item}
                className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </ol>
  );
}
