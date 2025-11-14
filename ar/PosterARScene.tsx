import React from 'react';
import {
  ViroARScene,
  ViroARImageMarker,
  ViroBox,
  ViroText,
  ViroAmbientLight,
  ViroMaterials,
} from '@reactvision/react-viro';

// Gold material for box
ViroMaterials.createMaterials({
  gold: {
    diffuseColor: '#FFD700',
  },
});

interface PosterARSceneProps {
  onPosterDetected?: (detected: boolean) => void;
}

export default function PosterARScene({ onPosterDetected }: PosterARSceneProps) {
  console.log('🎬 PosterARScene rendered - looking for rockyPoster');
  
  return (
    <ViroARScene
      onTrackingUpdated={(state, reason) => {
        if (state === 3) {
          console.log('📍 AR TRACKING NORMAL - Ready to detect!');
        } else {
          console.log('📍 AR Tracking:', state, 'Reason:', reason);
        }
      }}
    >
      <ViroAmbientLight color="#ffffff" intensity={1000} />

      <ViroARImageMarker
        target="rockyPoster"
        onAnchorFound={() => {
          console.log('🎉🎉🎉 POSTER FOUND!!! 🎉🎉🎉');
          onPosterDetected?.(true);
        }}
        onAnchorUpdated={() => {
          // Don't spam console
        }}
        onAnchorRemoved={() => {
          console.log('⚠️ Poster lost from view');
          onPosterDetected?.(false);
        }}
      >
        {/* Bright golden cube */}
        <ViroBox
          position={[0, 0, 0.1]}
          scale={[0.15, 0.15, 0.15]}
          materials={['gold']}
        />

        <ViroText
          text="Rocky says Hi! 🐝"
          position={[0, 0.25, 0.1]}
          width={0.6}
          height={0.1}
          style={{
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#FFD700',
          }}
        />
      </ViroARImageMarker>
    </ViroARScene>
  );
}
