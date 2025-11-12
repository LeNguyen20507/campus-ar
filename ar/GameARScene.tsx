import React from 'react';
import {
  ViroARScene,
  ViroBox,
  ViroAmbientLight,
  ViroText,
  ViroMaterials,
} from '@reactvision/react-viro';

/**
 * GameARScene (ViroARScene)
 * 
 * Minimal AR test scene to verify device compatibility.
 * Renders a simple box 1 meter in front of the camera.
 * 
 * Future features to implement:
 * - Load and place 3D GLB character models at calculated positions
 * - Animate characters (idle, walk, interact animations)
 * - Raycast/hit testing for user taps on characters
 * - Proximity detection (character within X meters)
 * - Capture/collection mechanics with animations
 * - Update Zustand store when character is captured
 * - Integrate placement.ts for converting lat/lng to AR coordinates
 */

// Register materials
ViroMaterials.createMaterials({
  testBox: {
    diffuseColor: '#FF6B6B',
  },
});

export default function GameARScene() {
  return (
    <ViroARScene>
      {/* Ambient light for visibility */}
      <ViroAmbientLight color="#ffffff" intensity={200} />
      
      {/* Test box positioned 1m in front of camera (negative Z axis) */}
      <ViroBox
        position={[0, 0, -1]}
        scale={[0.3, 0.3, 0.3]}
        materials={['testBox']}
      />
      
      {/* Label above the box */}
      <ViroText
        text="AR Test Box"
        position={[0, 0.3, -1]}
        scale={[0.5, 0.5, 0.5]}
        style={{
          fontFamily: 'Arial',
          fontSize: 30,
          color: '#ffffff',
        }}
      />
    </ViroARScene>
  );
}
