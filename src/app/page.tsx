'use client';

import {
  contact,
  EMAIL,
  GITHUB,
  LINKEDIN,
  nav,
  practices,
  profile,
  projects,
  roadmap,
  roadmapStatusLabel,
  type RoadmapStatus,
  ui,
} from '@/content';
import { useLang } from '@/lang';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { Hero } from '@/components/hero';
import { LangSwitch } from '@/components/lang-switch';
import { MailIcon } from '@/components/icons';
import { ProjectCard } from '@/components/project-card';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/section';

const statusStyles: Record<RoadmapStatus, string> = {
  Live: 'bg-live-soft text-live',
  Next: 'bg-next-soft text-next',
  Planned: 'bg-surface-2 text-muted',
};

const linkBase =
  'inline-flex items-center gap-2 rounded-sm border border-line px-4 py-2.5 font-mono text-sm transition-colors hover:border-brand hover:text-brand';

const copy = {
  workEyebrow: { en: 'Work', es: 'Proyectos' },
  workTitle: {
    en: 'Four systems, built to be operated',
    es: 'Cuatro sistemas, construidos para operarse',
  },
  workIntro: {
    en: 'A multi-tenant SaaS I run in production, an authorization platform, the ledger that authorizes through it, and a hackathon winner. Open them, sign in with the demo account, and read the decisions behind them.',
    es: 'Un SaaS multi-tenant que opero en producción, una plataforma de autorización, el libro contable que autoriza a través de ella, y un ganador de hackathon. Ábrelos, entra con la cuenta de demostración y lee las decisiones detrás.',
  },
  expEyebrow: { en: 'Experience', es: 'Experiencia' },
  expTitle: { en: 'Where this came from', es: 'De dónde viene esto' },
  expIntro: {
    en: 'Three years across a regulated bank, a marketing agency, a bootcamp that became a job, and my own company.',
    es: 'Tres años entre un banco regulado, una agencia de marketing, un bootcamp que se volvió trabajo, y mi propia empresa.',
  },
  approachEyebrow: { en: 'Approach', es: 'Método' },
  approachTitle: { en: 'How these are built', es: 'Cómo están construidos' },
  approachIntro: {
    en: 'The same bar applies to every project, and the repositories show the evidence.',
    es: 'El mismo estándar aplica a cada proyecto, y los repositorios muestran la evidencia.',
  },
  roadmapEyebrow: { en: 'Roadmap', es: 'Ruta' },
  roadmapTitle: { en: 'What comes next', es: 'Qué sigue' },
  roadmapIntro: {
    en: 'Each system reuses the foundations of the previous one.',
    es: 'Cada sistema reutiliza los cimientos del anterior.',
  },
  footerNote: {
    en: 'Static site served by nginx behind Traefik.',
    es: 'Sitio estático servido por nginx detrás de Traefik.',
  },
  footerSource: { en: 'Source', es: 'Código' },
} as const;

export default function Page() {
  const { t, lang } = useLang();

  return (
    <>
      <div className="sticky top-0 z-40 border-b border-line bg-page/80 backdrop-blur-md">
        <nav
          aria-label={t(nav.work)}
          className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
        >
          <a href="#main" className="font-mono text-sm font-semibold tracking-tight">
            <span className="text-brand">~/</span>
            {profile.name.toLowerCase().replace(' ', '-')}
          </a>
          <div className="flex items-center gap-1 sm:gap-3">
            <div className="hidden items-center gap-5 font-mono text-[13px] text-muted sm:flex">
              <a href="#work" className="transition-colors hover:text-brand">
                {t(nav.work)}
              </a>
              <a href="#experience" className="transition-colors hover:text-brand">
                {t(nav.experience)}
              </a>
              <a href="#approach" className="transition-colors hover:text-brand">
                {t(nav.approach)}
              </a>
              <a href="#contact" className="transition-colors hover:text-brand">
                {t(nav.contact)}
              </a>
            </div>
            <LangSwitch />
          </div>
        </nav>
      </div>

      <Hero />

      <main id="main" className="mx-auto max-w-5xl px-4 sm:px-6">
        <Section
          id="work"
          eyebrow={t(copy.workEyebrow)}
          title={t(copy.workTitle)}
          intro={t(copy.workIntro)}
        >
          <div className="space-y-6">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.04}>
                <ProjectCard project={project} index={i} />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="experience"
          eyebrow={t(copy.expEyebrow)}
          title={t(copy.expTitle)}
          intro={t(copy.expIntro)}
        >
          <ExperienceTimeline />
        </Section>

        <Section
          id="approach"
          eyebrow={t(copy.approachEyebrow)}
          title={t(copy.approachTitle)}
          intro={t(copy.approachIntro)}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {practices.map((practice, i) => (
              <Reveal key={practice.title.en} delay={i * 0.05}>
                <div className="panel h-full rounded-sm p-6">
                  <h3 className="font-mono text-[15px] font-semibold tracking-tight text-brand">
                    {t(practice.title)}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-fg-dim">
                    {t(practice.body)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="roadmap"
          eyebrow={t(copy.roadmapEyebrow)}
          title={t(copy.roadmapTitle)}
          intro={t(copy.roadmapIntro)}
        >
          <ol className="relative space-y-6 border-l border-line pl-6">
            {roadmap.map((item, i) => (
              <Reveal key={item.name} as="li" delay={i * 0.04} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 -left-[29px] h-2.5 w-2.5 rounded-full ring-4 ring-page ${
                    item.status === 'Live'
                      ? 'bg-live'
                      : item.status === 'Next'
                        ? 'bg-next'
                        : 'bg-line-strong'
                  }`}
                />
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-mono font-semibold tracking-tight">{item.name}</h3>
                  <span
                    className={`rounded-sm px-2 py-0.5 font-mono text-[10.5px] tracking-wide uppercase ${statusStyles[item.status]}`}
                  >
                    {t(roadmapStatusLabel[item.status])}
                  </span>
                </div>
                <p className="mt-1.5 text-[14.5px] text-fg-dim">{t(item.body)}</p>
              </Reveal>
            ))}
          </ol>
        </Section>

        <Section id="contact" eyebrow={t(nav.contact)} title={t(contact.heading)}>
          <Reveal>
            <div className="panel rounded-sm p-6 sm:p-8">
              <p className="max-w-xl text-fg-dim">{t(contact.body)}</p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <a
                  href={`mailto:${EMAIL}`}
                  className="glow-box inline-flex items-center gap-2 rounded-sm bg-brand px-4 py-2.5 font-mono text-sm font-semibold text-page transition-colors hover:bg-brand-strong"
                >
                  <MailIcon className="h-4 w-4" />
                  {EMAIL}
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkBase}
                >
                  LinkedIn
                </a>
                <a
                  href={lang === 'es' ? '/cv/Diego-Ramirez-CV-ES.pdf' : '/cv/Diego-Ramirez-CV-EN.pdf'}
                  download
                  className={linkBase}
                >
                  {t(ui.downloadCv)} (PDF)
                </a>
              </div>
              <p className="mt-6 font-mono text-[11.5px] text-muted">
                {t(profile.availability)} · {t(profile.location)}
              </p>
            </div>
          </Reveal>
        </Section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>
            {t(copy.footerNote)}{' '}
            <a
              href={`${GITHUB}/portfolio-site`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line-strong underline-offset-4 hover:text-fg"
            >
              {t(copy.footerSource)}
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
