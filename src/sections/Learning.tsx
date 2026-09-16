import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import { learningItems } from "../data/learning";

gsap.registerPlugin(ScrollTrigger);

function Learning() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const headingRef = useRef<HTMLDivElement | null>(null);

  const itemsRef = useRef<HTMLElement[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const items = itemsRef.current;

    if (!section || !heading || items.length === 0) {
      return;
    }

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        return;
      }

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
          items,
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
    const item = event.currentTarget;

    const number = item.querySelector<HTMLElement>("[data-learning-number]");

    const arrow = item.querySelector<HTMLElement>("[data-learning-arrow]");

    if (number) {
      gsap.to(number, {
        x: 5,
        color: "var(--accent)",
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: 5,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLElement>) => {
    const item = event.currentTarget;

    const number = item.querySelector<HTMLElement>("[data-learning-number]");

    const arrow = item.querySelector<HTMLElement>("[data-learning-arrow]");

    if (number) {
      gsap.to(number, {
        x: 0,
        color: "var(--muted)",
        duration: 0.4,
        ease: "power3.out",
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.out",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="learning"
      className="border-t border-border bg-surface"
    >
      <Container>
        <div className="py-32 sm:py-40">
          <div ref={headingRef}>
            <SectionHeading
              eyebrow="Currently Learning"
              title="Going deeper, one layer at a time."
              description="Areas I'm actively exploring to become a stronger frontend and full-stack developer."
            />
          </div>

          <div className="mt-20 border-t border-border sm:mt-24">
            {learningItems.map((item, index) => (
              <article
                key={item.title}
                ref={(element) => {
                  if (element) {
                    itemsRef.current[index] = element;
                  }
                }}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                className="group grid gap-6 border-b border-border py-8 sm:grid-cols-[0.15fr_0.35fr_0.5fr] sm:items-start sm:gap-10 sm:py-10"
              >
                <div className="flex items-center justify-between sm:block">
                  <span
                    data-learning-number
                    className="font-mono text-sm tabular-nums text-muted"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    data-learning-arrow
                    aria-hidden="true"
                    className="text-lg text-accent opacity-0 sm:hidden"
                  >
                    ↗
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-accent sm:text-3xl">
                    {item.title}
                  </h3>

                  <span
                    data-learning-arrow
                    aria-hidden="true"
                    className="hidden shrink-0 pt-1 text-lg text-accent opacity-0 sm:block"
                  >
                    ↗
                  </span>
                </div>

                <p className="max-w-xl text-base leading-7 text-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Learning;
