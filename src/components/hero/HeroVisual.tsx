import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";

import useGsap from "../../hooks/useGsap";

function HeroVisual() {
  const scope = useGsap();

  const characterRef = useRef<HTMLDivElement | null>(null);
  const monitorRef = useRef<HTMLDivElement | null>(null);
  const codeCardRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const shapeOneRef = useRef<HTMLDivElement | null>(null);
  const shapeTwoRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        return;
      }

      const entrance = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      entrance
        .from(monitorRef.current, {
          opacity: 0,
          y: 30,
          scale: 0.96,
          duration: 0.8,
        })
        .from(
          characterRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          "-=0.45",
        )
        .from(
          codeCardRef.current,
          {
            opacity: 0,
            x: 25,
            duration: 0.6,
          },
          "-=0.35",
        )
        .from(
          cursorRef.current,
          {
            opacity: 0,
            scale: 0,
            duration: 0.4,
          },
          "-=0.25",
        )
        .from(
          [shapeOneRef.current, shapeTwoRef.current],
          {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.25",
        );

      gsap.to(characterRef.current, {
        y: -8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(codeCardRef.current, {
        y: -5,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(cursorRef.current, {
        x: 7,
        y: -5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(shapeOneRef.current, {
        y: -12,
        rotate: 8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(shapeTwoRef.current, {
        y: 10,
        rotate: -6,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, scope);

    return () => context.revert();
  }, [scope]);

  useLayoutEffect(() => {
    const visual = scope.current;

    const monitor = monitorRef.current;
    const character = characterRef.current;
    const codeCard = codeCardRef.current;
    const cursor = cursorRef.current;
    const shapeOne = shapeOneRef.current;
    const shapeTwo = shapeTwoRef.current;

    if (
      !visual ||
      !monitor ||
      !character ||
      !codeCard ||
      !cursor ||
      !shapeOne ||
      !shapeTwo
    ) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const hasHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    if (reduceMotion || !hasHover) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = visual.getBoundingClientRect();

      const x = (event.clientX - bounds.left) / bounds.width - 0.5;

      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      gsap.to(monitor, {
        x: x * 10,
        y: y * 8,
        duration: 1,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(character, {
        x: x * -12,
        y: y * -8,
        duration: 1.1,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(codeCard, {
        x: x * 18,
        y: y * -14,
        duration: 0.9,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(cursor, {
        x: x * 28,
        y: y * -20,
        duration: 0.8,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(shapeOne, {
        x: x * 35,
        y: y * 25,
        duration: 1.4,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(shapeTwo, {
        x: x * -28,
        y: y * -22,
        duration: 1.3,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const handlePointerLeave = () => {
      gsap.to([monitor, character, codeCard, cursor, shapeOne, shapeTwo], {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        overwrite: true,
      });
    };

    visual.addEventListener("pointermove", handlePointerMove);

    visual.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      visual.removeEventListener("pointermove", handlePointerMove);

      visual.removeEventListener("pointerleave", handlePointerLeave);

      gsap.killTweensOf([
        monitor,
        character,
        codeCard,
        cursor,
        shapeOne,
        shapeTwo,
      ]);
    };
  }, [scope]);

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[560px]"
    >
      {/* Background frame */}
      <div
        ref={monitorRef}
        className="absolute left-[8%] top-[12%] h-[58%] w-[84%] rounded-[2rem] border border-border bg-surface/70 p-3 shadow-2xl"
      >
        <div className="h-full w-full overflow-hidden rounded-[1.4rem] border border-border bg-background">
          {/* Browser header */}
          <div className="flex h-9 items-center gap-1.5 border-b border-border px-4">
            <span className="h-2 w-2 rounded-full bg-muted/50" />
            <span className="h-2 w-2 rounded-full bg-muted/30" />
            <span className="h-2 w-2 rounded-full bg-muted/20" />
          </div>

          {/* Code */}
          <div className="space-y-3 p-6 font-mono text-[10px] leading-relaxed text-muted sm:text-xs">
            <div>
              <span className="text-accent">const</span> developer = {"{"}
            </div>

            <div className="pl-4">
              <span className="text-foreground">name</span>: "Nikson",
            </div>

            <div className="pl-4">
              <span className="text-foreground">role</span>: "Full-Stack
              Developer",
            </div>

            <div className="pl-4">
              <span className="text-foreground">passion</span>: "building",
            </div>

            <div>{"}"}</div>

            <div className="mt-6">
              <span className="text-accent">return</span> developer;
            </div>
          </div>
        </div>
      </div>

      {/* Simple working character */}
      <div
        ref={characterRef}
        className="absolute bottom-[7%] left-[25%] z-10 h-[50%] w-[48%]"
      >
        {/* Head */}
        <div className="absolute left-[28%] top-0 h-[30%] w-[44%] rounded-[45%] border border-border bg-foreground" />

        {/* Hair */}
        <div className="absolute left-[28%] top-[-2%] h-[13%] w-[44%] rounded-t-[50%] bg-foreground/80" />

        {/* Body */}
        <div className="absolute bottom-0 left-[17%] h-[58%] w-[66%] rounded-t-[35%] border border-border bg-accent" />

        {/* Neck */}
        <div className="absolute left-[42%] top-[26%] h-[10%] w-[16%] bg-foreground" />

        {/* Shirt detail */}
        <div className="absolute bottom-[29%] left-[42%] h-[22%] w-[16%] rounded-b-full bg-background/80" />

        {/* Back arm */}
        <div className="absolute bottom-[27%] right-[2%] h-[12%] w-[40%] -rotate-[22deg] rounded-full bg-accent" />

        {/* Working arm */}
        <div className="absolute bottom-[25%] left-[2%] h-[13%] w-[46%] rotate-[28deg] rounded-full bg-accent" />

        {/* Working hand */}
        <div className="absolute bottom-[20%] left-[2%] h-[10%] w-[15%] rounded-full bg-foreground" />

        {/* Laptop */}
        <div className="absolute bottom-[17%] left-[18%] z-20 h-[24%] w-[64%]">
          {/* Screen */}
          <div className="absolute bottom-[27%] left-[20%] h-[70%] w-[58%] -skew-x-6 rounded-md border border-border bg-background">
            <div className="absolute inset-1.5 rounded-sm border border-border/60 p-1.5">
              <div className="h-1 w-[65%] rounded-full bg-accent/70" />
              <div className="mt-1.5 h-1 w-[48%] rounded-full bg-muted/30" />
              <div className="mt-1 h-1 w-[58%] rounded-full bg-muted/20" />
            </div>
          </div>

          {/* Base */}
          <div className="absolute bottom-[13%] left-[5%] h-[12%] w-[90%] skew-x-[-18deg] rounded-full bg-foreground" />
        </div>

        {/* Legs */}
        <div className="absolute bottom-[-4%] left-[28%] h-[27%] w-[17%] rounded-b-full bg-foreground" />

        <div className="absolute bottom-[-4%] right-[27%] h-[27%] w-[17%] rounded-b-full bg-foreground" />
      </div>

      {/* Floating code card */}
      <div
        ref={codeCardRef}
        className="absolute right-[0%] top-[30%] z-20 w-[30%] rounded-2xl border border-border bg-background p-3 shadow-xl"
      >
        <div className="space-y-1 font-mono text-[8px] text-muted sm:text-[10px]">
          <div>
            <span className="text-accent">{"<"}</span>
            Code
            <span className="text-accent">{"/>"}</span>
          </div>

          <div className="h-1.5 w-[80%] rounded-full bg-muted/20" />
          <div className="h-1.5 w-[60%] rounded-full bg-muted/20" />
          <div className="h-1.5 w-[72%] rounded-full bg-muted/20" />
        </div>
      </div>

      {/* Cursor */}
      <div ref={cursorRef} className="absolute bottom-[19%] right-[13%] z-30">
        <div className="h-0 w-0 rotate-[-25deg] border-l-[9px] border-r-[3px] border-b-[18px] border-l-transparent border-r-transparent border-b-foreground" />
      </div>

      {/* Decorative circle */}
      <div
        ref={shapeOneRef}
        className="absolute left-[5%] top-[22%] h-12 w-12 rounded-full border border-accent/40 sm:h-16 sm:w-16"
      />

      {/* Decorative diamond */}
      <div
        ref={shapeTwoRef}
        className="absolute bottom-[15%] right-[5%] h-8 w-8 rotate-45 border border-border sm:h-12 sm:w-12"
      />
    </div>
  );
}

export default HeroVisual;
