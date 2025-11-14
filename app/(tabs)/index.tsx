import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Animated } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { BlurView } from 'expo-blur';

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Animation values
  const menuOpacity = new Animated.Value(1);
  const gameUIOpacity = new Animated.Value(0);
  const blurIntensity = new Animated.Value(100);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleStartPlaying = () => {
    setIsPlaying(true);

    // Animate transitions
    Animated.parallel([
      // Fade out menu
      Animated.timing(menuOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      // Remove blur
      Animated.timing(blurIntensity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: false,
      }),
      // Fade in game UI
      Animated.timing(gameUIOpacity, {
        toValue: 1,
        duration: 500,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

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
        {/* Blur overlay when not playing */}
        <Animated.View 
          style={[
            styles.blurContainer,
            { opacity: isPlaying ? 0 : 1 }
          ]}
          pointerEvents={isPlaying ? 'none' : 'auto'}
        >
          <BlurView intensity={100} style={styles.blur} />
        </Animated.View>

        {/* Main Menu (Before Playing) */}
        <Animated.View 
          style={[
            styles.menuContainer,
            { opacity: menuOpacity },
            !isPlaying && styles.visible
          ]}
          pointerEvents={isPlaying ? 'none' : 'auto'}
        >
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Roc Spirit:</Text>
            <Text style={styles.subtitle}>AR Campus Quest</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={handleStartPlaying}
            >
              <Text style={styles.playButtonText}>🎮 Start Playing</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.placeholderButton}
              disabled
            >
              <Text style={styles.placeholderButtonText}>Coming Soon</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Game UI (During Playing) */}
        <Animated.View 
          style={[
            styles.gameUIContainer,
            { opacity: gameUIOpacity }
          ]}
          pointerEvents={isPlaying ? 'auto' : 'none'}
        >
          {/* Top bar */}
          <View style={styles.topBar}>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>Score</Text>
              <Text style={styles.scoreValue}>0</Text>
            </View>
            
            <View style={styles.collectiblesContainer}>
              <Text style={styles.collectiblesText}>📦 0/10</Text>
            </View>
          </View>

          {/* Bottom actions */}
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>🗺️ Map</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>🎒 Inventory</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, styles.menuButton]}
              onPress={() => {
                setIsPlaying(false);
                menuOpacity.setValue(1);
                gameUIOpacity.setValue(0);
                blurIntensity.setValue(100);
              }}
            >
              <Text style={styles.actionButtonText}>⏸️ Menu</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
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
  visible: {
    display: 'flex',
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
  playButton: {
    backgroundColor: 'rgba(255, 215, 0, 0.95)',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  playButtonText: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  placeholderButton: {
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  placeholderButtonText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 18,
    fontWeight: '600',
  },

  // Game UI Styles
  gameUIContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  scoreContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  scoreLabel: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  scoreValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  collectiblesContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  collectiblesText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 40,
    paddingHorizontal: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuButton: {
    backgroundColor: 'rgba(255, 107, 107, 0.8)',
    borderColor: 'rgba(255, 107, 107, 0.4)',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
