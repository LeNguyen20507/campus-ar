import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Campus AR</ThemedText>
        <HelloWave />
      </ThemedView>
      
      {/* AR Test Button */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🔬 Device Compatibility Test</ThemedText>
        <ThemedText>
          Test if your device supports AR by launching a simple AR scene with a test box.
        </ThemedText>
        <TouchableOpacity
          style={styles.arButton}
          onPress={() => router.push('/ar')}
        >
          <ThemedText style={styles.arButtonText}>
            🚀 Launch AR Test
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">📍 Map View (Coming Soon)</ThemedText>
        <ThemedText>
          View nearby AR spawn points and navigate to them on an interactive map.
        </ThemedText>
        <TouchableOpacity
          style={[styles.arButton, styles.disabledButton]}
          disabled
        >
          <ThemedText style={styles.arButtonText}>
            🗺️ Open Map
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  arButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  disabledButton: {
    backgroundColor: '#666',
    opacity: 0.5,
  },
  arButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
