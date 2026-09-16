interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent sm:text-sm">
        {eyebrow}
      </p>

      <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
