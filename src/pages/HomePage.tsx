import { HeroSection } from '../components/home/HeroSection';
import { HomeFooter } from '../components/home/HomeFooter';
import { HomeNav } from '../components/home/HomeNav';
import { JoinSection } from '../components/home/JoinSection';
import { RosterSection } from '../components/home/RosterSection';
import { SlotStatementSection } from '../components/home/SlotStatementSection';
import { StatsSection } from '../components/home/StatsSection';
import { VisionSection } from '../components/home/VisionSection';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

function HomePage() {
  useRevealOnScroll();

  return (
    <div className="min-h-screen bg-black text-white selection:text-accent">
      <div className="grain" aria-hidden="true" />

      <HomeNav />

      <main className="bg-black">
        <HeroSection />
        <RosterSection />
        <VisionSection />
        <StatsSection />
        <SlotStatementSection />
        <JoinSection />
      </main>

      <HomeFooter />
    </div>
  );
}

export default HomePage;
