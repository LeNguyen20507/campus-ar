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
  console.log('🎬 PosterARScene rendered');
  
  return (
    <ViroARScene
      onTrackingUpdated={(state, reason) => {
        console.log('📍 AR Tracking:', state, reason);
      }}
    >
      <ViroAmbientLight color="#ffffff" intensity={500} />

      <ViroARImageMarker
        target="rockyPoster"
        onAnchorFound={() => {
          console.log('✅✅✅ POSTER FOUND! ✅✅✅');
          onPosterDetected?.(true);
        }}
        onAnchorUpdated={(anchor) => {
          console.log('🔄 Poster tracking updated:', anchor);
        }}
        onAnchorRemoved={() => {
          console.log('❌ Poster lost');
          onPosterDetected?.(false);
        }}
      >
        {/* Golden cube appears on poster */}
        <ViroBox
          position={[0, 0, 0.1]}
          scale={[0.1, 0.1, 0.1]}
          materials={['gold']}
        />

        {/* Text above cube */}
        <ViroText
          text="Rocky says Hi! 🐝"
          position={[0, 0.15, 0.1]}
          width={0.5}
          height={0.1}
          style={{
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#FFD700',
          }}
        />
      </ViroARImageMarker>
    </ViroARScene>
  );
}
