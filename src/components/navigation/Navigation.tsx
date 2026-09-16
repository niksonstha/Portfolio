import { useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import useGsap from "../../hooks/useGsap";
import { navigationItems } from "../../data/navigation";

gsap.registerPlugin(ScrollTrigger);

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const scope = useGsap();

  const logoRef = useRef<HTMLAnchorElement | null>(null);

  const linksRef = useRef<HTMLDivElement | null>(null);

  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const menuPanelRef = useRef<HTMLDivElement | null>(null);

  const menuLinksRef = useRef<HTMLDivElement | null>(null);

  const menuLineTopRef = useRef<HTMLSpanElement | null>(null);

  const menuLineBottomRef = useRef<HTMLSpanElement | null>(null);

  const indicatorRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(logoRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          linksRef.current?.children ?? [],
          {
            y: -12,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
          },
          "-=0.35",
        )
        .from(
          ctaRef.current,
          {
            y: -12,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3",
        )
        .from(
          menuButtonRef.current,
          {
            y: -12,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.5",
        );
    }, scope);

    return () => context.revert();
  }, [scope]);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      navigationItems.forEach((item) => {
        const section = document.querySelector(item.href);

        if (!section) {
          return;
        }

        ScrollTrigger.create({
          trigger: section,
          start: "top 45%",
          end: "bottom 45%",
          onEnter: () => {
            setActiveSection(item.href.replace("#", ""));
          },
          onEnterBack: () => {
            setActiveSection(item.href.replace("#", ""));
          },
        });
      });
    }, scope);

    return () => context.revert();
  }, [scope]);

  useLayoutEffect(() => {
    const linksContainer = linksRef.current;
    const indicator = indicatorRef.current;

    if (!linksContainer || !indicator) {
      return;
    }

    const activeLink = linksContainer.querySelector<HTMLAnchorElement>(
      `[href="#${activeSection}"]`,
    );

    if (!activeLink) {
      return;
    }

    const linkRect = activeLink.getBoundingClientRect();

    const parentRect = linksContainer.getBoundingClientRect();

    gsap.to(indicator, {
      x: linkRect.left - parentRect.left,
      width: linkRect.width,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [activeSection]);

  useLayoutEffect(() => {
    const panel = menuPanelRef.current;
    const links = menuLinksRef.current;
    const topLine = menuLineTopRef.current;
    const bottomLine = menuLineBottomRef.current;

    if (!panel || !links || !topLine || !bottomLine) {
      return;
    }

    gsap.set(panel, {
      opacity: 0,
      y: -16,
    });

    gsap.set(links.children, {
      opacity: 0,
      y: 20,
    });

    gsap.set(topLine, {
      y: 0,
      rotate: 0,
    });

    gsap.set(bottomLine, {
      y: 0,
      rotate: 0,
    });
  }, []);

  useLayoutEffect(() => {
    const panel = menuPanelRef.current;
    const links = menuLinksRef.current;
    const topLine = menuLineTopRef.current;
    const bottomLine = menuLineBottomRef.current;

    if (!panel || !links || !topLine || !bottomLine) {
      return;
    }

    if (isMenuOpen) {
      gsap.to(panel, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power3.out",
      });

      gsap.to(links.children, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.to(topLine, {
        y: 3.5,
        rotate: 45,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(bottomLine, {
        y: -3.5,
        rotate: -45,
        duration: 0.25,
        ease: "power2.out",
      });

      const firstLink =
        menuLinksRef.current?.querySelector<HTMLAnchorElement>("a");

      requestAnimationFrame(() => {
        firstLink?.focus();
      });
    } else {
      gsap.to(panel, {
        opacity: 0,
        y: -16,
        duration: 0.25,
        ease: "power2.in",
      });

      gsap.to(links.children, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        ease: "power2.in",
      });

      gsap.to(topLine, {
        y: 0,
        rotate: 0,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(bottomLine, {
        y: 0,
        rotate: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  }, [isMenuOpen]);

  useLayoutEffect(() => {
    if (isMenuOpen) {
      return;
    }

    if (document.activeElement !== menuButtonRef.current) {
      return;
    }

    menuButtonRef.current?.focus();
  }, [isMenuOpen]);

  useLayoutEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={scope}
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background"
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10"
      >
        <a
          ref={logoRef}
          href="#home"
          onClick={closeMenu}
          className="group flex items-center gap-3"
        >
          <span
            aria-hidden="true"
            className="relative flex h-7 w-7 items-center justify-center"
          >
            <span className="absolute left-1 top-1 h-5 w-1.5 rotate-[-18deg] rounded-full bg-accent transition-transform duration-300 group-hover:-translate-y-0.5" />

            <span className="absolute left-3.5 top-1 h-5 w-1.5 rotate-18 rounded-full bg-foreground transition-transform duration-300 group-hover:translate-y-0.5" />

            <span className="absolute bottom-0 left-2.5 h-1.5 w-3 rounded-full bg-accent transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>

          <span className="flex flex-col">
            <span className="text-sm font-semibold leading-none tracking-tight">
              Nikson
            </span>

            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.14em] text-muted">
              Developer
            </span>
          </span>
        </a>

        <div
          ref={linksRef}
          className="relative hidden items-center gap-8 md:flex"
        >
          {navigationItems.map((item) => {
            const sectionId = item.href.replace("#", "");

            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={`relative py-2 text-sm transition-colors duration-200 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <span
            ref={indicatorRef}
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-accent"
          />
        </div>
        <a
          ref={ctaRef}
          href="#contact"
          onClick={closeMenu}
          className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-[filter] duration-200 hover:brightness-110 md:inline-flex"
        >
          Let's Talk
        </a>
        <button
          ref={menuButtonRef}
          type="button"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="relative z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
        >
          <span className="sr-only">
            {isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          </span>

          <span className="relative flex h-4 w-5 flex-col justify-center">
            <span
              ref={menuLineTopRef}
              className="absolute left-0 block h-px w-5 bg-current"
            />

            <span
              ref={menuLineBottomRef}
              className="absolute left-0 block h-px w-5 bg-current"
            />
          </span>
        </button>
      </nav>

      <div
        ref={menuPanelRef}
        id="mobile-navigation"
        aria-hidden={!isMenuOpen}
        className={`absolute inset-x-0 top-20 z-20 border-t border-border bg-background px-6 py-6 md:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div ref={menuLinksRef} className="flex flex-col gap-5">
          {navigationItems.map((item) => {
            const sectionId = item.href.replace("#", "");

            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.href}
                href={item.href}
                tabIndex={isMenuOpen ? 0 : -1}
                aria-current={isActive ? "location" : undefined}
                onClick={closeMenu}
                className={`text-lg transition-colors duration-200 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <a
            href="#contact"
            tabIndex={isMenuOpen ? 0 : -1}
            onClick={closeMenu}
            className="mt-2 inline-flex w-fit rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
