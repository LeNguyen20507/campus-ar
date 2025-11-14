/**
 * AR Poster Target Registration
 */

import { ViroARTrackingTargets } from '@reactvision/react-viro';

export const POSTER_TARGET = 'rockyPoster';

ViroARTrackingTargets.createTargets({
  rockyPoster: {
    source: require('../assets/posters/rockyPoster.png'),
    orientation: 'Up',
    physicalWidth: 0.135, // 13.5cm average of your 12-15cm poster
  },
});
