"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WorkSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "heart-disease",
    index: "01",
    title: "Heart Disease Prediction",
    href: "https://github.com/shrishailhiremath2006/Heart-Disease-Prediction",
    tags: ["Python", "Flask", "Random Forest", "Gradient Boosting", "SHAP"],
    description:
      "Comprehensive heart health monitoring system using an ensemble of ML models with SHAP explainability, emergency triage assistance, and dedicated doctor-patient portals.",
    accent: "#ff5f6d",
    accentSoft: "rgba(255,95,109,0.12)",
  },
  {
    id: "ai-hiring",
    index: "02",
    title: "AI Hiring Prediction System",
    href: "https://github.com/shrishailhiremath2006/AI_Hiring_Prediction_System",
    tags: ["Python", "XGBoost", "Logistic Regression", "SHAP", "Scikit-learn"],
    description:
      "ML model that predicts Hire/Reject decisions from resume data. Includes EDA, feature engineering, model comparison across Logistic Regression, Random Forest & XGBoost, and SHAP explainability.",
    accent: "#5fb2ff",
    accentSoft: "rgba(95,178,255,0.12)",
  },
  {
    id: "wine-quality",
    index: "03",
    title: "Wine Quality Prediction",
    href: "https://github.com/shrishailhiremath2006/Wine-Quality-Prediction",
    tags: ["Python", "Logistic Regression", "KNN", "Decision Tree", "Jupyter"],
    description:
      "Multi-model ML project for predicting wine quality from physicochemical properties. Benchmarks Logistic Regression, K-Nearest Neighbours, and Decision Tree classifiers.",
    accent: "#a78bfa",
    accentSoft: "rgba(167,139,250,0.12)",
  },
  {
    id: "smart-health",
    index: "04",
    title: "Smart Health Predictor",
    href: "https://github.com/shrishailhiremath2006/Smart-health-Predictor-Project",
    tags: ["Python", "HTML/CSS", "Machine Learning", "Flask"],
    description:
      "End-to-end health prediction web app enabling users to input vitals and receive AI-driven health risk assessments with actionable recommendations.",
    accent: "#34d399",
    accentSoft: "rgba(52,211,153,0.12)",
  },
  {
    id: "bookstore",
    index: "05",
    title: "Online Book Store",
    href: "https://github.com/shrishailhiremath2006/Online-book-Store-Website-",
    tags: ["Java", "HTML/CSS", "Admin Portal", "Cart System"],
    description:
      "Full-featured e-commerce bookstore with user login, cart management, and a dedicated admin portal for inventory and order control.",
    accent: "#fbbf24",
    accentSoft: "rgba(251,191,36,0.12)",
  },
  {
    id: "cinematic-portfolio",
    index: "06",
    title: "Cinematic Portfolio",
    href: "https://github.com/shrishailhiremath2006",
    tags: ["Next.js", "Three.js", "GSAP", "CSS Modules"],
    description:
      "This very site — a fullscreen video-driven hero with Three.js bokeh particles, GSAP entrance choreography, and zero utility-class CSS. Built for maximum first-impression impact.",
    accent: "#ff8a3d",
    accentSoft: "rgba(255,138,61,0.12)",
  },
];

export default function WorkSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow + heading slide in
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Cards stagger in on scroll
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className={styles.section}
      aria-label="Selected Work"
    >
      {/* Section header */}
      <div ref={headingRef} className={styles.header}>
        <p className={styles.eyebrow}>Selected Work</p>
        <h2 className={styles.heading}>
          Projects that <em>ship</em>
        </h2>
        <p className={styles.subheading}>
          A cross-disciplinary portfolio spanning AI research, full-stack
          engineering, and interactive experiences.
        </p>
      </div>

      {/* Project grid */}
      <ul className={styles.grid} role="list">
        {PROJECTS.map((project, i) => (
          <li
            key={project.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className={styles.card}
            style={{
              "--accent": project.accent,
              "--accent-soft": project.accentSoft,
            }}
          >
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
              aria-label={`View ${project.title} on GitHub`}
            >
              <span className={styles.cardIndex}>{project.index}</span>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
              </div>

              <div className={styles.cardFooter}>
                <ul className={styles.tagList} role="list" aria-label="Tech stack">
                  {project.tags.map((tag) => (
                    <li key={tag} className={styles.tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
                <span className={styles.cardArrow} aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>

              {/* Decorative accent line */}
              <span className={styles.cardAccentLine} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>

      {/* GitHub CTA */}
      <div className={styles.cta}>
        <a
          href="https://github.com/shrishailhiremath2006"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaLink}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
          View all projects on GitHub
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
