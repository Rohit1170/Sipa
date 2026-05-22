"use client";

import { useRef, useEffect } from "react";

interface Props {
  children: React.ReactNode;
  panelCount: number;
}

export default function HorizontalScrollSection({ children, panelCount }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (panelCount <= 1) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    const sticky = stickyRef.current;
    if (!outer || !inner || !sticky) return;

    let viewportWidth = window.innerWidth;
    let stickyHeight = window.innerHeight - 64;

    const setup = () => {
      viewportWidth = window.innerWidth;
      // Measure each panel's natural content height (unaffected by parent overflow)
      const panels = Array.from(inner.children) as HTMLElement[];
      const maxContentHeight = Math.max(...panels.map((p) => p.scrollHeight));
      stickyHeight = Math.max(maxContentHeight, window.innerHeight - 64);

      sticky.style.height = `${stickyHeight}px`;
      // Outer drives horizontal travel: scrollRange = (panelCount-1) * viewportWidth
      outer.style.height = `${(panelCount - 1) * viewportWidth + stickyHeight}px`;
    };

    const onScroll = () => {
      const { top } = outer.getBoundingClientRect();
      const scrollRange = outer.offsetHeight - stickyHeight;
      if (scrollRange <= 0) return;
      const progress = Math.max(0, Math.min(1, -top / scrollRange));
      inner.style.transform = `translateX(${-progress * (panelCount - 1) * viewportWidth}px)`;
    };

    // Initial setup + re-measure if any panel resizes (e.g. after web fonts load)
    setup();
    const ro = new ResizeObserver(setup);
    const panels = Array.from(inner.children) as HTMLElement[];
    panels.forEach((p) => ro.observe(p));

    window.addEventListener("resize", setup, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setup);
      window.removeEventListener("scroll", onScroll);
    };
  }, [panelCount]);

  if (panelCount <= 1) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <div ref={outerRef} style={{ height: `${panelCount * 100}vh` }}>
      <div
        ref={stickyRef}
        className="sticky top-16 overflow-hidden"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <div
          ref={innerRef}
          className="flex will-change-transform"
          style={{ width: `${panelCount * 100}vw` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
