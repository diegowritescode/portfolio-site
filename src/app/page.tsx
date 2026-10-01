import { ExternalLink } from '@/components/external-link';
import { GitHubIcon } from '@/components/icons';
import { ProjectCard } from '@/components/project-card';
import { Section } from '@/components/section';
import { GITHUB, practices, profile, projects, roadmap, type RoadmapStatus } from '@/content';

const nav = [
  { href: '#work', label: 'Work' },
  { href: '#approach', label: 'Approach' },
  { href: '#roadmap', label: 'Roadmap' },
];

const statusStyles: Record<RoadmapStatus, string> = {
  Live: 'bg-live-soft text-live',
  Next: 'bg-next-soft text-next',
  Planned: 'bg-surface-2 text-muted',
};

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-page/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="font-semibold tracking-tight">
            {profile.name}
          </a>
          <nav aria-label="Sections" className="flex items-center gap-1 sm:gap-2">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hidden rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors hover:text-fg sm:inline-block"
              >
                {item.label}
              </a>
            ))}
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors hover:text-fg"
            >
              <GitHubIcon className="h-4 w-4" />
              <span>GitHub</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </nav>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-5xl px-4 sm:px-6">
        <section id="top" aria-labelledby="hero-title" className="pt-16 pb-10 sm:pt-24">
          <p className="text-sm text-muted">
            {profile.role} · {profile.location}
          </p>
          <h1
            id="hero-title"
            className="mt-4 max-w-3xl text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl"
          >
            {profile.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{profile.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex items-center rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-strong"
            >
              See the work
            </a>
            <ExternalLink href={GITHUB}>GitHub profile</ExternalLink>
          </div>
        </section>

        <Section
          id="work"
          eyebrow="Work"
          title="Two systems, both running in production"
          intro="Built as one spine: MiniLedger authorizes every write through AccessCore, the way a real platform grows. Open them, sign in with the demo account, and read the decisions behind them."
        >
          <div className="space-y-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Section>

        <Section
          id="approach"
          eyebrow="Approach"
          title="How these are built"
          intro="The same bar applies to every project, and the repositories show the evidence."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {practices.map((practice) => (
              <div key={practice.title} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-semibold tracking-tight">{practice.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{practice.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="roadmap"
          eyebrow="Roadmap"
          title="What comes next"
          intro="Each system reuses the foundations of the previous one."
        >
          <ol className="relative space-y-6 border-l border-line pl-6">
            {roadmap.map((item) => (
              <li key={item.name} className="relative">
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
                  <h3 className="font-semibold tracking-tight">{item.name}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="mt-1 text-[15px] text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </Section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>
            Static site served by nginx behind Traefik.{' '}
            <a
              href={`${GITHUB}/portfolio-site`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line-strong underline-offset-4 hover:text-fg"
            >
              Source
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
