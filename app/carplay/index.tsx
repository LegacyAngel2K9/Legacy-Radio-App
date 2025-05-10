import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useVoice } from '@/context/VoiceContext';
import { colors } from '@/constants/Colors';
import CarPlayManager from '@/components/carplay/CarPlayManager';

export default function CarPlayHomeScreen() {
  const router = useRouter();
  const { currentServer, currentChannel } = useVoice();

  // CarPlay is only available on iOS
  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <View style={styles.container}>
      <CarPlayManager />
      <Text style={styles.status}>
        {currentServer ? `Connected to ${currentServer.name}` : 'Not connected to a server'}
      </Text>
      {currentChannel && (
        <Text style={styles.channel}>
          Active Channel: {currentChannel.name}
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
  status: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.text.primary,
    marginBottom: 12,
  },
  channel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.text.secondary,
  },
});