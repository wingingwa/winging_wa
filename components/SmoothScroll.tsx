"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname.startsWith("/dashboard")) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
