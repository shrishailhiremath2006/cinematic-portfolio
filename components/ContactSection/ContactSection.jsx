"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ContactSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const FORMSPREE_ID = "YOUR_FORM_ID";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
      });
      gsap.fromTo(formRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 88%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function validate() {
    const errs = {};
    if (!values.name.trim()) errs.name = "Name is required.";
    if (!values.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = "Enter a valid email.";
    if (!values.message.trim()) errs.message = "Message is required.";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) { setStatus("success"); setValues({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  }

  return (
    <section id="contact" ref={sectionRef} className={styles.section} aria-label="Contact">
      <div ref={headingRef} className={styles.header}>
        <p className={styles.eyebrow}>Get In Touch</p>
        <h2 className={styles.heading}>Let&apos;s <em>work together</em></h2>
        <p className={styles.subheading}>
          Have a project, opportunity, or just want to say hello? Drop me a message — I&apos;ll get back to you within 24 hours.
        </p>
      </div>

      <div className={styles.layout}>
        <div className={styles.infoCol}>
          <div className={styles.infoCard}>
            <p className={styles.infoEyebrow}>Contact Details</p>
            <ul className={styles.infoList} role="list">
              <li className={styles.infoItem}>
                <span className={styles.infoIcon} aria-hidden="true">✉</span>
                <a href="mailto:shrishailhiremath8658@gmail.com" className={styles.infoLink}>shrishailhiremath8658@gmail.com</a>
              </li>
              <li className={styles.infoItem}>
                <span className={styles.infoIcon} aria-hidden="true">📍</span>
                <span className={styles.infoText}>Bengaluru, Karnataka, India</span>
              </li>
              <li className={styles.infoItem}>
                <span className={styles.infoIcon} aria-hidden="true">🐙</span>
                <a href="https://github.com/shrishailhiremath2006" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>github.com/shrishailhiremath2006</a>
              </li>
              <li className={styles.infoItem}>
                <span className={styles.infoIcon} aria-hidden="true">💼</span>
                <a href="https://linkedin.com/in/shrishailhiremath" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>linkedin.com/in/shrishailhiremath</a>
              </li>
            </ul>
          </div>
          <div className={styles.availCard}>
            <span className={styles.availDot} />
            <div>
              <p className={styles.availTitle}>Open to Opportunities</p>
              <p className={styles.availText}>Internships · Full-time · Freelance</p>
            </div>
          </div>
        </div>

        <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate aria-label="Contact form">
          {status === "success" ? (
            <div className={styles.successMsg} role="alert">
              <span className={styles.successIcon}>✓</span>
              <p className={styles.successTitle}>Message sent!</p>
              <p className={styles.successText}>Thanks for reaching out. I&apos;ll get back to you soon.</p>
              <button type="button" className={styles.resetBtn} onClick={() => setStatus("idle")}>Send another message</button>
            </div>
          ) : (
            <>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-name">Name</label>
                  <input id="contact-name" name="name" type="text" className={`${styles.input} ${errors.name ? styles.inputError : ""}`} placeholder="Your full name" value={values.name} onChange={handleChange} autoComplete="name" />
                  {errors.name && <p className={styles.errorMsg} role="alert">{errors.name}</p>}
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-email">Email</label>
                  <input id="contact-email" name="email" type="email" className={`${styles.input} ${errors.email ? styles.inputError : ""}`} placeholder="your@email.com" value={values.email} onChange={handleChange} autoComplete="email" />
                  {errors.email && <p className={styles.errorMsg} role="alert">{errors.email}</p>}
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`} placeholder="Tell me about your project or opportunity..." rows={5} value={values.message} onChange={handleChange} />
                {errors.message && <p className={styles.errorMsg} role="alert">{errors.message}</p>}
              </div>
              {status === "error" && <p className={styles.errorBanner} role="alert">Something went wrong. Please try again or email me directly.</p>}
              <button type="submit" className={styles.submitBtn} disabled={status === "sending"} id="contact-submit">
                {status === "sending" ? <><span className={styles.spinner} /> Sending…</> : <>Send Message <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg></>}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
