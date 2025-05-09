import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { useVoice } from '@/context/VoiceContext';
import { colors } from '@/constants/Colors';
import ServerSelector from '@/components/channels/ServerSelector';
import ChannelListItem from '@/components/channels/ChannelListItem';
import PTTButton from '@/components/channels/PTTButton';
import ConnectingOverlay from '@/components/ui/ConnectingOverlay';
import { Channel } from '@/types';
import { fetchChannels } from '@/api/channels';

export default function ChannelsScreen() {
  const { 
    currentServer, 
    currentChannel, 
    isConnecting, 
    isConnected,
    connectToChannel, 
    disconnectFromChannel,
    isSpeaking,
    startSpeaking,
    stopSpeaking
  } = useVoice();
  
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentServer) {
      loadChannels();
    }
  }, [currentServer]);

  const loadChannels = async () => {
    if (!currentServer) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const channelData = await fetchChannels(currentServer.id);
      setChannels(channelData);
    } catch (err) {
      setError('Failed to load channels');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChannelSelect = async (channel: Channel) => {
    try {
      // If already in a channel, disconnect first
      if (currentChannel) {
        await disconnectFromChannel();
      }
      
      // Connect to the selected channel
      await connectToChannel(channel);
    } catch (err) {
      console.error('Failed to connect to channel:', err);
    }
  };

  const handlePTTPress = () => {
    startSpeaking();
  };

  const handlePTTRelease = () => {
    stopSpeaking();
  };

  return (
    <View style={styles.container}>
      <ServerSelector />
      
      {isConnecting && <ConnectingOverlay />}
      
      <View style={styles.content}>
        <View style={styles.channelListContainer}>
          <Text style={styles.sectionTitle}>Channels</Text>
          
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <FlatList
              data={channels}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ChannelListItem
                  channel={item}
                  isActive={currentChannel?.id === item.id}
                  onPress={() => handleChannelSelect(item)}
                />
              )}
              contentContainerStyle={styles.channelList}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  {isLoading 
                    ? 'Loading channels...' 
                    : currentServer 
                      ? 'No channels available' 
                      : 'Please select a server'}
                </Text>
              }
            />
          )}
        </View>
        
        {isConnected && currentChannel && (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              Connected to: {currentChannel.name}
            </Text>
            
            <View style={styles.pttContainer}>
              <PTTButton 
                onPressIn={handlePTTPress}
                onPressOut={handlePTTRelease}
                isSpeaking={isSpeaking}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  channelListContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 16,
  },
  channelList: {
    paddingBottom: 16,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 24,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
    marginTop: 24,
  },
  statusContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 16,
  },
  pttContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
});