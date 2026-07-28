import styles from "./Footer.module.css";

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/shrishailhiremath2006",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/shrishailhiremath",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452H17.01v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.586V9h3.299v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.912 1.912 0 01-1.908-1.91 1.91 1.91 0 011.908-1.91 1.91 1.91 0 011.91 1.91 1.912 1.912 0 01-1.91 1.91zm1.648 13.019H3.69V9h3.295v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:shrishailhiremath2006@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 7l10 7 10-7" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-label="Footer">
      <div className={styles.inner}>
        {/* Left — name + tagline */}
        <div className={styles.brand}>
          <p className={styles.brandName}>Shrishail Hiremath</p>
          <p className={styles.brandTagline}>
            AI &amp; ML Engineer &bull; Full Stack Developer
          </p>
        </div>

        {/* Center — nav links */}
        <nav className={styles.nav} aria-label="Footer navigation">
          <a href="#work" className={styles.navLink}>Work</a>
          <a href="#skills" className={styles.navLink}>Skills</a>
          <a href="#about" className={styles.navLink}>About</a>
          <a href="#contact" className={styles.navLink}>Contact</a>
        </nav>

        {/* Right — social icons */}
        <ul className={styles.socials} role="list" aria-label="Social links">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={link.label}
              >
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.bar}>
        <p className={styles.copy}>
          &copy; {year} Shrishail Hiremath &mdash; Built with Next.js, Three.js &amp; GSAP
        </p>
      </div>
    </footer>
  );
}
