/**
 * Simple AR Test Scene
 * Just shows text - no 3D models or image tracking
 * Use this to test if ViroReact is working at all
 */

import React from 'react';
import {
  ViroARScene,
  ViroText,
  ViroAmbientLight,
} from '@reactvision/react-viro';

export default function SimpleARScene() {
  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" intensity={200} />
      
      <ViroText
        text="AR is working! 🎉"
        position={[0, 0, -2]}
        width={2}
        height={0.5}
        style={{
          fontFamily: 'Arial',
          fontSize: 40,
          color: '#FFD700',
          textAlign: 'center',
        }}
      />
    </ViroARScene>
  );
}
