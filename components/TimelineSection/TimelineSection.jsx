"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TimelineSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const ENTRIES = [
  {
    id: "be-aiml",
    type: "education",
    icon: "🎓",
    period: "2025 – Present",
    title: "B.E. in Artificial Intelligence & Machine Learning",
    org: "New Horizon College of Engineering",
    location: "Bengaluru, Karnataka",
    accent: "#5fb2ff",
    tags: ["AI", "ML", "Deep Learning", "Python"],
  },
  {
    id: "fsd-intern",
    type: "work",
    icon: "💼",
    period: "2024 – 2025",
    title: "Full Stack Web Development Intern",
    org: "Digisnare Technologies LLP",
    location: "Kalaburagi, Karnataka",
    accent: "#ff8a3d",
    tags: ["React", "Node.js", "JavaScript", "REST APIs"],
  },
  {
    id: "diploma",
    type: "education",
    icon: "🎓",
    period: "2022 – 2025",
    title: "Diploma in Computer Science & Engineering",
    org: "Government Polytechnic, Afzalpur",
    location: "CGPA: 9.48",
    accent: "#a78bfa",
    tags: ["Java", "C", "HTML/CSS", "SQL"],
  },
];

export default function TimelineSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        }
      );

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1.4, ease: "power2.out",
          transformOrigin: "top center",
          scrollTrigger: { trigger: lineRef.current, start: "top 75%", once: true },
        }
      );

      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const isRight = i % 2 === 1;
        gsap.fromTo(
          el,
          { opacity: 0, x: isRight ? 50 : -50 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={styles.section}
      aria-label="Experience and Education"
    >
      <div ref={headingRef} className={styles.header}>
        <p className={styles.eyebrow}>Journey</p>
        <h2 className={styles.heading}>
          Experience &amp; <em>Education</em>
        </h2>
        <p className={styles.subheading}>
          A timeline of academic achievements and real-world engineering experience.
        </p>
      </div>

      <div className={styles.timeline}>
        <span ref={lineRef} className={styles.line} aria-hidden="true" />

        {ENTRIES.map((entry, i) => (
          <div
            key={entry.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`${styles.entry} ${i % 2 === 1 ? styles.entryRight : styles.entryLeft}`}
            style={{ "--accent": entry.accent }}
          >
            <div className={styles.dot} aria-hidden="true" />
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.icon} aria-hidden="true">{entry.icon}</span>
                <span className={styles.period}>{entry.period}</span>
                <span
                  className={`${styles.badge} ${entry.type === "work" ? styles.badgeWork : styles.badgeEdu}`}
                >
                  {entry.type === "work" ? "Internship" : "Education"}
                </span>
              </div>
              <h3 className={styles.cardTitle}>{entry.title}</h3>
              <p className={styles.org}>{entry.org}</p>
              <p className={styles.location}>{entry.location}</p>
              <ul className={styles.tagList} role="list">
                {entry.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>{tag}</li>
                ))}
              </ul>
              <span className={styles.accentLine} aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
