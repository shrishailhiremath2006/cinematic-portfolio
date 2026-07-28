"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorSpotlight.module.css";

export default function CursorSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf;
    let tx = -9999, ty = -9999;
    let cx = -9999, cy = -9999;

    function onMove(e) {
      tx = e.clientX;
      ty = e.clientY;
    }

    function tick() {
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      el.style.setProperty("--x", `${cx}px`);
      el.style.setProperty("--y", `${cy}px`);
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className={styles.spotlight} aria-hidden="true" />;
}
