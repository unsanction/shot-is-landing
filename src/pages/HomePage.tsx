import { HeroSection } from '../components/home/HeroSection';
import { CanvasDemoSection } from '../components/home/CanvasDemoSection';
import { HomeFooter } from '../components/home/HomeFooter';
import { HomeNav } from '../components/home/HomeNav';
import { JoinSection } from '../components/home/JoinSection';
import { RosterSection } from '../components/home/RosterSection';
import { SeoGrowthSection } from '../components/home/SeoGrowthSection';
import { StatsSection } from '../components/home/StatsSection';
import { VisionSection } from '../components/home/VisionSection';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

function HomePage() {
  useRevealOnScroll();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grain" aria-hidden="true" />

      <HomeNav />

      <main className="bg-black">
        <HeroSection />
        <CanvasDemoSection />
        <RosterSection />
        <VisionSection />
        <SeoGrowthSection />
        <StatsSection />
        <JoinSection />
      </main>

      <HomeFooter />
    </div>
  );
}

export default HomePage;
