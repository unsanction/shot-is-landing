import type { Creator, NavLink, ReelVideo, Stat } from '../types/content';

export const navLinks: NavLink[] = [
  { href: '#roster', label: 'The Roster' },
  { href: '#vision', label: 'Vision' },
  { href: '#join', label: 'Join Circle' },
];

export const creators: Creator[] = [
  {
    name: 'VEXA-9',
    description: 'Cyber-High-End Influencer // 12.4M reach',
    image:
      'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'KAI_OS',
    description: 'Digital Rebel // Trend Saboteur',
    image:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000',
    lifted: true,
  },
  {
    name: 'LUNA_CORE',
    description: 'Virtual Oracle // High-Concept Video',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
  },
];

export const reelVideos: ReelVideo[] = [
  { src: '/media/reel/visual-overload.mp4', poster: '/media/reel/visual-overload-poster.jpg' },
];

export const slotResults = ['READY', 'PERFECT', '67', 'VIRAL'];

export const stats: Stat[] = [
  { value: '847M+', label: 'Total Reach', sub: 'Across all platforms' },
  { value: '12.4M', label: 'Avg. Engagement', sub: 'Per campaign cycle' },
  { value: '340%', label: 'ROI Increase', sub: 'vs. traditional creators' },
  { value: '96%', label: 'Client Retention', sub: 'Year over year' },
  { value: '∞', label: 'Potential', sub: 'No ceiling. No limit.' },
];
