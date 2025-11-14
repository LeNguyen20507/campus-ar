/**
 * AR Poster Target Registration
 * 
 * Register your poster image as an AR tracking target.
 * Viro will recognize this image in the real world and anchor content to it.
 * 
 * Setup:
 * 1. Take a clear, straight-on photo of your poster
 * 2. Save it as: assets/posters/melioraPoster.png
 * 3. Measure the physical printed width in meters (e.g., 24 inches ≈ 0.61m)
 * 4. Update physicalWidth below to match
 */

import { ViroARTrackingTargets } from '@reactvision/react-viro';

export const POSTER_TARGET_ID = 'rockyPoster';

// Register the tracking target
ViroARTrackingTargets.createTargets({
  [POSTER_TARGET_ID]: {
    source: require('../assets/posters/rockyPoster.png'),
    orientation: 'Up',        // Poster is vertical on wall
    physicalWidth: 0.61,      // IMPORTANT: Measure your actual printed poster width in meters
                              // 24 inches = ~0.61m, 18 inches = ~0.46m, 12 inches = ~0.30m
  },
});

// You can add more posters here:
/*
export const POSTER_TARGET_ROCKY = 'rockyPoster';
ViroARTrackingTargets.createTargets({
  [POSTER_TARGET_ROCKY]: {
    source: require('../assets/posters/rockyPoster.png'),
    orientation: 'Up',
    physicalWidth: 0.50,
  },
});
*/
