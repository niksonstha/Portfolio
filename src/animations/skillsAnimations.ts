import gsap from "gsap";

interface SkillsAnimationElements {
  section: HTMLElement | null;
  heading: HTMLElement | null;
  groups: HTMLElement[];
}

export function createSkillsScrollAnimation(elements: SkillsAnimationElements) {
  const { section, heading, groups } = elements;

  if (!section || !heading || groups.length === 0) {
    return;
  }

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion) {
    gsap.set([heading, ...groups], {
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
      y: 35,
      opacity: 0,
      duration: 0.7,
    })
    .from(
      groups,
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
      },
      "-=0.35",
    );

  return timeline;
}
