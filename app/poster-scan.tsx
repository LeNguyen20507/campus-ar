import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function PosterScanScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Camera */}
      <CameraView style={styles.camera} facing="back" />

      {/* Status */}
      <View style={styles.status}>
        <Text style={styles.statusText}>🔍 Scanning...</Text>
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
  camera: {
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
