import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import { useRouter } from 'expo-router';
import GameARScene from '../ar/GameARScene';

/**
 * ARScreen (ViroARSceneNavigator)
 * 
 * Minimal AR test screen to verify device compatibility.
 * Launches ViroARSceneNavigator with a simple test scene.
 * 
 * Future features to implement:
 * - Handle AR session lifecycle (start, pause, resume)
 * - Pass user location/heading to AR scene for placement
 * - Display AR controls/UI overlay (capture, exit, inventory)
 * - Trigger haptic feedback on AR interactions
 */

export default function ARScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* AR Scene Navigator */}
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: GameARScene,
        }}
        style={styles.arView}
      />
      
      {/* Exit button overlay */}
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => router.back()}
        >
          <Text style={styles.exitText}>✕ Exit AR</Text>
        </TouchableOpacity>
        
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            🔍 Look around to find the red test box
          </Text>
          <Text style={styles.instructionText}>
            📦 Box should appear 1m in front of you
          </Text>
        </View>
      </View>
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
  exitButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  exitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  instructions: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
    borderRadius: 12,
  },
  instructionText: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 4,
  },
});
