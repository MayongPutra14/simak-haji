import AboutSection from '../components/ui/global/landingpage/AboutSection';
import FAQSection from '../components/ui/global/landingpage/FAQSection';
import FooterSection from '../components/ui/global/landingpage/FooterSection';
import GallerySection from '../components/ui/global/landingpage/GallerySection';
import HeroSection from '../components/ui/global/landingpage/HeroSection';
import Navbar from '../components/ui/global/landingpage/Navbar';
import StatisticsSection from '../components/ui/global/landingpage/StatisticSection';

export default function LandingPageFragment() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StatisticsSection />
      <FAQSection />
      <GallerySection />
      <FooterSection />
    </>
  );
}
