import HeroSection from '../components/ui/global/landingpage/HeroSection';
import Navbar from '../components/ui/global/landingpage/Navbar';
import StatisticsSection from '../components/ui/global/landingpage/StatisticSection';

export default function LandingPageFragment() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatisticsSection />
    </>
  );
}
