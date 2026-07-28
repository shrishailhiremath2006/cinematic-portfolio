"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SkillsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    id: "ai-ml",
    label: "AI & Machine Learning",
    accent: "#ff8a3d",
    skills: [
      "Python", "Scikit-learn", "XGBoost", "Random Forest",
      "SHAP", "Logistic Regression", "KNN", "Decision Trees",
      "NLP", "Feature Engineering", "EDA",
    ],
  },
  {
    id: "web",
    label: "Web & Full-Stack",
    accent: "#5fb2ff",
    skills: [
      "Next.js", "React", "JavaScript", "HTML / CSS",
      "Flask", "REST APIs", "CSS Modules", "Node.js",
    ],
  },
  {
    id: "data",
    label: "Data & Visualisation",
    accent: "#a78bfa",
    skills: [
      "Pandas", "NumPy", "Matplotlib", "Seaborn",
      "Jupyter Notebooks", "SQL", "Data Wrangling",
    ],
  },
  {
    id: "creative",
    label: "Creative & 3D",
    accent: "#34d399",
    skills: [
      "Three.js", "GSAP", "WebGL", "Canvas API",
      "Particle Systems", "Scroll Animation",
    ],
  },
  {
    id: "languages",
    label: "Languages",
    accent: "#fbbf24",
    skills: ["Python", "Java", "JavaScript", "SQL", "HTML/CSS"],
  },
  {
    id: "tools",
    label: "Tools & Workflow",
    accent: "#f472b6",
    skills: [
      "Git & GitHub", "VS Code", "Jupyter", "npm",
      "Figma", "Linux / WSL",
    ],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const groupsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        }
      );

      groupsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
            delay: i * 0.06,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={styles.section}
      aria-label="Skills"
    >
      <div ref={headingRef} className={styles.header}>
        <p className={styles.eyebrow}>Skills & Tools</p>
        <h2 className={styles.heading}>
          What I <em>work with</em>
        </h2>
      </div>

      <div className={styles.groups}>
        {SKILL_GROUPS.map((group, i) => (
          <div
            key={group.id}
            ref={(el) => (groupsRef.current[i] = el)}
            className={styles.group}
            style={{ "--accent": group.accent }}
          >
            <p className={styles.groupLabel}>{group.label}</p>
            <ul className={styles.skillList} role="list">
              {group.skills.map((skill) => (
                <li key={skill} className={styles.skill}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
