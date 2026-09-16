import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import HeroVisual from "../components/hero/HeroVisual";
import useGsap from "../hooks/useGsap";
import { createHeroIntroAnimation } from "../animations/heroAnimations";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const scope = useGsap();

  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);

  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  const actionsRef = useRef<HTMLDivElement | null>(null);

  const socialsRef = useRef<HTMLDivElement | null>(null);

  const underlineRef = useRef<HTMLSpanElement | null>(null);

  const titleWordsRef = useRef<HTMLSpanElement[]>([]);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      createHeroIntroAnimation({
        eyebrow: eyebrowRef.current,
        title: titleRef.current,
        titleWords: titleWordsRef.current,
        description: descriptionRef.current,
        actions: actionsRef.current,
        socials: socialsRef.current,
        underline: underlineRef.current,
      });
    }, scope);

    return () => context.revert();
  }, [scope]);

  return (
    <section
      ref={scope}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <Container>
        <div className="grid min-h-screen items-center gap-12 py-32 sm:py-40 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-24 xl:gap-16">
          {/* Hero content */}
          <div className="relative z-10 max-w-4xl">
            <p
              ref={eyebrowRef}
              className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent sm:text-sm"
            >
              Frontend / Full-Stack Developer
            </p>

            <h1
              ref={titleRef}
              className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl xl:text-9xl"
            >
              <span className="inline-block overflow-hidden">
                <span
                  ref={(element) => {
                    if (element) {
                      titleWordsRef.current[0] = element;
                    }
                  }}
                  className="inline-block"
                >
                  Hi,
                </span>
              </span>{" "}
              <span className="inline-block overflow-hidden">
                <span
                  ref={(element) => {
                    if (element) {
                      titleWordsRef.current[1] = element;
                    }
                  }}
                  className="inline-block"
                >
                  I’m
                </span>
              </span>{" "}
              <span className="relative inline-block overflow-hidden">
                <span
                  ref={(element) => {
                    if (element) {
                      titleWordsRef.current[2] = element;
                    }
                  }}
                  className="inline-block"
                >
                  Nikson.
                </span>

                <span
                  ref={underlineRef}
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 rounded-full bg-accent sm:h-1.5"
                />
              </span>
            </h1>

            <p
              ref={descriptionRef}
              className="mt-7 max-w-2xl text-base leading-7 text-muted sm:mt-8 sm:text-xl sm:leading-8"
            >
              I build web experiences with React, TypeScript, and modern web
              technologies.
            </p>

            <div
              ref={actionsRef}
              className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
            >
              <a href="#projects">
                <Button>View Projects</Button>
              </a>

              <a href="#contact">
                <Button variant="secondary">Contact Me</Button>
              </a>
            </div>

            <div ref={socialsRef} className="mt-9 flex items-center sm:mt-11">
              <a
                href="https://github.com/niksonstha"
                target="_blank"
                rel="noreferrer"
                aria-label="Nikson on GitHub (opens in a new tab)"
                className="group inline-flex items-center gap-2.5 rounded-full border border-border px-4 py-2.5 text-sm text-muted transition-all duration-300 hover:border-foreground/20 hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <span
                  aria-hidden="true"
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-border text-[10px] font-semibold transition-colors duration-300 group-hover:border-foreground/30"
                >
                  GH
                </span>

                <span>GitHub</span>

                <span
                  aria-hidden="true"
                  className="text-xs text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                >
                  ↗
                </span>
              </a>

              <span aria-hidden="true" className="mx-3 h-4 w-px bg-border" />

              <a
                href="https://uk.linkedin.com/in/nikson-shrestha-8483ab174"
                target="_blank"
                rel="noreferrer"
                aria-label="Nikson on LinkedIn (opens in a new tab)"
                className="group inline-flex items-center gap-2.5 rounded-full border border-border px-4 py-2.5 text-sm text-muted transition-all duration-300 hover:border-foreground/20 hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <span
                  aria-hidden="true"
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-border text-[10px] font-semibold transition-colors duration-300 group-hover:border-foreground/30"
                >
                  in
                </span>

                <span>LinkedIn</span>

                <span
                  aria-hidden="true"
                  className="text-xs text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative z-0 w-full lg:-mr-4 xl:-mr-8">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
