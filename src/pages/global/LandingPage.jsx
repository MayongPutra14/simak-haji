import LandingPageFragment from '../../fragments/LandingPageFragment';
import { useGetLandingContent } from '../../hooks/admin/landing/useGetLandingContent';
import { useScrollRestoration } from '../../hooks/admin/landing/useScrollRestoration';
import { JSONParser } from '../../utils/helpers/helpers';
import LogoSimak from '../../assets/images/simak-logo.webp';
import { IconLoading } from '../../utils/helpers/decorations';
import {
  Navbar,
  AboutSection,
  FAQSection,
  FooterSection,
  GallerySection,
  HeroSection,
  StatisticsSection,
  TestimonialSection,
} from '../../components/ui/global/landingpage/index';

const LandingPage = () => {
  const { landingData, isLoading, _error } = useGetLandingContent();
  const isContentReady = !isLoading && Boolean(landingData);
  useScrollRestoration(isContentReady);

  if (isLoading || !landingData) {
    return (
      // FULLSCREEN OVERLAY CONTAINER WITH DEEP SEA-GREEN BACKGROUND
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-sea-green-950 text-sea-green-50 overflow-hidden select-none">
        {/* AMBIENT GLOW EFFECT IN BACKGROUND */}
        <div className="absolute w-72 h-72 bg-sea-green-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* BRAND LOGO WITH GENTLE PULSE ANIMATION */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          <img
            src={LogoSimak}
            alt="Simak Logo"
            className="w-32 md:w-40 h-auto object-contain animate-pulse duration-1000"
          />

          {/* LOADING INDICATOR & STATUS */}
          <div className="flex flex-col items-center gap-3">
            <IconLoading className="w-7 h-7 animate-spin text-sea-green-400" />
            <span className="text-xs font-medium tracking-widest uppercase text-sea-green-300/70">
              Loading...
            </span>
          </div>
        </div>
      </div>
    );
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
