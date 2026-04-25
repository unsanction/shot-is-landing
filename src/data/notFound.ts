import type { TweakGroup, TweakState } from '../types/content';

export const tweakDefaults: TweakState = {
  surface: 'dark',
  glitch: 'on',
  scan: 'off',
  crt: 'on',
  grain: 'on',
  word: 'GONE.',
};

export const tweakGroups: TweakGroup[] = [
  {
    key: 'surface',
    label: 'Surface',
    options: [
      { label: 'Dark', value: 'dark' },
      { label: 'Inverted', value: 'light' },
    ],
  },
  {
    key: 'glitch',
    label: 'Glitch',
    options: [
      { label: 'On', value: 'on' },
      { label: 'Off', value: 'off' },
    ],
  },
  {
    key: 'scan',
    label: 'Scanline',
    options: [
      { label: 'On', value: 'on' },
      { label: 'Off', value: 'off' },
    ],
  },
  {
    key: 'crt',
    label: 'CRT lines',
    options: [
      { label: 'On', value: 'on' },
      { label: 'Off', value: 'off' },
    ],
  },
  {
    key: 'grain',
    label: 'Grain',
    options: [
      { label: 'On', value: 'on' },
      { label: 'Off', value: 'off' },
    ],
  },
  {
    key: 'word',
    label: 'Slot Word',
    options: [
      { label: 'Missing', value: 'MISSING.' },
      { label: 'Gone', value: 'GONE.' },
      { label: 'Burned', value: 'BURNED.' },
      { label: 'Off-frame', value: 'OFF-FRAME.' },
    ],
  },
];
