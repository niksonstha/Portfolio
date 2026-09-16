import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import ProjectCard from "../components/projects/ProjectCard";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const projectList = projectsRef.current;

    if (!section || !heading || !projectList) {
      return;
    }

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        return;
      }

      const cards = Array.from(projectList.children);

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
            y: 35,
            opacity: 0,
            duration: 0.65,
            stagger: 0.12,
          },
          "-=0.3",
        );
    }, section);

    return () => context.revert();
  }, []);

  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="border-t border-border bg-surface"
    >
      <Container>
        <div className="py-32 sm:py-40">
          <div ref={headingRef}>
            <SectionHeading
              eyebrow="Projects"
              title="Selected work."
              description="A collection of projects exploring interfaces, full-stack applications, and practical web experiences."
            />
          </div>

          <div ref={projectsRef} className="mt-20">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Projects;
