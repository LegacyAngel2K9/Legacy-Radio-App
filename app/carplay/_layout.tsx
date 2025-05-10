import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { useVoice } from '@/context/VoiceContext';

export default function CarPlayLayout() {
  // CarPlay is only available on iOS
  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="channel" />
    </Stack>
  );
}