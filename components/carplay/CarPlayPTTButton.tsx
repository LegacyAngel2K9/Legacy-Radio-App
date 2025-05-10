import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Mic } from 'lucide-react-native';
import { useVoice } from '@/context/VoiceContext';
import { colors } from '@/constants/Colors';

export default function CarPlayPTTButton() {
  const { startSpeaking, stopSpeaking, isSpeaking } = useVoice();

  const handlePressIn = () => {
    startSpeaking();
  };

  const handlePressOut = () => {
    stopSpeaking();
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSpeaking && styles.buttonActive
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}
    >
      <Mic
        size={32}
        color={isSpeaking ? colors.background : colors.text.primary}
        strokeWidth={2.5}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.text.primary,
  },
  buttonActive: {
    backgroundColor: colors.text.primary,
  },
});