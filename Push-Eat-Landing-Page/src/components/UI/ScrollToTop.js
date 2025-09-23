import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const isInitialLoad = useRef(true);

  // Restore scroll position on reload (if path matches)
  useEffect(() => {
    const savedScrollY = sessionStorage.getItem("scrollY");
    const savedPath = sessionStorage.getItem("scrollPath");

    if (savedPath === pathname && savedScrollY) {
      window.scrollTo(0, parseInt(savedScrollY));
    }

    isInitialLoad.current = false; // flag to indicate reload handling is done
  }, []);

  // Save scroll position before reload/close tab
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("scrollY", window.scrollY.toString());
      sessionStorage.setItem("scrollPath", pathname);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  // Scroll to top on route change only (not on reload)
  useEffect(() => {
    if (!isInitialLoad.current) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
