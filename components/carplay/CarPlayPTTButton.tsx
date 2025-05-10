import React from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Mic } from 'lucide-react-native';
import { colors } from '@/constants/Colors';
import { useVoice } from '@/context/VoiceContext';

export default function CarPlayPTTButton() {
  const { startSpeaking, stopSpeaking, isSpeaking } = useVoice();

  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSpeaking && styles.speaking
      ]}
      onPressIn={startSpeaking}
      onPressOut={stopSpeaking}
      activeOpacity={0.7}
    >
      <Mic 
        size={48} 
        color={colors.white}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  speaking: {
    backgroundColor: colors.error,
  },
  icon: {
    opacity: 0.9,
  },
});