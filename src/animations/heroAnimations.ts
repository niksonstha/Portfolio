import gsap from "gsap";

interface HeroAnimationElements {
  eyebrow: HTMLElement | null;
  title: HTMLElement | null;
  titleWords: HTMLElement[];
  description: HTMLElement | null;
  actions: HTMLElement | null;
  socials: HTMLElement | null;
  underline: HTMLElement | null;
}

export function createHeroIntroAnimation(elements: HeroAnimationElements) {
  const { eyebrow, titleWords, description, actions, socials, underline } =
    elements;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion) {
    gsap.set(
      [eyebrow, ...titleWords, description, actions, socials, underline],
      {
        clearProps: "all",
      },
    );

    return;
  }

  const timeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  timeline
    .from(eyebrow, {
      y: 20,
      opacity: 0,
      duration: 0.6,
    })
    .from(
      titleWords,
      {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
      },
      "-=0.25",
    )
    .from(
      underline,
      {
        scaleX: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.35",
    )
    .from(
      description,
      {
        y: 25,
        opacity: 0,
        duration: 0.7,
      },
      "-=0.35",
    )
    .from(
      actions?.children ?? [],
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      },
      "-=0.35",
    )
    .from(
      socials?.children ?? [],
      {
        y: 15,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
      },
      "-=0.25",
    );

  return timeline;
}

export function createHeroMouseInteraction(
  scope: HTMLElement,
  decoration: HTMLElement,
) {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const hasHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;

  if (reduceMotion || !hasHover) {
    return () => {};
  }

  const handlePointerMove = (event: PointerEvent) => {
    const bounds = scope.getBoundingClientRect();

    const x = (event.clientX - bounds.left) / bounds.width - 0.5;

    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    gsap.to(decoration, {
      x: x * 80,
      y: y * 50,
      duration: 0.9,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const handlePointerLeave = () => {
    gsap.to(decoration, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "power3.out",
    });
  };

  scope.addEventListener("pointermove", handlePointerMove);
  scope.addEventListener("pointerleave", handlePointerLeave);

  return () => {
    scope.removeEventListener("pointermove", handlePointerMove);
    scope.removeEventListener("pointerleave", handlePointerLeave);

    gsap.killTweensOf(decoration);
  };
}
