import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useGsap from "../hooks/useGsap";
import Container from "../components/ui/Container";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    title: "Frontend",
    description:
      "React, TypeScript, Next.js, responsive interfaces, component architecture, and state management.",
  },
  {
    title: "Backend",
    description:
      "Node.js, Express.js, REST APIs, authentication, authorization, validation, and business logic.",
  },
  {
    title: "Data",
    description:
      "PostgreSQL and MongoDB with practical experience in data modelling, transactions, and ORM-based development.",
  },
  {
    title: "Product",
    description:
      "I care about the complete experience, from interaction and accessibility to reliable APIs and maintainable code.",
  },
];

function About() {
  const scope = useGsap();

  const labelRef = useRef<HTMLParagraphElement | null>(null);

  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  const lineRef = useRef<HTMLDivElement | null>(null);

  const capabilitiesRef = useRef<HTMLDivElement | null>(null);

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
          start: "top 75%",
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
            y: 45,
            duration: 0.8,
          },
          "-=0.25",
        )
        .from(
          descriptionRef.current,
          {
            opacity: 0,
            y: 25,
            duration: 0.65,
          },
          "-=0.35",
        )
        .from(
          lineRef.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.7,
          },
          "-=0.2",
        )
        .from(
          capabilitiesRef.current?.children ?? [],
          {
            opacity: 0,
            y: 25,
            duration: 0.55,
            stagger: 0.1,
          },
          "-=0.25",
        );
    }, scope);

    return () => context.revert();
  }, [scope]);

  return (
    <section
      ref={scope}
      id="about"
      className="relative overflow-hidden py-28 sm:py-36 lg:py-44"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_2fr] lg:gap-20">
          {/* Section label */}
          <div>
            <p
              ref={labelRef}
              className="text-xs font-medium uppercase tracking-[0.2em] text-accent sm:text-sm"
            >
              About
            </p>
          </div>

          {/* Main content */}
          <div>
            <h2
              ref={headingRef}
              className="max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              I build thoughtful web experiences from interface to backend.
            </h2>

            <p
              ref={descriptionRef}
              className="mt-8 max-w-3xl text-base leading-7 text-muted sm:mt-10 sm:text-lg sm:leading-8"
            >
              I’m a developer focused on building modern web applications with
              React, TypeScript, Node.js, and database technologies. I enjoy
              turning ideas into structured, responsive products while keeping
              the underlying code maintainable and reliable.
            </p>

            <div
              ref={lineRef}
              className="mt-14 h-px w-full bg-border sm:mt-20"
            />

            <div
              ref={capabilitiesRef}
              className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-8"
            >
              {capabilities.map((capability, index) => (
                <article key={capability.title}>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-xs font-mono text-accent">
                      0{index + 1}
                    </span>

                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <h3 className="text-base font-medium">{capability.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-muted">
                    {capability.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default About;
