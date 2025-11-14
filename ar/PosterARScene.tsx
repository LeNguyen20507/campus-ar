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
import rockyModel from '../assets/models/rocky.glb';

interface PosterARSceneProps {
  onPosterFirstSeen?: () => void;
  onCharacterTapped?: () => void;
}

export default function PosterARScene({
  onPosterFirstSeen,
  onCharacterTapped,
}: PosterARSceneProps) {
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  const handleAnchorFound = () => {
    console.log('✅ Poster detected!');
    setIsTracking(true);
    
    if (!hasTriggered) {
      setHasTriggered(true);
      onPosterFirstSeen?.();
    }
  };

  const handleAnchorUpdated = () => {
    // Poster is being tracked (camera can see it)
    if (!isTracking) {
      setIsTracking(true);
    }
  };

  const handleAnchorRemoved = () => {
    console.log('⚠️ Poster lost - move closer or adjust angle');
    setIsTracking(false);
  };

  const handleCharacterClick = () => {
    console.log('🎭 Character tapped!');
    onCharacterTapped?.();
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
        {/*
          Coordinate system relative to poster center:
          - X: left (-) / right (+)
          - Y: down (-) / up (+)
          - Z: into poster (-) / out toward camera (+)
          
          Poster center is at (0, 0, 0)
        */}
        <ViroNode position={[0, 0, 0]}>
          {/* Rocky 3D Character Model */}
          <Viro3DObject
            source={rockyModel}
            type="GLB"
            position={[-0.2, 0, 0]}
            scale={[0.1, 0.1, 0.1]}
            onClick={handleCharacterClick}
          />

          {/* Welcome Text Box - positioned to the right of model */}
          {/* Welcome Text Box - positioned to the right of model */}
          <ViroText
            text="Welcome to Roc Spirit!"
            width={0.5}
            height={0.25}
            position={[0.2, 0.2, 0]}
            style={{
              fontFamily: 'Arial',
              fontSize: 28,
              color: '#FFD700',
              textAlign: 'center',
            }}
          />

          {/* Subtitle text */}
          <ViroText
            text="Tap the character to begin your quest!"
            width={0.5}
            height={0.15}
            position={[0.2, 0.05, 0]}
            style={{
              fontFamily: 'Arial',
              fontSize: 20,
              color: '#ffffff',
              textAlign: 'center',
            }}
          />

          {/* Optional: Instruction text if poster is not fully visible */}
          {!isTracking && (
            <ViroText
              text="Keep poster in view..."
              position={[0, -0.3, 0]}
              width={0.6}
              style={{
                fontFamily: 'Arial',
                fontSize: 18,
                color: '#FF6B6B',
                textAlign: 'center',
              }}
            />
          )}
        </ViroNode>
      </ViroARImageMarker>
    </ViroARScene>
  );
}
