import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Restore scroll position on reload (if path matches)
  useEffect(() => {
    const savedScrollY = sessionStorage.getItem("scrollY");
    const savedPath = sessionStorage.getItem("scrollPath");

    if (savedPath === pathname && savedScrollY) {
      window.scrollTo(0, parseInt(savedScrollY));
    }
  }, [pathname]);

  // Save scroll position before unload (reload/close tab)
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

  // Always scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
