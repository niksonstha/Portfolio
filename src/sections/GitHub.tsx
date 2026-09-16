import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import { githubProjects } from "../data/github";

gsap.registerPlugin(ScrollTrigger);

function GitHub() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const headingRef = useRef<HTMLDivElement | null>(null);

  const projectsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const projects = projectsRef.current;

    if (!section || !heading || !projects) {
      return;
    }

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        return;
      }

      const cards = Array.from(projects.children);

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
          defaults: {
            ease: "power3.out",
          },
        })
        .from(heading, {
          y: 35,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          cards,
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
          },
          "-=0.3",
        );
    }, section);

    return () => context.revert();
  }, []);

  const handlePointerEnter = (event: React.PointerEvent<HTMLElement>) => {
    gsap.to(event.currentTarget, {
      y: -5,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLElement>) => {
    gsap.to(event.currentTarget, {
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <section ref={sectionRef} id="github" className="border-t border-border">
      <Container>
        <div className="py-32 sm:py-40">
          <div ref={headingRef}>
            <SectionHeading
              eyebrow="GitHub"
              title="Code, experiments, and things I'm building."
              description="A selection of projects that represent how I approach frontend and full-stack development."
            />
          </div>

          <div ref={projectsRef} className="mt-20 grid gap-5 md:grid-cols-3">
            {githubProjects.map((project, index) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                aria-label={`${project.title} on GitHub (opens in a new tab)`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 outline-none transition-colors duration-300 hover:border-foreground/20 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tabular-nums text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-lg text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                  >
                    ↗
                  </span>
                </div>

                <h3 className="mt-10 text-xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-accent sm:text-2xl">
                  {project.title}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-6 text-muted">
                  {project.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-border px-3 py-1.5 text-xs text-muted"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12">
            <a
              href="https://github.com/niksonstha"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground outline-none transition-colors duration-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <span>View GitHub profile</span>

              <span
                aria-hidden="true"
                className="transition-transform duration-200 hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default GitHub;
