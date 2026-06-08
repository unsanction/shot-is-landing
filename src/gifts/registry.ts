import type { ComponentType } from 'react';
import type { GiftPageContent } from '../data/gifts';
import { VarkaGiftPage } from './varka/VarkaGiftPage';

/**
 * Maps a gift slug to a fully bespoke, brand-native page component.
 *
 * The goal of the gift-page factory is EXCLUSIVITY: a page that looks like the
 * recipient brand designed it. A shared template with swapped colors can't do
 * that — so each premium brand gets its own component here, designed in its own
 * palette, type, and rhythm (see src/gifts/<brand>/).
 *
 * Slugs absent from this map fall back to the generic GiftPage template in
 * src/pages/GiftPage.tsx (fine for low-touch/internal pages, never for a
 * "super exclusive" seed page).
 */
export const bespokeGiftPages: Record<string, ComponentType<{ page: GiftPageContent }>> = {
  varka: VarkaGiftPage,
};
