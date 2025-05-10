import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useVoice } from '@/context/VoiceContext';

export default function CarPlayManager() {
  const { currentServer, currentChannel } = useVoice();

  useEffect(() => {
    // Initialize CarPlay interface
    // This would be where we'd set up CarPlay templates and listeners
    // but since this is a web-first app, we'll keep it as a placeholder
  }, []);

  // Since this is primarily a management component, it doesn't need to render anything visible
  return null;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});