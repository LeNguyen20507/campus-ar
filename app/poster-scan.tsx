import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import { useRouter } from 'expo-router';
import PosterARScene from '../ar/PosterARScene';
import TestARScene from '../ar/TestARScene';
import '../ar/posterTargets'; // Initialize tracking targets

export default function PosterScanScreen() {
  const router = useRouter();
  const [isDetected, setIsDetected] = useState(false);
  const [useTest, setUseTest] = useState(false); // Toggle between test and poster

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: () => useTest ? <TestARScene /> : <PosterARScene onPosterDetected={setIsDetected} />,
        }}
        style={styles.ar}
      />

      {/* Status */}
      <View style={styles.status}>
        <Text style={styles.statusText}>
          {useTest ? '🧪 Test Mode' : (isDetected ? '✅ Poster Detected!' : '🔍 Scanning...')}
        </Text>
      </View>

      {/* Toggle Test Mode */}
      <TouchableOpacity 
        style={styles.testBtn} 
        onPress={() => {
          setUseTest(!useTest);
          console.log('Switching to:', !useTest ? 'TEST MODE' : 'POSTER MODE');
        }}
      >
        <Text style={styles.testText}>{useTest ? '📸 Poster' : '🧪 Test'}</Text>
      </TouchableOpacity>

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
  testBtn: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    backgroundColor: 'rgba(0,100,255,0.8)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  testText: {
    color: '#fff',
    fontSize: 16,
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
