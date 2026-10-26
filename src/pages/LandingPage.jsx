import LandingPageFragment from '../fragments/LandingPageFragment';
import { useGetLandingContent } from '../hooks/admin/landing/useGetLandingContent';
import { useScrollRestoration } from '../hooks/admin/landing/useScrollRestoration';
import { JSONParser } from '../utils/helpers/helpers';
import {
  Navbar,
  AboutSection,
  FAQSection,
  FooterSection,
  GallerySection,
  HeroSection,
  StatisticsSection,
  TestimonialSection,
} from '../components/ui/global/landingpage/index';

const LandingPage = () => {
  const { landingData, isloading, _error } = useGetLandingContent();
  const isContentReady = !isloading && Boolean(landingData);
  useScrollRestoration(isContentReady);

  if (isloading || !landingData) {
    return <div className="text-center py-10">Memuat konten...</div>;
  }

  return (
    <LandingPageFragment>
      <Navbar />
      <HeroSection content={JSONParser(landingData[0].content)} />
      <AboutSection content={JSONParser(landingData[1].content)} />
      <StatisticsSection content={JSONParser(landingData[2].content)} />
      <TestimonialSection content={JSONParser(landingData[3].content)} />
      <GallerySection content={JSONParser(landingData[4].content)} />
      <FAQSection content={JSONParser(landingData[5].content)} />
      <FooterSection content={JSONParser(landingData[6].content)} />
    </LandingPageFragment>
  );
};

export default LandingPage;
