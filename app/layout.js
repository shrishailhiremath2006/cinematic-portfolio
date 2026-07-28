import "@fontsource/fraunces/400-italic.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/500-italic.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import CursorSpotlight from "../components/CursorSpotlight/CursorSpotlight";
import AIChatbot from "../components/AIChatbot/AIChatbot";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cinematic-portfolio-vtll.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Shrishail Hiremath — AI & ML Engineer · Full Stack Developer",
  description:
    "AI & ML Engineer and Full Stack Developer from Bengaluru, India. Building AI-powered applications, modern web experiences, and scalable software solutions.",
  keywords: [
    "Shrishail Hiremath",
    "AI Engineer",
    "ML Engineer",
    "Full Stack Developer",
    "Python",
    "React",
    "Next.js",
    "Machine Learning",
    "Portfolio",
  ],
  authors: [{ name: "Shrishail Hiremath" }],
  creator: "Shrishail Hiremath",

  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Shrishail Hiremath — AI & ML Engineer · Full Stack Developer",
    description:
      "AI & ML Engineer and Full Stack Developer from Bengaluru, India. Building AI-powered applications, modern web experiences, and scalable software solutions.",
    siteName: "Shrishail Hiremath Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shrishail Hiremath — AI & ML Engineer · Full Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Shrishail Hiremath — AI & ML Engineer · Full Stack Developer",
    description:
      "AI & ML Engineer and Full Stack Developer from Bengaluru, India.",
    images: ["/og-image.png"],
    creator: "@shrishailhiremath",
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CursorSpotlight />
        {children}
        <AIChatbot />
      </body>
    </html>
  );
}
