import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { Link } from "react-router-dom";

import type { Project } from "../../data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const previewRef = useRef<HTMLDivElement | null>(null);

  const visualRef = useRef<HTMLDivElement | null>(null);

  const primaryImage = project.images?.[0];

  const visibleTechnologies = project.technologies.slice(0, 6);

  const remainingTechnologyCount = Math.max(
    project.technologies.length - visibleTechnologies.length,
    0,
  );

  useLayoutEffect(() => {
    const preview = previewRef.current;
    const visual = visualRef.current;

    if (!preview || !visual) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const hasHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    if (reduceMotion || !hasHover) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = preview.getBoundingClientRect();

      const x = (event.clientX - bounds.left) / bounds.width - 0.5;

      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      gsap.to(visual, {
        x: x * 12,
        y: y * 8,
        rotateX: y * -1.5,
        rotateY: x * 2,
        duration: 0.6,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const handlePointerLeave = () => {
      gsap.to(visual, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "power3.out",
        overwrite: true,
      });
    };

    preview.addEventListener("pointermove", handlePointerMove);

    preview.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      preview.removeEventListener("pointermove", handlePointerMove);

      preview.removeEventListener("pointerleave", handlePointerLeave);

      gsap.killTweensOf(visual);
    };
  }, []);

  return (
    <article className="group border-t border-border py-10 sm:py-12">
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`View ${project.title} case study`}
        className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
      >
        <div className="grid gap-8 md:grid-cols-[0.12fr_0.58fr_0.3fr] md:items-start md:gap-10">
          {/* Project number */}
          <div className="flex items-start justify-between md:block">
            <span className="font-mono text-sm tabular-nums text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="text-xs uppercase tracking-[0.16em] text-muted md:hidden">
              {project.year}
            </span>
          </div>

          {/* Project content */}
          <div>
            {/* Preview */}
            <div
              ref={previewRef}
              className="relative mb-8 aspect-[16/8] overflow-hidden rounded-2xl border border-border bg-background [perspective:800px]"
            >
              <div
                ref={visualRef}
                className="absolute inset-[-4%] will-change-transform"
              >
                {primaryImage ? (
                  <img
                    src={primaryImage}
                    alt={`${project.title} preview`}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-surface">
                    <div className="text-center">
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                        {project.category}
                      </p>

                      <p className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                        {project.title}
                      </p>
                    </div>
                  </div>
                )}

                {/* Image overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-70"
                />

                {/* Preview metadata */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-white drop-shadow-sm">
                    {project.category}
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/10 text-lg text-white backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-white/60">
                    ↗
                  </span>
                </div>
              </div>
            </div>

            {/* Project information */}
            <div>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h3 className="text-2xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-accent sm:text-3xl">
                  {project.title}
                </h3>

                <span className="hidden text-xs uppercase tracking-[0.16em] text-muted sm:inline">
                  {project.year}
                </span>
              </div>

              <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                {project.description}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="relative">
                  View case study
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                </span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap content-start gap-2 md:justify-end">
            {visibleTechnologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors duration-200 group-hover:border-foreground/20 group-hover:text-foreground"
              >
                {technology}
              </span>
            ))}

            {remainingTechnologyCount > 0 && (
              <span className="rounded-full border border-border px-3 py-1.5 text-xs text-muted">
                +{remainingTechnologyCount}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ProjectCard;
