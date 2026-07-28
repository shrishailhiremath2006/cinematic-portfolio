"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CertificationsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const CERTS = [
  {
    id: "python-basic",
    name: "Python (Basic)",
    issuer: "HackerRank",
    year: "2025",
    accent: "#3dc0ff",
    icon: "🐍",
  },
  {
    id: "sql-basic",
    name: "SQL (Basic)",
    issuer: "HackerRank",
    year: "2025",
    accent: "#ff8a3d",
    icon: "🗄️",
  },
  {
    id: "sql-intermediate",
    name: "SQL (Intermediate)",
    issuer: "HackerRank",
    year: "2025",
    accent: "#ff8a3d",
    icon: "🗄️",
  },
  {
    id: "sql-advanced",
    name: "SQL (Advanced)",
    issuer: "HackerRank",
    year: "2025",
    accent: "#ff8a3d",
    icon: "🗄️",
  },
  {
    id: "problem-solving",
    name: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    year: "2025",
    accent: "#a78bfa",
    icon: "🧩",
  },
  {
    id: "cyberops",
    name: "CyberOps Associate",
    issuer: "Cisco Networking Academy",
    year: "2025",
    accent: "#34d399",
    icon: "🛡️",
  },
  {
    id: "networking",
    name: "Networking Basics",
    issuer: "Cisco Networking Academy",
    year: "2025",
    accent: "#34d399",
    icon: "🌐",
  },
  {
    id: "data-ml",
    name: "Data Analytics, Data Science & ML",
    issuer: "Udemy",
    year: "2025",
    accent: "#fbbf24",
    icon: "📊",
  },
  {
    id: "fsd-internship",
    name: "Full-Stack Web Dev Internship",
    issuer: "Digisnare Technologies LLP",
    year: "2025",
    accent: "#f472b6",
    icon: "💼",
  },
  {
    id: "jquery",
    name: "FSD Front-End Dev (jQuery)",
    issuer: "Infosys Springboard",
    year: "2025",
    accent: "#5fb2ff",
    icon: "⚡",
  },
];

export default function CertificationsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
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

      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.65, ease: "power3.out",
            delay: i * 0.055,
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className={styles.section}
      aria-label="Certifications"
    >
      <div ref={headingRef} className={styles.header}>
        <p className={styles.eyebrow}>Credentials</p>
        <h2 className={styles.heading}>
          Certifications &amp; <em>Achievements</em>
        </h2>
        <p className={styles.subheading}>
          Industry-recognised credentials from leading platforms and organisations.
        </p>
      </div>

      <ul className={styles.grid} role="list">
        {CERTS.map((cert, i) => (
          <li
            key={cert.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className={styles.card}
            style={{ "--accent": cert.accent }}
          >
            <span className={styles.cardIcon} aria-hidden="true">{cert.icon}</span>
            <div className={styles.cardBody}>
              <p className={styles.cardName}>{cert.name}</p>
              <p className={styles.cardIssuer}>{cert.issuer}</p>
            </div>
            <div className={styles.cardMeta}>
              <span className={styles.cardYear}>{cert.year}</span>
              <span className={styles.verifiedBadge} aria-label="Verified">
                <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                  <path d="M8 1L10.2 5.5L15 6.2L11.5 9.6L12.4 14.4L8 12.1L3.6 14.4L4.5 9.6L1 6.2L5.8 5.5L8 1Z"/>
                </svg>
                Verified
              </span>
            </div>
            <span className={styles.accentLine} aria-hidden="true" />
          </li>
        ))}
      </ul>
    </section>
  );
}
