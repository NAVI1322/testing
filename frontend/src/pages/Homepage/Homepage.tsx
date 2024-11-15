// UI Components
import { Timeline } from '../../components/ui/timeline';
import CarouselSize from '../../components/majorComponents/Carousel';
import Navbar from '../../components/majorComponents/Navbar';
import Footer from '../../components/majorComponents/Footer';

// Feature Components
import HeroSection from '../../components/majorComponents/HeroSection';
import FeatureSection from '../../components/majorComponents/FeatureSection';
import Testimonials from '../../components/majorComponents/Testimonials';
import Pricing from '../../components/majorComponents/Pricing';
import TextBreak from '../../components/majorComponents/TextBreak';
import { Workflow } from 'lucide-react';

// Demo Components
import { GlobeDemo } from '../../components/majorComponents/Globe';
import { CardHoverEffectDemo } from '../../components/majorComponents/HoverEffect';
import { MarqueeDemo } from '../../components/majorComponents/Marqe';
import { sections, timelineData } from "@/constants";
import React from 'react';

const HomePage = () => (
  <div>
    <Navbar />
    <div className="max-w-7xl mx-auto pt-20 px-6">
      <HeroSection />
      {sections.map(({ left, right }, index) => (
        <React.Fragment key={index}>
          <TextBreak lefttext={left} righttext={right} />
          {index === 1 && <MarqueeDemo />}
          {index === 2 && <Timeline data={timelineData} />}
          {index === 3 && (
            <div className='p-10'>
              <CarouselSize />
            </div>
          )}
          {index === 4 && <FeatureSection />}
        </React.Fragment>
      ))}
      <CardHoverEffectDemo />
      <Workflow />
      <Pricing />
      <Testimonials />
      <GlobeDemo />/
      <Footer />
    </div>
  </div>
);

export default HomePage;
