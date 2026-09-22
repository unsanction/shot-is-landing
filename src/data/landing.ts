import type { Creator, NavLink, ReelVideo, Stat } from '../types/content';

export const navLinks: NavLink[] = [
  { href: '/#product', label: 'Product' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/ai-ugc-ads', label: 'Managed Studio' },
  // One entry, not two: /learn is the hub over both screencasts and articles.
  // The article archive still lives at /blog and is linked from the hub and footer.
  { href: '/learn', label: 'Learn' },
  // Keep the studio last: HomeNav pulls it off the end as the CTA and renders the
  // rest as the menu, so inserting after this would drop a link from both.
  { href: 'https://studio.shot.is/', label: 'Open Studio' },
];

/** Frames lifted straight out of shipped campaign cuts — no stock photography. */
export const creators: Creator[] = [
  {
    name: 'PRODUCT HERO',
    description: 'Packshot campaigns // neon studio look, 9:16',
    alt: 'Frame from an AI-generated energy drink packshot ad on a neon backdrop',
    image: '/media/work/case-neon.jpg',
  },
  {
    name: 'CHARACTER SPOT',
    description: 'Brand mascot as a repeatable persona',
    alt: 'Frame from an AI-generated character-led energy drink ad in a retro gaming room',
    image: '/media/work/case-retro.jpg',
    lifted: true,
  },
  {
    name: 'CREATOR UGC',
    description: 'Virtual influencer personas // testimonial ads',
    alt: 'Frame from an AI-generated creator UGC ad shot in a bar interior',
    image: '/media/work/case-ugc.jpg',
  },
];

/** Scenes cut from a shipped 9:16 campaign, so the strip shows real variety. */
export const reelVideos: ReelVideo[] = [
  { src: '/media/work/reel-01.mp4', poster: '/media/work/reel-01.jpg' },
  { src: '/media/work/reel-02.mp4', poster: '/media/work/reel-02.jpg' },
  { src: '/media/work/reel-03.mp4', poster: '/media/work/reel-03.jpg' },
  { src: '/media/reel/visual-overload.mp4', poster: '/media/reel/visual-overload-poster.jpg' },
  { src: '/media/work/reel-04.mp4', poster: '/media/work/reel-04.jpg' },
  { src: '/media/work/reel-05.mp4', poster: '/media/work/reel-05.jpg' },
  { src: '/media/work/reel-06.mp4', poster: '/media/work/reel-06.jpg' },
];

export const stats: Stat[] = [
  { value: '8 DAYS', label: '18 ad concepts delivered', sub: 'DTC ecommerce launch, against a 4-week traditional shoot quote' },
  { value: '31%', label: 'Lower CPI', sub: 'Mobile gaming studio, 6 AI hook variants shipped per week' },
  { value: '1.7x', label: 'ROAS lift', sub: 'Best-performing AI variant vs. baseline, DTC ecommerce brand' },
  { value: '6/WK', label: 'Hook variants shipped', sub: 'Typical ongoing cadence per creator persona' },
];
