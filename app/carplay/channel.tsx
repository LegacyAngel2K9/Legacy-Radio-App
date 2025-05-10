import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useVoice } from '@/context/VoiceContext';
import { colors } from '@/constants/Colors';
import CarPlayPTTButton from '@/components/carplay/CarPlayPTTButton';

export default function CarPlayChannelScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentChannel, isSpeaking } = useVoice();

  // CarPlay is only available on iOS
  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.channelName}>
        {currentChannel?.name || 'Loading...'}
      </Text>
      <CarPlayPTTButton />
      {isSpeaking && (
        <Text style={styles.speakingIndicator}>
          Transmitting...
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: colors.text.primary,
    marginBottom: 32,
  },
  speakingIndicator: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: colors.error,
    marginTop: 16,
  },
});