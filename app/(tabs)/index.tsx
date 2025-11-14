import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>No access to camera</Text>
        <Text style={styles.errorSubtext}>Please enable camera permissions in settings</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera Background */}
      <CameraView style={styles.camera} facing="back">
        {/* Blur overlay */}
        <View style={styles.blurContainer}>
          <BlurView intensity={100} style={styles.blur} />
        </View>

        {/* Main Menu */}
        <View style={styles.menuContainer}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Roc Spirit:</Text>
            <Text style={styles.subtitle}>AR Campus Quest</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push('/poster-scan');
              }}
            >
              <Text style={styles.scanButtonText}>📸 Scan Poster</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.mapButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                // TODO: Navigate to map
              }}
            >
              <Text style={styles.mapButtonText}>🗺️ Map View</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorSubtext: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  blur: {
    flex: 1,
  },
  
  // Main Menu Styles
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 16,
  },
  scanButton: {
    backgroundColor: 'rgba(74, 144, 226, 0.95)',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  mapButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.95)',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
