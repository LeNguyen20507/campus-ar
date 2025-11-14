/**
 * Poster Scan Screen
 * 
 * Full-screen AR view for scanning the Meliora poster.
 * Works on both iPhone and iPad.
 * 
 * Flow:
 * 1. Camera opens
 * 2. User points at poster
 * 3. 3D model + text appears when poster is detected
 * 4. Score increases on first detection
 * 5. User can tap character for interaction
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import PosterARScene from '../ar/PosterARScene';

export default function PosterScanScreen() {
  const router = useRouter();
  const [isPosterDetected, setIsPosterDetected] = useState(false);

  const handlePosterFound = () => {
    setIsPosterDetected(true);
  };

  const handlePosterLost = () => {
    setIsPosterDetected(false);
  };

  return (
    <View style={styles.container}>
      {/* AR Camera View */}
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: () => (
            <PosterARScene
              onPosterFound={handlePosterFound}
              onPosterLost={handlePosterLost}
            />
          ),
        }}
        style={styles.arView}
      />

      {/* Status at Bottom Center */}
      <View style={styles.bottomStatus}>
        <View style={[
          styles.statusCard,
          isPosterDetected && styles.statusCardDetected
        ]}>
          <Text style={styles.statusIcon}>
            {isPosterDetected ? '✅' : '🔍'}
          </Text>
          <Text style={styles.statusText}>
            {isPosterDetected ? 'Poster Detected!' : 'Scanning...'}
          </Text>
        </View>
      </View>

      {/* Exit Button */}
      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          router.back();
        }}
      >
        <Text style={styles.exitText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  arView: {
    flex: 1,
  },

  // Bottom Status
  bottomStatus: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  statusCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statusCardDetected: {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  statusIcon: {
    fontSize: 24,
  },
  statusText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  // Exit Button
  exitButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 20,
    backgroundColor: 'rgba(255, 107, 107, 0.9)',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
});
