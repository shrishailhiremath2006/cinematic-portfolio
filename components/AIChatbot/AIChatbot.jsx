"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AIChatbot.module.css";

const SUGGESTED = [
  "Tell me about yourself",
  "What are your skills?",
  "Show me your projects",
  "Your education?",
  "Open to work?",
];

const QA = [
  {
    keys: ["yourself", "who are you", "about you", "introduce"],
    answer: "I'm Shrishail Hiremath — an AI & ML Engineering student from Bengaluru, India. I build AI-powered applications, modern web experiences, and scalable software solutions. I'm passionate about combining Machine Learning with Full-Stack Development to solve real-world problems.",
  },
  {
    keys: ["skill", "technology", "tech stack", "work with", "know"],
    answer: "My core skills include:\n• **AI/ML:** Python, Scikit-learn, XGBoost, Random Forest, SHAP, NLP\n• **Web:** React, Next.js, Flask, Node.js, JavaScript, HTML/CSS\n• **Data:** Pandas, NumPy, Matplotlib, SQL\n• **Creative:** Three.js, GSAP, WebGL\n• **Tools:** Git, Jupyter, VS Code, Figma",
  },
  {
    keys: ["project", "work", "built", "portfolio", "github"],
    answer: "My featured projects include:\n• **Heart Disease Prediction** — ML ensemble with SHAP explainability & Flask\n• **AI Hiring Prediction** — XGBoost model for resume-based Hire/Reject decisions\n• **Wine Quality Prediction** — Multi-model classifier benchmark\n• **Smart Health Predictor** — End-to-end health risk web app\n• **Online Book Store** — Full e-commerce with Java & admin portal\n• **Cinematic Portfolio** — This site, built with Next.js, Three.js & GSAP\n\nView them all on GitHub → github.com/shrishailhiremath2006",
  },
  {
    keys: ["education", "study", "degree", "college", "university", "diploma", "b.tech", "btech", "b.e", "be"],
    answer: "My education:\n• **B.E. in AI & ML** — New Horizon College of Engineering, Bengaluru (2025–Present)\n• **Full Stack Web Dev Internship** — Digisnare Technologies LLP (2024–2025)\n• **Diploma in CSE** — Government Polytechnic, Afzalpur (2022–2025) · CGPA: 9.48",
  },
  {
    keys: ["certification", "certified", "credential", "hackerrank", "cisco", "udemy"],
    answer: "I hold 10 certifications including:\n• Python (Basic) — HackerRank\n• SQL Basic, Intermediate & Advanced — HackerRank\n• Problem Solving (Intermediate) — HackerRank\n• CyberOps Associate & Networking Basics — Cisco\n• Data Analytics, Data Science & ML — Udemy\n• Full-Stack Web Dev — Digisnare Technologies\n• FSD Front-End (jQuery) — Infosys Springboard",
  },
  {
    keys: ["open to", "available", "hire", "job", "internship", "opportunity", "work"],
    answer: "Yes! I'm actively open to:\n• **Internships** in AI/ML or Full-Stack Development\n• **Full-time** junior roles\n• **Freelance** projects\n\nBest way to reach me: shrishailhiremath8658@gmail.com or via the contact form on this page.",
  },
  {
    keys: ["contact", "email", "reach", "linkedin", "message"],
    answer: "You can reach me at:\n• 📧 shrishailhiremath8658@gmail.com\n• 💼 linkedin.com/in/shrishailhiremath\n• 🐙 github.com/shrishailhiremath2006\n• 📍 Bengaluru, Karnataka, India\n\nOr use the contact form below — I reply within 24 hours!",
  },
  {
    keys: ["resume", "cv", "download"],
    answer: "You can download my latest resume using the **Download Resume** button in the hero section at the top of this page!",
  },
  {
    keys: ["generative ai", "genai", "llm", "gpt", "computer vision", "deep learning"],
    answer: "I'm currently exploring Generative AI, Computer Vision, and scalable web architectures. I'm expanding my knowledge in LLMs, diffusion models, and building AI-powered products that create real impact.",
  },
  {
    keys: ["location", "where", "city", "india", "bengaluru", "bangalore"],
    answer: "I'm based in Bengaluru, Karnataka, India — India's tech capital! I'm open to remote opportunities globally and on-site roles in Bengaluru.",
  },
];

function getAnswer(input) {
  const lower = input.toLowerCase();
  for (const qa of QA) {
    if (qa.keys.some((k) => lower.includes(k))) {
      return qa.answer;
    }
  }
  return "I'm not sure about that yet! For anything specific, please use the contact form below or email shrishailhiremath8658@gmail.com — Shrishail will get back to you within 24 hours. 😊";
}

function formatAnswer(text) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    const formatted = parts.map((part, j) =>
      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
    );
    return (
      <span key={i} style={{ display: "block", marginBottom: i < lines.length - 1 ? "0.3em" : 0 }}>
        {formatted}
      </span>
    );
  });
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! 👋 I'm Shrishail's AI assistant. Ask me anything about his skills, projects, experience, or how to get in touch!",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, typing]);

  function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { from: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: getAnswer(trimmed) }]);
    }, 700 + Math.random() * 400);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      {/* Floating trigger */}
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        id="chatbot-trigger"
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.82.487 3.53 1.338 5.007L2.05 21.03a.75.75 0 00.92.92l4.023-1.288A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
          </svg>
        )}
        {!open && <span className={styles.triggerPulse} aria-hidden="true" />}
      </button>

      {/* Chat panel */}
      <div
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        role="dialog"
        aria-label="AI assistant chat"
        aria-modal="true"
      >
        {/* Header */}
        <div className={styles.panelHeader}>
          <div className={styles.headerInfo}>
            <span className={styles.headerDot} aria-hidden="true" />
            <div>
              <p className={styles.headerName}>Shrishail&apos;s AI</p>
              <p className={styles.headerSub}>Ask me anything</p>
            </div>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div ref={bodyRef} className={styles.body}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`${styles.bubble} ${msg.from === "user" ? styles.bubbleUser : styles.bubbleBot}`}
            >
              {msg.from === "bot" && <span className={styles.botAvatar} aria-hidden="true">🤖</span>}
              <div className={styles.bubbleText}>
                {msg.from === "bot" ? formatAnswer(msg.text) : msg.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className={`${styles.bubble} ${styles.bubbleBot}`}>
              <span className={styles.botAvatar} aria-hidden="true">🤖</span>
              <div className={styles.typingDots}>
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className={styles.suggestions}>
          {SUGGESTED.map((s) => (
            <button
              key={s}
              type="button"
              className={styles.suggestion}
              onClick={() => sendMessage(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className={styles.inputRow}>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Ask about skills, projects..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            aria-label="Message input"
            id="chatbot-input"
          />
          <button
            type="button"
            className={styles.sendBtn}
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            aria-label="Send message"
            id="chatbot-send"
          >
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
