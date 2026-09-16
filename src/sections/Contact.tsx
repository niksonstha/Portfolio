import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { contactLinks } from "../data/contact";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);
  const decorationRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const links = linksRef.current;
    const decoration = decorationRef.current;

    if (!section || !content || !links || !decoration) {
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
        .from(content, {
          y: 40,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          links.children,
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.4",
        )
        .from(
          decoration,
          {
            scale: 0.7,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.7",
        );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden border-t border-border bg-surface"
    >
      <Container>
        <div className="relative flex min-h-[80vh] items-center py-32 sm:py-40">
          <div ref={contentRef} className="relative z-10 max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent sm:text-sm">
              Contact
            </p>

            <h2 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              Let’s build something thoughtful.
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-7 text-muted sm:text-xl sm:leading-8">
              If you have a project, opportunity, or simply want to connect,
              feel free to reach out.
            </p>

            <div className="mt-10">
              <a href="mailto:niksonshrestha7@gmail.com">
                <Button>Get in Touch</Button>
              </a>
            </div>

            <div
              ref={linksRef}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                  {link.external && " ↗"}
                </a>
              ))}
            </div>
          </div>

          <div
            ref={decorationRef}
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-accent/30 sm:-right-20 sm:h-96 sm:w-96 lg:right-0 lg:h-128 lg:w-lg"
          >
            <div className="absolute inset-10 rounded-full border border-accent/10" />

            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 sm:h-32 sm:w-32" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Contact;
