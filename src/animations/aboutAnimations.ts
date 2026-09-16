import gsap from "gsap";

interface AboutAnimationElements {
  section: HTMLElement | null;
  heading: HTMLElement | null;
  content: HTMLElement | null;
  details: HTMLElement[];
  marker: HTMLElement | null;
  line: HTMLElement | null;
}

export function createAboutScrollAnimation(elements: AboutAnimationElements) {
  const { section, heading, content, details, marker, line } = elements;

  if (!section || !heading || !content) {
    return;
  }

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion) {
    gsap.set([heading, content, ...details, marker, line], {
      clearProps: "all",
    });

    return;
  }

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 75%",
      once: true,
    },
    defaults: {
      ease: "power3.out",
    },
  });

  timeline
    .from(heading, {
      y: 40,
      opacity: 0,
      duration: 0.8,
    })
    .from(
      content,
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.5",
    )
    .from(
      marker,
      {
        x: -20,
        opacity: 0,
        duration: 0.5,
      },
      "-=0.5",
    )
    .from(
      line,
      {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.7,
      },
      "-=0.35",
    )
    .from(
      details,
      {
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      },
      "-=0.4",
    );

  return timeline;
}
