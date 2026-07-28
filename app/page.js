import VideoIntro from "../components/VideoIntro/VideoIntro";
import Navbar from "../components/Navbar/Navbar";
import WorkSection from "../components/WorkSection/WorkSection";
import TimelineSection from "../components/TimelineSection/TimelineSection";
import CertificationsSection from "../components/CertificationsSection/CertificationsSection";
import SkillsSection from "../components/SkillsSection/SkillsSection";
import AboutSection from "../components/AboutSection/AboutSection";
import ContactSection from "../components/ContactSection/ContactSection";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <VideoIntro />
      <WorkSection />
      <TimelineSection />
      <CertificationsSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
