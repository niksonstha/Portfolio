import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

function useGsap() {
  const scope = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!scope.current) return;

    const context = gsap.context(() => {}, scope);

    return () => {
      context.revert();
    };
  }, []);

  return scope;
}

export default useGsap;
