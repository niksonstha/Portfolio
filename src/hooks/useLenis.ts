import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useLenis() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.history.scrollRestoration = "manual";

    if (reduceMotion) {
      window.scrollTo(0, 0);

      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      smoothWheel: true,
    });

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest<HTMLAnchorElement>('a[href^="#"]');

      if (!link) {
        return;
      }

      const hash = link.getAttribute("href");

      if (!hash || hash === "#") {
        return;
      }

      const targetElement = document.querySelector<HTMLElement>(hash);

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      lenis.scrollTo(targetElement, {
        offset: -80,
        duration: 1.2,
      });

      window.history.pushState(null, "", hash);
    };

    gsap.ticker.add(update);

    lenis.on("scroll", handleScroll);

    document.addEventListener("click", handleAnchorClick);

    // Every newly mounted route starts at the top.
    lenis.scrollTo(0, {
      immediate: true,
    });

    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", handleAnchorClick);

      lenis.off("scroll", handleScroll);

      gsap.ticker.remove(update);

      lenis.destroy();
    };
  }, [pathname]);
}

export default useLenis;
