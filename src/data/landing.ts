import type { Creator, NavLink, ReelVideo, Stat } from '../types/content';

export const navLinks: NavLink[] = [
  { href: '/ai-ugc-ads', label: 'AI UGC Ads' },
  { href: '/#services', label: 'Services' },
  { href: '/#workflow', label: 'Workflow' },
  { href: '/blog', label: 'Blog' },
  { href: 'https://studio.shot.is/', label: 'Open Studio' },
];

export const creators: Creator[] = [
  {
    name: 'VEXA-9',
    description: 'AI fashion creator // premium launch visuals',
    alt: 'Virtual fashion creator for AI UGC ads and product launch content',
    image:
      'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'KAI_OS',
    description: 'AI streetwear creator // short-form ad energy',
    alt: 'Virtual streetwear creator built for short-form AI video ads',
    image:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000',
    lifted: true,
  },
  {
    name: 'LUNA_CORE',
    description: 'AI cinematic creator // concept-led campaigns',
    alt: 'Cinematic virtual influencer for AI content campaigns',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
  },
];

export const reelVideos: ReelVideo[] = [
  { src: '/media/reel/visual-overload.mp4', poster: '/media/reel/visual-overload-poster.jpg' },
];

export const stats: Stat[] = [
  { value: '8 DAYS', label: '18 ad concepts delivered', sub: 'DTC ecommerce launch — vs. a 4-week traditional shoot quote' },
  { value: '31%', label: 'Lower CPI', sub: 'Mobile gaming studio, 6 AI hook variants shipped per week' },
  { value: '1.7x', label: 'ROAS lift', sub: 'Best-performing AI variant vs. baseline, DTC ecommerce brand' },
  { value: '6/WK', label: 'Hook variants shipped', sub: 'Typical ongoing cadence per creator persona' },
];
