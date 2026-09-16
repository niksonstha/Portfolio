import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCaseStudyAnimationElements {
  backLink: HTMLElement | null;
  category: HTMLElement | null;
  title: HTMLElement | null;
  description: HTMLElement | null;
  meta: HTMLElement | null;
  preview: HTMLElement | null;
  contentSections: HTMLElement[];
}

export function createProjectCaseStudyAnimations(
  elements: ProjectCaseStudyAnimationElements,
) {
  const {
    backLink,
    category,
    title,
    description,
    meta,
    preview,
    contentSections,
  } = elements;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion) {
    return;
  }

  const timeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  timeline
    .from(backLink, {
      y: 15,
      opacity: 0,
      duration: 0.5,
    })
    .from(
      category,
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
      },
      "-=0.2",
    )
    .from(
      title,
      {
        y: 45,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.2",
    )
    .from(
      description,
      {
        y: 25,
        opacity: 0,
        duration: 0.6,
      },
      "-=0.35",
    )
    .from(
      meta,
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
      },
      "-=0.3",
    )
    .from(
      preview,
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.2",
    );

  contentSections.forEach((section) => {
    gsap.from(section, {
      y: 35,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        once: true,
      },
    });
  });

  ScrollTrigger.refresh();

  return timeline;
}
