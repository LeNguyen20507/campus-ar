import React, { useEffect } from 'react';
import { ViroARScene, ViroBox, ViroAmbientLight, ViroMaterials } from '@reactvision/react-viro';

ViroMaterials.createMaterials({
  gold: {
    diffuseColor: '#FFD700',
  },
});

export default function TestARScene() {
  useEffect(() => {
    console.log('🧪 Test AR Scene MOUNTED');
    return () => console.log('🧪 Test AR Scene UNMOUNTED');
  }, []);

  return (
    <ViroARScene
      onTrackingUpdated={(state, reason) => {
        console.log('📍 AR Tracking State:', state);
        console.log('📍 AR Tracking Reason:', reason);
      }}
    >
      <ViroAmbientLight color="#ffffff" intensity={1000} />
      
      {/* Big bright cube that should be impossible to miss */}
      <ViroBox
        position={[0, 0, -1]}
        scale={[0.3, 0.3, 0.3]}
        materials={['gold']}
      />
    </ViroARScene>
  );
}
