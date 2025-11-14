import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import { useRouter } from 'expo-router';
import PosterARScene from '../ar/PosterARScene';
import '../ar/posterTargets'; // Initialize tracking targets

export default function PosterScanScreen() {
  const router = useRouter();
  const [isDetected, setIsDetected] = useState(false);

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: () => <PosterARScene onPosterDetected={setIsDetected} />,
        }}
        style={styles.ar}
      />

      {/* Status */}
      <View style={styles.status}>
        <Text style={styles.statusText}>
          {isDetected ? '✅ Poster Detected!' : '🔍 Scanning...'}
        </Text>
      </View>

      {/* Exit */}
      <TouchableOpacity style={styles.exit} onPress={() => router.back()}>
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
  ar: {
    flex: 1,
  },
  status: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  exit: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'rgba(255,0,0,0.8)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitText: {
    color: '#fff',
    fontSize: 24,
  },
});
