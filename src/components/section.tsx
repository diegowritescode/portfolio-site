import { Reveal } from './reveal';

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative py-20 sm:py-28">
      <Reveal>
        <div className="flex items-center gap-4">
          <p className="prompt font-mono text-xs tracking-[0.18em] text-muted uppercase">
            {eyebrow}
          </p>
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
        </div>
        <h2
          id={`${id}-title`}
          className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
        >
          {title}
        </h2>
        {intro ? <p className="mt-4 max-w-2xl text-fg-dim">{intro}</p> : null}
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}
