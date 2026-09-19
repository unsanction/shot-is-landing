export const studioUrl = 'https://studio.shot.is/';

export const launchOffer = {
  label: 'Launch offer',
  price: '$4.99',
  priceValue: '4.99',
  currency: 'USD',
  unit: 'per video',
  note: 'Limited-time self-serve price. Studio shows the model, duration, and credit cost before you generate.',
};

export type PricingOption = {
  id: 'single' | 'packs' | 'managed';
  eyebrow: string;
  title: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  studio: boolean;
  featured?: boolean;
};

export const pricingOptions: PricingOption[] = [
  {
    id: 'single',
    eyebrow: 'Self-serve',
    title: 'One AI video',
    price: launchOffer.price,
    unit: launchOffer.unit,
    description:
      'Start with one real generation instead of a subscription. Bring a prompt or a reference, pick the model, and see the cost before the run starts.',
    features: [
      'No monthly plan required for the launch offer',
      'Reference-aware image-to-video workflows',
      'Model and credit cost visible before generation',
    ],
    cta: 'Create a $4.99 video',
    href: studioUrl,
    studio: true,
    featured: true,
  },
  {
    id: 'packs',
    eyebrow: 'For testing volume',
    title: 'Video packs',
    price: 'Volume pricing',
    unit: 'live in Studio',
    description:
      'Buy a video pack when one concept needs several hooks, scenes, or creator variants. Pack sizes and checkout pricing stay visible inside Studio.',
    features: [
      'Built for multi-variant creative testing',
      'Credits can be routed across supported models',
      'Current package pricing shown at checkout',
    ],
    cta: 'See video packs',
    href: studioUrl,
    studio: true,
  },
  {
    id: 'managed',
    eyebrow: 'Done for you',
    title: 'Managed production',
    price: 'Custom',
    unit: 'per campaign brief',
    description:
      'SHOT.IS plans, generates, reviews, and assembles your campaign when you want finished ad variants instead of another production tool to operate.',
    features: [
      'Creative direction and shot planning',
      'Human QA for faces, products, and continuity',
      'Finished edits and named testing variants',
    ],
    cta: 'Brief the managed studio',
    href: '/contact',
    studio: false,
  },
];

export const pricingPageMeta = {
  path: '/pricing',
  dateModified: '2026-08-25',
  title: 'SHOT.IS Pricing: AI Videos from $4.99',
  description:
    'Make one AI video for $4.99 during the SHOT.IS launch offer, choose volume video packs in Studio, or brief our team for campaign-ready ad variants.',
};
