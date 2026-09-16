import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, [pathname]);

  return null;
}

export default ScrollToTop;
