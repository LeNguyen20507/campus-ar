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
  ViroBox,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroMaterials,
} from '@reactvision/react-viro';
import { POSTER_TARGET_ID } from './posterTargets';

// Register a material for the box
ViroMaterials.createMaterials({
  rocky: {
    diffuseColor: '#FFD700',
  },
});

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
      {/* Very bright lighting */}
      <ViroAmbientLight color="#ffffff" intensity={1000} />
      <ViroDirectionalLight
        color="#ffffff"
        direction={[0, 0, -1]}
        intensity={1000}
      />

      {/* AR Image Marker - Everything inside is locked to the poster */}
      <ViroARImageMarker
        target={POSTER_TARGET_ID}
        onAnchorFound={handleAnchorFound}
        onAnchorUpdated={handleAnchorUpdated}
        onAnchorRemoved={handleAnchorRemoved}
      >
        <ViroNode position={[0, 0, 0]}>
          {/* Test all models at once - see which ones load */}
          
          {/* 1. Test Duck (known-good) */}
          <Viro3DObject
            source={require('../assets/models/test.glb')}
            type="GLB"
            position={[-0.3, 0.15, 0.1]}
            scale={[0.05, 0.05, 0.05]}
            onLoadEnd={() => console.log('✅ test.glb (Duck) WORKS!')}
            onError={() => console.error('❌ test.glb FAILED')}
          />
          
          {/* 2. Rocky */}
          <Viro3DObject
            source={require('../assets/models/rocky.glb')}
            type="GLB"
            position={[-0.15, 0.15, 0.1]}
            scale={[0.05, 0.05, 0.05]}
            onLoadEnd={() => console.log('✅ rocky.glb WORKS!')}
            onError={() => console.error('❌ rocky.glb FAILED')}
          />
          
          {/* 3. Flower */}
          <Viro3DObject
            source={require('../assets/models/flower.glb')}
            type="GLB"
            position={[0, 0.15, 0.1]}
            scale={[0.05, 0.05, 0.05]}
            onLoadEnd={() => console.log('✅ flower.glb WORKS!')}
            onError={() => console.error('❌ flower.glb FAILED')}
          />
          
          {/* 4. Teacher */}
          <Viro3DObject
            source={require('../assets/models/teacher.glb')}
            type="GLB"
            position={[0.15, 0.15, 0.1]}
            scale={[0.05, 0.05, 0.05]}
            onLoadEnd={() => console.log('✅ teacher.glb WORKS!')}
            onError={() => console.error('❌ teacher.glb FAILED')}
          />
          
          {/* 5. Ghost (might be too large) */}
          <Viro3DObject
            source={require('../assets/models/ghost_ur.glb')}
            type="GLB"
            position={[0.3, 0.15, 0.1]}
            scale={[0.05, 0.05, 0.05]}
            onLoadEnd={() => console.log('✅ ghost_ur.glb WORKS!')}
            onError={() => console.error('❌ ghost_ur.glb FAILED')}
          />

          {/* Text Box - shows which models loaded */}
          <ViroText
            text="Hey! I'm Rocky! 🎉"
            width={0.4}
            height={0.2}
            position={[0.2, 0, 0.1]}
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
