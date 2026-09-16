import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface ProjectPreviewProps {
  title: string;
  images?: string[];
}

function ProjectPreview({ title, images = [] }: ProjectPreviewProps) {
  const previewRefs = useRef<HTMLElement[]>([]);
  const visualRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const previews = previewRefs.current;
    const visuals = visualRefs.current;

    if (previews.length === 0 || visuals.length === 0) {
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

    const cleanups = previews.map((preview, index) => {
      const visual = visuals[index];

      if (!visual) {
        return () => {};
      }

      const handlePointerMove = (event: PointerEvent) => {
        const bounds = preview.getBoundingClientRect();

        const x = (event.clientX - bounds.left) / bounds.width - 0.5;

        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        gsap.to(visual, {
          x: x * 10,
          y: y * 7,
          duration: 0.7,
          ease: "power3.out",
          overwrite: true,
        });
      };

      const handlePointerLeave = () => {
        gsap.to(visual, {
          x: 0,
          y: 0,
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
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [images]);

  if (images.length === 0) {
    return (
      <div
        aria-label={`${title} project preview`}
        className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-surface"
      >
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Project Preview
            </p>

            <p className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div aria-label={`${title} project screenshots`} className="grid gap-8">
      {images.map((image, index) => (
        <figure
          key={image}
          ref={(element) => {
            if (element) {
              previewRefs.current[index] = element;
            }
          }}
          className="group overflow-hidden rounded-2xl border border-border bg-background perspective-[1000px]"
        >
          <div
            ref={(element) => {
              if (element) {
                visualRefs.current[index] = element;
              }
            }}
            className="will-change-transform"
          >
            <img
              src={image}
              alt={`${title} screenshot ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
              className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />
          </div>
        </figure>
      ))}
    </div>
  );
}

export default ProjectPreview;
