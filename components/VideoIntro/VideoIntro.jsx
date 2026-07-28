"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import CinematicLayer from "../CinematicLayer/CinematicLayer";
import styles from "./VideoIntro.module.css";

const VIDEO_SRC = "/videos/hero.mp4";

export default function VideoIntro() {
  const foregroundRef = useRef(null);
  const ambientRef = useRef(null);
  const heroRef = useRef(null);
  const soundHintTimeout = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Entrance animation ------------------------------------------------
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: prefersReducedMotion ? 0.01 : 1.1,
        },
      });

      tl.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: prefersReducedMotion ? 0.01 : 1.4 }
      )
        .fromTo(
          `.${styles.eyebrow}`,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0 },
          "-=0.9"
        )
        .fromTo(
          `.${styles.nameLine}`,
          { opacity: 0, y: 46 },
          { opacity: 1, y: 0, stagger: 0.14 },
          "-=0.6"
        )
        .fromTo(
          `.${styles.role}`,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0 },
          "-=0.5"
        )
        .fromTo(
          `.${styles.heroCTAs}`,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          `.${styles.controls}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          `.${styles.scrollIndicator}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.3"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Auto-hide the "tap for sound" badge --------------------------------
  useEffect(() => {
    soundHintTimeout.current = setTimeout(() => {
      setShowSoundHint(false);
    }, 4500);
    return () => clearTimeout(soundHintTimeout.current);
  }, []);

  function togglePlayback() {
    const fg = foregroundRef.current;
    if (!fg) return;

    if (fg.paused) {
      fg.play();
      setIsPlaying(true);
    } else {
      fg.pause();
      setIsPlaying(false);
    }
  }

  function toggleMute() {
    const fg = foregroundRef.current;
    if (!fg) return;
    const nextMuted = !fg.muted;
    fg.muted = nextMuted;
    setIsMuted(nextMuted);
    setShowSoundHint(false);
  }

  function scrollToNext() {
    const next = document.getElementById("work");
    next?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      aria-label="Introduction"
    >
      {/* Full-bleed ambient blur background */}
      <div className={styles.ambientLayer}>
        <video
          className={styles.ambientVideo}
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {/* Sharp video — right half */}
      <div className={styles.videoLayer}>
        <video
          ref={foregroundRef}
          className={styles.foregroundVideo}
          src={VIDEO_SRC}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          onLoadedData={() => setIsLoaded(true)}
        />
      </div>

      <div className={styles.gradientOverlay} />
      <CinematicLayer />

      <div className={styles.content}>
        <p className={styles.eyebrow}>AI &amp; ML Engineer &bull; Full Stack Developer</p>
        <h1 className={styles.name} aria-label="Shrishail Hiremath">
          <span className={styles.nameLine}>Shrishail</span>
          <span className={styles.nameLine}>Hiremath</span>
        </h1>
        <p className={styles.role}>
          Building AI-powered applications, modern web experiences,
          and scalable software solutions.
        </p>

        <div className={styles.heroCTAs}>
          <a
            href="/resume.pdf"
            download="Shrishail_Hiremath_Resume.pdf"
            className={styles.ctaPrimary}
            aria-label="Download resume"
          >
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M8 2v8M5 7l3 3 3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download Resume
          </a>
          <a
            href="https://linkedin.com/in/shrishailhiremath"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaOutline}
            aria-label="View LinkedIn profile"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452H17.01v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.586V9h3.299v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.912 1.912 0 01-1.908-1.91 1.91 1.91 0 011.908-1.91 1.91 1.91 0 011.91 1.91 1.912 1.912 0 01-1.91 1.91zm1.648 13.019H3.69V9h3.295v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      <div
        className={`${styles.soundBadge} ${
          showSoundHint ? styles.soundBadgeVisible : ""
        }`}
      >
        Tap for sound
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.glassButton}
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M7 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 7 5.5z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          className={styles.glassButton}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M4 9v6h4l5 5V4L8 9H4z" />
              <path
                d="M16 8.5l5 7M21 8.5l-5 7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M4 9v6h4l5 5V4L8 9H4z" />
              <path
                d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          )}
        </button>
      </div>

      <button
        type="button"
        className={styles.scrollIndicator}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine} />
      </button>

      <span className={styles.srOnly} aria-live="polite">
        {isLoaded ? "" : "Loading intro video"}
      </span>
    </section>
  );
}
