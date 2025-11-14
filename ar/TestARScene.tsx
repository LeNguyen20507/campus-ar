import React from 'react';
import { ViroARScene, ViroBox, ViroAmbientLight } from '@reactvision/react-viro';

export default function TestARScene() {
  console.log('🧪 Test AR Scene loaded');
  
  return (
    <ViroARScene
      onTrackingUpdated={(state, reason) => {
        console.log('📍 AR State:', state, 'Reason:', reason);
      }}
    >
      <ViroAmbientLight color="#ffffff" intensity={500} />
      
      {/* This box should appear 1 meter in front of you */}
      <ViroBox
        position={[0, 0, -1]}
        scale={[0.2, 0.2, 0.2]}
        materials={['gold']}
      />
    </ViroARScene>
  );
}
