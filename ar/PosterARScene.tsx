/**
 * Poster AR Scene
 * 
 * Main AR scene that detects the Meliora poster and displays:
 * - 3D character model
 * - Welcome text box
 * - Interactive elements
 * 
 * Works on both iPhone and iPad - AR content stays anchored to the poster
 */

import React, { useState } from 'react';
import {
  ViroARScene,
  ViroARImageMarker,
  ViroNode,
  ViroText,
  Viro3DObject,
  ViroAmbientLight,
  ViroDirectionalLight,
} from '@reactvision/react-viro';
import { POSTER_TARGET_ID } from './posterTargets';

interface PosterARSceneProps {
  onPosterFound?: () => void;
  onPosterLost?: () => void;
}

export default function PosterARScene({
  onPosterFound,
  onPosterLost,
}: PosterARSceneProps) {
  const [isTracking, setIsTracking] = useState(false);

  const handleAnchorFound = () => {
    console.log('✅ Poster detected!');
    setIsTracking(true);
    onPosterFound?.();
  };

  const handleAnchorUpdated = () => {
    if (!isTracking) {
      setIsTracking(true);
      onPosterFound?.();
    }
  };

  const handleAnchorRemoved = () => {
    console.log('⚠️ Poster lost');
    setIsTracking(false);
    onPosterLost?.();
  };

  return (
    <ViroARScene>
      {/* Lighting - so 3D model isn't too dark */}
      <ViroAmbientLight color="#ffffff" intensity={500} />
      <ViroDirectionalLight
        color="#ffffff"
        direction={[0, -1, -0.2]}
        intensity={800}
      />

      {/* AR Image Marker - Everything inside is locked to the poster */}
      <ViroARImageMarker
        target={POSTER_TARGET_ID}
        onAnchorFound={handleAnchorFound}
        onAnchorUpdated={handleAnchorUpdated}
        onAnchorRemoved={handleAnchorRemoved}
      >
        <ViroNode position={[0, 0, 0]}>
          {/* Rocky 3D Character Model - Left side */}
          <Viro3DObject
            source={require('../assets/models/rocky.glb')}
            type="GLB"
            position={[-0.15, 0, 0]}
            scale={[0.08, 0.08, 0.08]}
          />

          {/* Text Box - Right side */}
          <ViroText
            text="Hey! I'm Rocky! 🎉"
            width={0.4}
            height={0.2}
            position={[0.15, 0, 0]}
            style={{
              fontFamily: 'Arial',
              fontSize: 24,
              color: '#FFD700',
              textAlign: 'center',
            }}
          />
        </ViroNode>
      </ViroARImageMarker>
    </ViroARScene>
  );
}
