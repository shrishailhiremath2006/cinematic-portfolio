"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "10+", label: "Projects Completed" },
  { value: "5+",  label: "Certifications" },
  { value: "8+",  label: "Technologies Learned" },
  { value: "∞",   label: "Passion for Learning" },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 82%", once: true },
        }
      );
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 82%", once: true },
        }
      );
      statsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={styles.section}
      aria-label="About"
    >
      <div className={styles.inner}>
        {/* Left column — bio */}
        <div ref={leftRef} className={styles.bio}>
          <p className={styles.eyebrow}>About Me</p>
          <h2 className={styles.heading}>
            Turning Ideas into <em>Intelligent Solutions</em>
          </h2>
          <p className={styles.body}>
            I&rsquo;m Shrishail Hiremath, an AI &amp; Machine Learning
            Engineering student from <strong>Bengaluru, India</strong>, passionate
            about creating intelligent software and modern web experiences. I
            enjoy combining AI with full-stack development to build practical
            solutions that solve real-world problems.
          </p>
          <p className={styles.body}>
            My expertise includes Python, Machine Learning, Deep Learning, Flask,
            React, Next.js, JavaScript, SQL, and Three.js. I continuously explore
            emerging technologies, participate in hackathons, and develop projects
            that strengthen my technical skills and creativity.
          </p>
          <p className={styles.body}>
            I&rsquo;m currently focused on expanding my knowledge in{" "}
            <em>Generative AI</em>, <em>Computer Vision</em>, and{" "}
            <em>Scalable Web Applications</em>, with the goal of building
            innovative products that create meaningful impact.
          </p>
          <a
            href="https://github.com/shrishailhiremath2006"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            View my GitHub
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Right column — stats */}
        <div ref={rightRef} className={styles.right}>
          <ul className={styles.stats} role="list">
            {STATS.map((stat, i) => (
              <li
                key={stat.label}
                ref={(el) => (statsRef.current[i] = el)}
                className={styles.stat}
              >
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </li>
            ))}
          </ul>

          {/* Status card */}
          <div className={styles.card} aria-hidden="true">
            <p className={styles.cardEyebrow}>Currently</p>
            <p className={styles.cardText}>
              Building AI-powered web applications, exploring Generative AI,
              and strengthening skills in Machine Learning and modern
              Full-Stack Development.
            </p>
            <span className={styles.cardDot} />
            <p className={styles.cardLocation}>📍 Bengaluru, Karnataka, India</p>
          </div>
        </div>
      </div>
    </section>
  );
}
