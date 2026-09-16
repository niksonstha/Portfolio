import { useLayoutEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "../components/ui/Container";
import ProjectPreview from "../components/projects/ProjectPreview";
import { projects } from "../data/projects";
import { createProjectCaseStudyAnimations } from "../animations/projectCaseStudyAnimations";

gsap.registerPlugin(ScrollTrigger);

function ProjectCaseStudy() {
  const { slug } = useParams<{ slug: string }>();

  const project = projects.find((item) => item.slug === slug);

  const pageRef = useRef<HTMLElement | null>(null);
  const backLinkRef = useRef<HTMLAnchorElement | null>(null);
  const categoryRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const contentSectionsRef = useRef<HTMLElement[]>([]);

  useLayoutEffect(() => {
    if (!project || !pageRef.current) {
      return;
    }

    contentSectionsRef.current = [];

    const context = gsap.context(() => {
      createProjectCaseStudyAnimations({
        backLink: backLinkRef.current,
        category: categoryRef.current,
        title: titleRef.current,
        description: descriptionRef.current,
        meta: metaRef.current,
        preview: previewRef.current,
        contentSections: contentSectionsRef.current,
      });
    }, pageRef);

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      window.clearTimeout(refreshTimer);
      context.revert();
    };
  }, [project]);

  if (!project) {
    return (
      <main className="min-h-screen">
        <Container>
          <div className="flex min-h-screen flex-col items-start justify-center">
            <p className="text-sm uppercase tracking-[0.2em] text-accent">
              Project
            </p>

            <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">
              Project not found.
            </h1>

            <Link
              to="/"
              className="mt-8 text-sm text-muted underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Back to home
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  const addContentSection = (element: HTMLElement | null) => {
    if (element && !contentSectionsRef.current.includes(element)) {
      contentSectionsRef.current.push(element);
    }
  };

  return (
    <main ref={pageRef} className="min-h-screen">
      <Container>
        <div className="py-28 sm:py-36">
          <Link
            ref={backLinkRef}
            to="/#projects"
            className="inline-flex text-sm text-muted transition-colors hover:text-foreground"
          >
            ← Back to projects
          </Link>

          <header className="mt-16 max-w-5xl">
            <p
              ref={categoryRef}
              className="text-sm font-medium uppercase tracking-[0.2em] text-accent"
            >
              {project.category}
            </p>

            <h1
              ref={titleRef}
              className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl"
            >
              {project.title}
            </h1>

            <p
              ref={descriptionRef}
              className="mt-8 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-8"
            >
              {project.description}
            </p>

            <div
              ref={metaRef}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm"
            >
              <div>
                <p className="text-muted">Role</p>
                <p className="mt-1 font-medium">{project.role}</p>
              </div>

              <div>
                <p className="text-muted">Year</p>
                <p className="mt-1 font-medium">{project.year}</p>
              </div>
            </div>
          </header>

          <div ref={previewRef} className="mt-20">
            <ProjectPreview title={project.title} images={project.images} />
          </div>

          <div className="mt-20 grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div ref={addContentSection}>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                Technologies
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-border px-4 py-2 text-sm text-muted"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-14 sm:grid-cols-2">
              <section ref={addContentSection}>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                  The Problem
                </p>

                <p className="mt-5 text-lg leading-8 text-muted">
                  {project.problem}
                </p>
              </section>

              <section ref={addContentSection}>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                  The Solution
                </p>

                <p className="mt-5 text-lg leading-8 text-muted">
                  {project.solution}
                </p>
              </section>
            </div>
          </div>

          {project.features && (
            <section
              ref={addContentSection}
              className="mt-24 border-t border-border pt-16"
            >
              <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                    Features
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                    Built around the complete workflow.
                  </h2>
                </div>

                <ul className="grid gap-4 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="border-t border-border pt-4 text-base leading-7 text-muted"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {project.architecture && (
            <section
              ref={addContentSection}
              className="mt-24 border-t border-border pt-16"
            >
              <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                    Architecture
                  </p>
                </div>

                <p className="max-w-3xl text-lg leading-8 text-muted">
                  {project.architecture}
                </p>
              </div>
            </section>
          )}

          {project.security && (
            <section
              ref={addContentSection}
              className="mt-24 border-t border-border pt-16"
            >
              <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                    Security
                  </p>
                </div>

                <p className="max-w-3xl text-lg leading-8 text-muted">
                  {project.security}
                </p>
              </div>
            </section>
          )}

          <div
            ref={addContentSection}
            className="mt-24 border-t border-border pt-8"
          >
            <div className="flex flex-wrap items-center gap-6">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium underline underline-offset-4 transition-colors hover:text-accent"
                >
                  Live Project ↗
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium underline underline-offset-4 transition-colors hover:text-accent"
                >
                  GitHub Repository ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default ProjectCaseStudy;
