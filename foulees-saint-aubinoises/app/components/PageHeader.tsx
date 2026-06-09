export function PageHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div style={{ marginBottom: "3rem", flexShrink: 0 }}>
      <p className="font-barlow-condensed uppercase text-fsa-rose tracking-[0.2em] text-base md:text-3xl mb-2">
        {label}
      </p>
      <div className="flex items-baseline gap-6 flex-wrap">
        <h1 className="font-bebas text-5xl md:text-6xl lg:text-[4rem] text-white leading-none">
          {title}
        </h1>
        <p className="font-barlow text-base md:text-xl lg: text-2xl text-white/35">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
