// src/components/SmoothScroll.tsx
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type SmoothScrollProps = {
  children: React.ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<any>(null);
  const pathname = usePathname();

  // Init Locomotive once (jab component mount hoga)
  useEffect(() => {
    if (!containerRef.current) return;

    let isCancelled = false;

    const initScroll = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      if (!containerRef.current || isCancelled) return;

      const scroll = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        lerp: 0.08,      // 0–1 (kam = zyada smooth / heavy)
        multiplier: 1.0, // overall scroll speed
      } as any);

      scrollRef.current = scroll;

      const handleResize = () => {
        scroll.update();
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("load", handleResize);

      // initial safety update (fonts/images load ke baad)
      setTimeout(() => {
        scroll.update();
      }, 500);

      // cleanup helper store kar li
      (scroll as any)._cleanup = () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("load", handleResize);
      };
    };

    initScroll();

    return () => {
      isCancelled = true;
      if (scrollRef.current) {
        scrollRef.current._cleanup?.();
        scrollRef.current.destroy();
        scrollRef.current = null;
      }
    };
  }, []);

  // ❗ Route change / content change pe update
  useEffect(() => {
    if (!scrollRef.current) return;

    // thoda delay taki DOM settle ho jaye
    const t = setTimeout(() => {
      scrollRef.current?.update();
    }, 200);

    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div ref={containerRef} data-scroll-container>
      {children}
    </div>
  );
}
