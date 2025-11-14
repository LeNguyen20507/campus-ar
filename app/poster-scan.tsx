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
  const [score, setScore] = useState(0);
  const [hasScannedPoster, setHasScannedPoster] = useState(false);
  const [characterTaps, setCharacterTaps] = useState(0);

  const handlePosterFirstSeen = () => {
    if (!hasScannedPoster) {
      console.log('🎉 First poster scan!');
      setHasScannedPoster(true);
      setScore((s) => s + 10);
      
      // Haptic feedback
      if (Haptics.notificationAsync) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }
  };

  const handleCharacterTapped = () => {
    console.log('👆 Character interaction');
    setCharacterTaps((c) => c + 1);
    setScore((s) => s + 5);
    
    // Haptic feedback
    if (Haptics.impactAsync) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  return (
    <View style={styles.container}>
      {/* AR Camera View */}
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: () => (
            <PosterARScene
              onPosterFirstSeen={handlePosterFirstSeen}
              onCharacterTapped={handleCharacterTapped}
            />
          ),
        }}
        style={styles.arView}
        viroAppProps={{
          onPosterFirstSeen: handlePosterFirstSeen,
          onCharacterTapped: handleCharacterTapped,
        }}
      />

      {/* HUD Overlay - Top */}
      <View style={styles.topHUD}>
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusDot}>
            {hasScannedPoster ? '🟢' : '🔴'}
          </Text>
          <Text style={styles.statusText}>
            {hasScannedPoster ? 'Poster Found!' : 'Scanning...'}
          </Text>
        </View>
      </View>

      {/* Instructions - Center */}
      {!hasScannedPoster && (
        <View style={styles.centerInstructions}>
          <Text style={styles.instructionTitle}>🎯 Find the Poster</Text>
          <Text style={styles.instructionText}>
            Point your camera at the Meliora poster
          </Text>
          <Text style={styles.instructionSubtext}>
            Works best with good lighting and a steady hand
          </Text>
        </View>
      )}

      {/* Stats - Bottom (only show after first scan) */}
      {hasScannedPoster && (
        <View style={styles.bottomHUD}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{characterTaps}</Text>
            <Text style={styles.statLabel}>Character Taps</Text>
          </View>
        </View>
      )}

      {/* Exit Button */}
      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          router.back();
        }}
      >
        <Text style={styles.exitText}>✕ Exit</Text>
      </TouchableOpacity>

      {/* Device Info (helpful for testing) */}
      {__DEV__ && (
        <View style={styles.debugInfo}>
          <Text style={styles.debugText}>
            Device: {Platform.OS === 'ios' ? (Platform.isPad ? 'iPad' : 'iPhone') : 'Android'}
          </Text>
        </View>
      )}
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

  // Top HUD
  topHUD: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  scoreCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  scoreLabel: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  scoreValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  statusCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    fontSize: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Center Instructions
  centerInstructions: {
    position: 'absolute',
    top: '40%',
    left: 20,
    right: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 24,
    borderRadius: 16,
  },
  instructionTitle: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  instructionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  instructionSubtext: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
  },

  // Bottom HUD
  bottomHUD: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    color: '#4A90E2',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },

  // Exit Button
  exitButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 20,
    backgroundColor: 'rgba(255, 107, 107, 0.9)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  exitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Debug Info
  debugInfo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    borderRadius: 8,
  },
  debugText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});
