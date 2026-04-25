export type Creator = {
  name: string;
  description: string;
  image: string;
  lifted?: boolean;
};

export type NavLink = {
  href: string;
  label: string;
};

export type ReelVideo = {
  src: string;
  poster: string;
};

export type SlotPhase = 'idle' | 'spinning' | 'settling';

export type Stat = {
  value: string;
  label: string;
  sub: string;
};

export type TweakState = {
  surface: string;
  glitch: string;
  scan: string;
  crt: string;
  grain: string;
  word: string;
};

export type TweakGroup = {
  key: keyof TweakState;
  label: string;
  options: Array<{ label: string; value: string }>;
};
