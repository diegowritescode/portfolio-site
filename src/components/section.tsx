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
    <section id={id} aria-labelledby={`${id}-title`} className="py-16 sm:py-20">
      <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">{eyebrow}</p>
      <h2 id={`${id}-title`} className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {intro ? <p className="mt-3 max-w-2xl text-muted">{intro}</p> : null}
      <div className="mt-10">{children}</div>
    </section>
  );
}
