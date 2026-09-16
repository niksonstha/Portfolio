import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useGsap from "../hooks/useGsap";
import Container from "../components/ui/Container";

gsap.registerPlugin(ScrollTrigger);

interface SkillGroup {
  number: string;
  title: string;
  description: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    number: "01",
    title: "Frontend",
    description:
      "Building responsive interfaces with a focus on component architecture, usability, and maintainable UI systems.",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Next.js",
      "React Router",
      "Redux",
      "TanStack Query",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "SCSS",
    ],
  },
  {
    number: "02",
    title: "Backend",
    description:
      "Developing structured APIs and server-side functionality with authentication, validation, and clear business logic.",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT",
      "Authentication",
      "Authorization",
      "Middleware",
      "CRUD APIs",
      "Input Validation",
    ],
  },
  {
    number: "03",
    title: "Data & Integrations",
    description:
      "Working with databases and external services to build reliable application workflows and data-driven features.",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Drizzle ORM",
      "Mongoose",
      "Stripe",
      "Stripe Webhooks",
      "Resend",
      "PDF Generation",
      "Database Transactions",
    ],
  },
  {
    number: "04",
    title: "Engineering",
    description:
      "Applying practical engineering practices around testing, security, collaboration, and production-ready application development.",
    skills: [
      "Vitest",
      "Zod",
      "Git",
      "GitHub",
      "CI Workflows",
      "Responsive Design",
      "Component Architecture",
      "Error Handling",
      "Rate Limiting",
      "Security Practices",
    ],
  },
];

function Skills() {
  const scope = useGsap();

  const labelRef = useRef<HTMLParagraphElement | null>(null);

  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  const groupsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top 72%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(labelRef.current, {
          opacity: 0,
          y: 18,
          duration: 0.5,
        })
        .from(
          headingRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.75,
          },
          "-=0.25",
        )
        .from(
          descriptionRef.current,
          {
            opacity: 0,
            y: 25,
            duration: 0.6,
          },
          "-=0.35",
        )
        .from(
          groupsRef.current?.children ?? [],
          {
            opacity: 0,
            y: 35,
            duration: 0.6,
            stagger: 0.12,
          },
          "-=0.15",
        );
    }, scope);

    return () => context.revert();
  }, [scope]);

  const handlePointerEnter = (event: React.PointerEvent<HTMLElement>) => {
    const target = event.currentTarget;

    gsap.to(target, {
      y: -4,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLElement>) => {
    const target = event.currentTarget;

    gsap.to(target, {
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={scope}
      id="skills"
      className="relative overflow-hidden border-t border-border py-28 sm:py-36 lg:py-44"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_2fr] lg:gap-20">
          {/* Section label */}
          <div>
            <p
              ref={labelRef}
              className="text-xs font-medium uppercase tracking-[0.2em] text-accent sm:text-sm"
            >
              Skills
            </p>
          </div>

          {/* Main content */}
          <div>
            <h2
              ref={headingRef}
              className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl"
            >
              Tools I use to turn ideas into working products.
            </h2>

            <p
              ref={descriptionRef}
              className="mt-8 max-w-2xl text-base leading-7 text-muted sm:mt-10 sm:text-lg sm:leading-8"
            >
              My toolkit spans the frontend, backend, databases, and the
              engineering practices that connect them. I choose technologies
              based on the problem rather than trying to use everything
              everywhere.
            </p>

            <div
              ref={groupsRef}
              className="mt-14 grid gap-5 sm:mt-20 sm:grid-cols-2"
            >
              {skillGroups.map((group) => (
                <article
                  key={group.number}
                  onPointerEnter={handlePointerEnter}
                  onPointerLeave={handlePointerLeave}
                  className="group rounded-2xl border border-border bg-surface/40 p-6 transition-colors duration-300 hover:border-foreground/20 hover:bg-surface sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-accent">
                      {group.number}
                    </span>

                    <span className="h-px w-12 bg-border transition-all duration-300 group-hover:w-16 group-hover:bg-accent" />
                  </div>

                  <h3 className="mt-8 text-xl font-medium tracking-tight">
                    {group.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted">
                    {group.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors duration-200 group-hover:border-foreground/15 group-hover:text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Skills;
