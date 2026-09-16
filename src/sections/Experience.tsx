import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import { experience } from "../data/experience";
import { education } from "../data/education";

gsap.registerPlugin(ScrollTrigger);

function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const headingRef = useRef<HTMLDivElement | null>(null);

  const timelineRef = useRef<HTMLDivElement | null>(null);

  const timelineLineRef = useRef<HTMLSpanElement | null>(null);

  const educationRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const timeline = timelineRef.current;
    const timelineLine = timelineLineRef.current;
    const educationBlock = educationRef.current;

    if (!section || !heading || !timeline || !timelineLine || !educationBlock) {
      return;
    }

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        return;
      }

      const entries = Array.from(
        timeline.querySelectorAll<HTMLElement>("[data-experience-entry]"),
      );

      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          once: true,
        },
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.fromTo(
        timelineLine,
        {
          scaleY: 0,
          transformOrigin: "top",
        },
        {
          scaleY: 1,
          scrollTrigger: {
            trigger: timeline,
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.8,
          },
          ease: "none",
        },
      );

      entries.forEach((entry) => {
        const dot = entry.querySelector<HTMLElement>("[data-experience-dot]");

        const content = entry.querySelector<HTMLElement>(
          "[data-experience-content]",
        );

        if (!dot || !content) {
          return;
        }

        const animation = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: "top 82%",
            once: true,
          },
          defaults: {
            ease: "power3.out",
          },
        });

        animation
          .from(dot, {
            scale: 0,
            opacity: 0,
            duration: 0.4,
          })
          .from(
            content,
            {
              y: 35,
              opacity: 0,
              duration: 0.65,
            },
            "-=0.2",
          );
      });

      gsap.from(educationBlock, {
        scrollTrigger: {
          trigger: educationBlock,
          start: "top 82%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="border-t border-border"
    >
      <Container>
        <div className="py-32 sm:py-40">
          <div ref={headingRef}>
            <SectionHeading
              eyebrow="Experience"
              title="Where I've built and grown."
              description="My professional experience across frontend and full-stack web development."
            />
          </div>

          <div ref={timelineRef} className="relative mt-20 sm:mt-24">
            {/* Timeline */}
            <span
              ref={timelineLineRef}
              aria-hidden="true"
              className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-accent sm:left-[9px]"
            />

            {experience.map((item) => (
              <article
                key={`${item.company}-${item.role}-${item.startDate}`}
                data-experience-entry
                className="relative grid gap-8 pb-20 pl-10 last:pb-0 sm:pl-12 lg:grid-cols-[0.35fr_1.65fr] lg:gap-16"
              >
                {/* Timeline dot */}
                <span
                  data-experience-dot
                  aria-hidden="true"
                  className="absolute left-0 top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-background bg-accent sm:h-[19px] sm:w-[19px]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-background sm:h-2 sm:w-2" />
                </span>

                {/* Date */}
                <div className="pt-0.5">
                  <p className="text-sm font-medium text-foreground">
                    {item.startDate} — {item.endDate}
                  </p>

                  <p className="mt-2 text-sm text-muted">{item.location}</p>
                </div>

                {/* Content */}
                <div data-experience-content>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {item.role}
                      </h3>

                      <p className="mt-2 text-base text-accent">
                        {item.company}
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                    {item.description}
                  </p>

                  <ul className="mt-8 max-w-3xl space-y-4">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="relative pl-6 text-sm leading-6 text-muted sm:text-base sm:leading-7"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[0.65em] h-1.5 w-1.5 rounded-full bg-accent/70"
                        />

                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {/* Education */}
          <div
            ref={educationRef}
            className="mt-24 border-t border-border pt-10 sm:mt-32"
          >
            <div className="grid gap-8 sm:grid-cols-[0.35fr_1.65fr] sm:gap-16">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-accent">
                  Education
                </p>
              </div>

              <div className="space-y-10">
                {education.map((item) => (
                  <article
                    key={`${item.institution}-${item.degree}`}
                    className="group"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-accent sm:text-2xl">
                          {item.degree}
                        </h3>

                        <p className="mt-2 text-base text-muted">
                          {item.institution}
                        </p>
                      </div>

                      <p className="text-sm tabular-nums text-muted">
                        {item.startYear} — {item.endYear}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Experience;
