'use client';

import { useState } from 'react';
import {
  contact,
  EMAIL,
  GITHUB,
  LINKEDIN,
  practices,
  profile,
  roadmap,
  roadmapStatusLabel,
  type RoadmapStatus,
  ui,
} from '@/content';
import { useLang } from '@/lang';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { HighlightsRail } from '@/components/highlights-rail';
import { LangSwitch } from '@/components/lang-switch';
import { MailIcon } from '@/components/icons';
import { ProfileHeader } from '@/components/profile-header';
import { ProjectGrid } from '@/components/project-grid';
import { ThemeToggle } from '@/components/theme-toggle';

const statusStyles: Record<RoadmapStatus, string> = {
  Live: 'bg-surface-2 text-live',
  Next: 'bg-surface-2 text-award',
  Planned: 'bg-surface-2 text-muted',
};

type Tab = 'projects' | 'experience' | 'about';

const copy = {
  roadmapTitle: { en: 'What comes next', es: 'Qué sigue' },
  footerNote: {
    en: 'Static site served by nginx behind Traefik.',
    es: 'Sitio estático servido por nginx detrás de Traefik.',
  },
  footerSource: { en: 'Source', es: 'Código' },
} as const;

export default function Page() {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>('projects');

  const tabs: readonly { readonly id: Tab; readonly label: string; readonly glyph: string }[] = [
    { id: 'projects', label: t(ui.tabProjects), glyph: '▦' },
    { id: 'experience', label: t(ui.tabExperience), glyph: '▤' },
    { id: 'about', label: t(ui.tabAbout), glyph: '☰' },
  ];

  return (
    <>
      {/* The top bar: the handle on the left, the controls on the right. */}
      <div className="sticky top-0 z-40 border-b border-line bg-page/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[975px] items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          <a href="#main" className="text-lg font-semibold tracking-tight text-fg">
            {profile.handle}
          </a>
          <div className="flex items-center gap-1">
            <LangSwitch />
            <ThemeToggle />
          </div>
        </div>
      </div>

      <main id="main" className="mx-auto max-w-[975px] pb-16">
        <ProfileHeader />
        <HighlightsRail />

        {/* The tab bar, on a rule, as a profile's is. */}
        <div className="border-t border-line">
          <div
            role="tablist"
            aria-label={t(ui.tabProjects)}
            className="flex items-center justify-around md:justify-center md:gap-14"
          >
            {tabs.map((item) => {
              const selected = tab === item.id;
              return (
                <button
                  key={item.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`panel-${item.id}`}
                  id={`tab-${item.id}`}
                  onClick={() => setTab(item.id)}
                  className={`-mt-px flex items-center gap-1.5 border-t px-3 py-3.5 text-xs font-semibold tracking-[0.08em] uppercase transition-colors ${
                    selected
                      ? 'border-fg text-fg'
                      : 'border-transparent text-muted hover:text-fg-dim'
                  }`}
                >
                  <span aria-hidden="true" className="text-sm">
                    {item.glyph}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-1 pt-1 md:px-0 md:pt-2">
          {tab === 'projects' ? (
            <div role="tabpanel" id="panel-projects" aria-labelledby="tab-projects">
              <ProjectGrid />
            </div>
          ) : null}

          {tab === 'experience' ? (
            <div
              role="tabpanel"
              id="panel-experience"
              aria-labelledby="tab-experience"
              className="px-3 py-6 sm:px-6"
            >
              <ExperienceTimeline />
            </div>
          ) : null}

          {tab === 'about' ? (
            <div
              role="tabpanel"
              id="panel-about"
              aria-labelledby="tab-about"
              className="space-y-10 px-3 py-6 sm:px-6"
            >
              <section className="space-y-5">
                {practices.map((practice) => (
                  <article key={practice.title.en}>
                    <h2 className="text-sm font-semibold text-fg">{t(practice.title)}</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-dim">
                      {t(practice.body)}
                    </p>
                  </article>
                ))}
              </section>

              <section>
                <h2 className="text-sm font-semibold text-fg">{t(copy.roadmapTitle)}</h2>
                <ul className="mt-3 space-y-2.5">
                  {roadmap.map((item) => (
                    <li key={item.name} className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${statusStyles[item.status]}`}
                      >
                        {t(roadmapStatusLabel[item.status])}
                      </span>
                      <span className="text-sm font-semibold text-fg">{item.name}</span>
                      <span className="w-full text-sm leading-relaxed text-fg-dim sm:w-auto sm:flex-1">
                        {t(item.body)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section id="contact">
                <h2 className="text-sm font-semibold text-fg">{t(contact.heading)}</h2>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-fg-dim">
                  {t(contact.body)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <MailIcon className="h-4 w-4" />
                    {EMAIL}
                  </a>
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-surface-2 px-4 py-2 text-sm font-semibold text-fg transition-colors hover:bg-line"
                  >
                    GitHub
                  </a>
                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-surface-2 px-4 py-2 text-sm font-semibold text-fg transition-colors hover:bg-line"
                  >
                    LinkedIn
                  </a>
                </div>
              </section>
            </div>
          ) : null}
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-[975px] px-4 py-8 text-xs text-muted sm:px-6">
          <p>
            © {new Date().getFullYear()} {profile.name}. {t(copy.footerNote)}{' '}
            <a
              href={`${GITHUB}/portfolio-site`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              {t(copy.footerSource)}
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
