"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { BackgroundGradient } from "./BackgroundGradient";

interface MagazineContextValue {
  currentPage: number;
  goToPage: (index: number) => void;
}

export const MagazineContext = createContext<MagazineContextValue>({
  currentPage: 0,
  goToPage: () => {},
});

export const useMagazine = () => useContext(MagazineContext);

const desktopVariants: Variants = {
  enter: (dir: number) => ({
    rotateY: dir > 0 ? 90 : -90,
    opacity: 0,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    rotateY: dir > 0 ? -90 : 90,
    opacity: 0,
  }),
};

const mobileVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const pageTransition = {
  duration: 0.65,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
};

interface MagazineLayoutProps {
  pages: React.ReactNode[];
  children?: React.ReactNode;
}

export function MagazineLayout({ pages, children }: MagazineLayoutProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const isAnimating = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const goToPage = useCallback(
    (index: number) => {
      if (isAnimating.current || index === currentPage) return;
      if (index < 0 || index >= pages.length) return;
      setDirection(index > currentPage ? 1 : -1);
      setCurrentPage(index);
      isAnimating.current = true;
    },
    [currentPage, pages.length]
  );

  useEffect(() => {
    let lastWheel = 0;

    // Walk up from event target to find the nearest scrollable ancestor
    const getScrollable = (target: EventTarget | null): HTMLElement | null => {
      let el = target as HTMLElement | null;
      while (el && el !== document.body) {
        const oy = window.getComputedStyle(el).overflowY;
        if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight) {
          return el;
        }
        el = el.parentElement;
      }
      return null;
    };

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) return;
      if (Math.abs(e.deltaY) < 30) return;

      const scrollable = getScrollable(e.target);
      if (scrollable) {
        const atBottom =
          scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 5;
        const atTop = scrollable.scrollTop <= 5;
        // Not at the relevant edge — let the page scroll naturally
        if (e.deltaY > 0 && !atBottom) return;
        if (e.deltaY < 0 && !atTop) return;
      }

      const now = Date.now();
      if (now - lastWheel < 800) return;
      lastWheel = now;

      e.preventDefault();
      if (e.deltaY > 0) goToPage(Math.min(currentPage + 1, pages.length - 1));
      else goToPage(Math.max(currentPage - 1, 0));
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentPage, goToPage, pages.length]);

  useEffect(() => {
    let touchStartY = 0;
    let touchStartX = 0;
    let touchScrollable: HTMLElement | null = null;
    let willSwipePage = false;

    const getScrollable = (target: EventTarget | null): HTMLElement | null => {
      let el = target as HTMLElement | null;
      while (el && el !== document.body) {
        const oy = window.getComputedStyle(el).overflowY;
        if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight) {
          return el;
        }
        el = el.parentElement;
      }
      return null;
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      touchScrollable = getScrollable(e.target);
      willSwipePage = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const dy = touchStartY - e.touches[0].clientY;
      const dx = touchStartX - e.touches[0].clientX;
      if (Math.abs(dy) <= Math.abs(dx) || Math.abs(dy) < 8) return;

      if (!touchScrollable) {
        willSwipePage = true;
        e.preventDefault();
      } else {
        const atBottom =
          touchScrollable.scrollTop + touchScrollable.clientHeight >=
          touchScrollable.scrollHeight - 5;
        const atTop = touchScrollable.scrollTop <= 5;
        if ((dy > 0 && atBottom) || (dy < 0 && atTop)) {
          willSwipePage = true;
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current) return;
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50 || !willSwipePage) return;
      if (delta > 0) goToPage(Math.min(currentPage + 1, pages.length - 1));
      else goToPage(Math.max(currentPage - 1, 0));
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentPage, goToPage, pages.length]);

  const variants = isMobile ? mobileVariants : desktopVariants;

  return (
    <MagazineContext.Provider value={{ currentPage, goToPage }}>
      <div className="relative w-screen overflow-hidden" style={{ height: "100dvh" }}>
        {/* Animated gradient background — shared across all pages */}
        <BackgroundGradient />

        {/* Fixed UI above pages */}
        {children}

        {/* Page container */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{ perspective: "1200px" }}
        >
          <AnimatePresence
            initial={false}
            mode="wait"
            custom={direction}
            onExitComplete={() => {
              isAnimating.current = false;
            }}
          >
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              style={{
                position: "absolute",
                inset: 0,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                willChange: "transform",
              }}
            >
              {pages[currentPage]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Page indicator dots */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className="w-1.5 rounded-full transition-all duration-300"
              style={{
                height: currentPage === i ? "24px" : "6px",
                background:
                  currentPage === i
                    ? "#C9A040"
                    : "rgba(201,160,64,0.25)",
              }}
              aria-label={`Seite ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </MagazineContext.Provider>
  );
}
