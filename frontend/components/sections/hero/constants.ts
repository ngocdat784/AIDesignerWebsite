/**
 * Hero Section Constants
 */

export const HERO_SECTION_ID = "hero";

export const HERO_MIN_HEIGHT =
  "min-h-[calc(100vh-72px)]";

export const HERO_CONTAINER =
  "mx-auto max-w-7xl px-6";

export const HERO_PREVIEW_ANIMATION_DURATION = 0.35;

export const HERO_PARTICLE_COUNT = 24;

export const HERO_GRADIENT_BLUR = 180;

export const HERO_BACKGROUND_OPACITY = 0.7;

export const HERO_TRUSTED_AUTOPLAY_DELAY = 3000;

export const HERO_STATS_ANIMATION_DELAY = 120;

export const HERO_BUTTON_RADIUS = "rounded-2xl";

export const HERO_PREVIEW_RADIUS = "rounded-3xl";

export const HERO_BADGE_RADIUS = "rounded-full";

export const HERO_Z_INDEX = {
  background: 0,
  gradient: 1,
  particles: 2,
  content: 10,
  preview: 20,
} as const;

export const HERO_BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
} as const;

export const HERO_PREVIEW_CARD_HEIGHT = {
  mobile: 180,
  desktop: 240,
} as const;