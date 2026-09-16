import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import Navigation from "../components/navigation/Navigation";

import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";

import { createAboutScrollAnimation } from "../animations/aboutAnimations";
import Experience from "../sections/Experience";
import Contact from "../sections/Contact";
import Footer from "../components/navigation/Footer";
import Learning from "../sections/Learning";
import About from "../sections/About";
import GitHub from "../sections/GitHub";

function Home() {
  const aboutRef = useRef<HTMLElement | null>(null);
  const aboutHeadingRef = useRef<HTMLDivElement | null>(null);
  const aboutContentRef = useRef<HTMLDivElement | null>(null);

  const aboutMarkerRef = useRef<HTMLSpanElement | null>(null);
  const aboutLineRef = useRef<HTMLSpanElement | null>(null);

  const aboutDetailsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      createAboutScrollAnimation({
        section: aboutRef.current,
        heading: aboutHeadingRef.current,
        content: aboutContentRef.current,
        details: aboutDetailsRef.current,
        marker: aboutMarkerRef.current,
        line: aboutLineRef.current,
      });
    }, aboutRef);

    return () => context.revert();
  }, []);

  return (
    <main>
      <Navigation />

      {/* Hero */}
      <Hero />

      {/* About */}
      <About />

      {/* Projects */}
      <Projects />

      {/* Skills */}
      <Skills />

      {/* Learning */}
      <Learning />

      {/* Experience */}
      <Experience />

      {/* GitHub */}
      <GitHub />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default Home;
