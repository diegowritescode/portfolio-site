'use client';

import { useState } from 'react';
import { about, contact, EMAIL, GITHUB, LINKEDIN, profile, ui } from '@/content';
import { useLang } from '@/lang';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { HighlightsRail } from '@/components/highlights-rail';
import { LangSwitch } from '@/components/lang-switch';
import {
  ApproachIcon,
  BriefcaseIcon,
  GridIcon,
  MailIcon,
  MountainIcon,
  PersonIcon,
  StackIcon,
} from '@/components/icons';
import { ProfileHeader } from '@/components/profile-header';
import { ProjectGrid } from '@/components/project-grid';
import { ThemeToggle } from '@/components/theme-toggle';

/** One icon per block of the personal section. */
const ABOUT_ICONS: Record<string, (props: { className?: string }) => React.ReactElement> = {
  mountain: MountainIcon,
  approach: ApproachIcon,
  stack: StackIcon,
  person: PersonIcon,
};

type Tab = 'projects' | 'experience' | 'about';

const copy = {
  footerNote: {
    en: 'Static site served by nginx behind Traefik.',
    es: 'Sitio estático servido por nginx detrás de Traefik.',
  },
  footerSource: { en: 'Source', es: 'Código' },
} as const;

export default function Page() {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>('projects');

  const tabs: readonly {
    readonly id: Tab;
    readonly label: string;
    readonly Icon: (props: { className?: string }) => React.ReactElement;
  }[] = [
    { id: 'projects', label: t(ui.tabProjects), Icon: GridIcon },
    { id: 'experience', label: t(ui.tabExperience), Icon: BriefcaseIcon },
    { id: 'about', label: t(ui.tabAbout), Icon: PersonIcon },
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
                  // The label is hidden on a phone, so the name is given here.
                  aria-label={item.label}
                  aria-controls={`panel-${item.id}`}
                  id={`tab-${item.id}`}
                  onClick={() => setTab(item.id)}
                  className={`-mt-px flex flex-1 items-center justify-center gap-1.5 border-t px-3 py-3 text-xs font-semibold tracking-[0.08em] uppercase transition-colors md:flex-none md:py-3.5 ${
                    selected
                      ? 'border-fg text-fg'
                      : 'border-transparent text-muted hover:text-fg-dim'
                  }`}
                >
                  <item.Icon className="h-[22px] w-[22px] md:h-[13px] md:w-[13px]" />
                  {/* The app shows icons only on a phone, labels on desktop. */}
                  <span className="hidden md:inline">{item.label}</span>
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
              className="mx-auto max-w-2xl space-y-9 px-4 py-8 sm:px-6"
            >
              <section>
                <h2 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                  {t(about.heading)}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-dim">{t(about.lead)}</p>
              </section>

              {about.blocks.map((block) => {
                const Icon = ABOUT_ICONS[block.icon] ?? PersonIcon;
                return (
                  <section key={block.title.en} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[15px] font-semibold text-fg">{t(block.title)}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-fg-dim">
                        {t(block.body)}
                      </p>
                    </div>
                  </section>
                );
              })}

              <section id="contact" className="border-t border-line pt-7">
                <h2 className="text-[15px] font-semibold text-fg">{t(contact.heading)}</h2>
                <p className="mt-1.5 text-[15px] leading-relaxed text-fg-dim">{t(contact.body)}</p>
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
