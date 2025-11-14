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
          {/* Testing GLTF format as recommended by ViroReact docs */}
          
          {/* Rocky GLTF (your model) */}
          <Viro3DObject
            source={require('../assets/models/myrocky.gltf')}
            type="GLTF"
            position={[-0.2, 0, 0.15]}
            scale={[0.1, 0.1, 0.1]}
            rotation={[0, 0, 0]}
            onLoadStart={() => console.log('🔄 Loading myrocky.gltf...')}
            onLoadEnd={() => console.log('✅ myrocky.gltf LOADED!')}
            onError={(event) => console.error('❌ myrocky.gltf error:', JSON.stringify(event.nativeEvent))}
          />
          
          {/* Test Duck GLB for comparison */}
          <Viro3DObject
            source={require('../assets/models/test.glb')}
            type="GLB"
            position={[0.2, 0, 0.15]}
            scale={[0.1, 0.1, 0.1]}
            onLoadEnd={() => console.log('✅ test.glb (Duck) LOADED')}
            onError={() => console.error('❌ test.glb FAILED')}
          />

          {/* Text showing instructions */}
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
