import React, { useEffect } from 'react';
import { Platform, NativeEventEmitter, NativeModules } from 'react-native';
import { useVoice } from '@/context/VoiceContext';

export default function CarPlayManager() {
  const { 
    currentServer, 
    currentChannel,
    connectToChannel,
    disconnectFromChannel,
    startSpeaking,
    stopSpeaking
  } = useVoice();

  useEffect(() => {
    if (Platform.OS !== 'ios') return;

    // Set up CarPlay event listeners
    const carPlayEmitter = new NativeEventEmitter(NativeModules.CarPlayManager);

    const subscriptions = [
      carPlayEmitter.addListener('onPTTPress', () => {
        startSpeaking();
      }),
      carPlayEmitter.addListener('onPTTRelease', () => {
        stopSpeaking();
      }),
      carPlayEmitter.addListener('onChannelSelect', (event) => {
        const channelId = event.channelId;
        if (currentServer) {
          // Find and connect to the selected channel
          const channel = currentServer.channels?.find(c => c.id === channelId);
          if (channel) {
            connectToChannel(channel);
          }
        }
      }),
    ];

    // Update CarPlay template with current state
    updateCarPlayTemplate();

    return () => {
      subscriptions.forEach(sub => sub.remove());
    };
  }, [currentServer, currentChannel]);

  const updateCarPlayTemplate = () => {
    if (Platform.OS !== 'ios') return;

    // Update CarPlay UI template with current server and channel information
    NativeModules.CarPlayManager.updateTemplate({
      server: currentServer?.name,
      channel: currentChannel?.name,
      channels: currentServer?.channels || [],
      isConnected: !!currentChannel,
    });
  };

  return null;
}