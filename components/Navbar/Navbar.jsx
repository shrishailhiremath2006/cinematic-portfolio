"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Work",       href: "#work"           },
  { label: "Skills",     href: "#skills"         },
  { label: "Experience", href: "#experience"     },
  { label: "Certs",      href: "#certifications" },
  { label: "About",      href: "#about"          },
  { label: "Contact",    href: "#contact"        },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 60); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function onClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  function handleLinkClick(e, href) {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}
      aria-label="Main navigation"
    >
      <div className={styles.inner}>
        {/* Logo */}
        <a
          href="#"
          className={styles.logo}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); }}
          aria-label="Back to top"
        >
          SH
        </a>

        {/* Desktop links */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.link}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="https://github.com/shrishailhiremath2006"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.cta} ${styles.ctaDesktop}`}
        >
          GitHub
          <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Hamburger */}
        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          id="nav-hamburger"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className={styles.drawerLinks} role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.drawerLink}
                onClick={(e) => handleLinkClick(e, link.href)}
                tabIndex={menuOpen ? 0 : -1}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.drawerFooter}>
          <a
            href="/resume.pdf"
            download="Shrishail_Hiremath_Resume.pdf"
            className={styles.drawerCta}
            tabIndex={menuOpen ? 0 : -1}
          >
            Download Resume
          </a>
          <a
            href="https://github.com/shrishailhiremath2006"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.drawerCta}
            tabIndex={menuOpen ? 0 : -1}
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
