export type Creator = {
  name: string;
  description: string;
  alt: string;
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

export type Stat = {
  value: string;
  label: string;
  sub: string;
};
