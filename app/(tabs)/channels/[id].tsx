import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Mic, MicOff, UserRound } from 'lucide-react-native';
import { colors } from '@/constants/Colors';
import { useVoice } from '@/context/VoiceContext';
import PTTButton from '@/components/channels/PTTButton';
import ChannelUser from '@/components/channels/ChannelUser';
import { Channel, User } from '@/types';
import { fetchChannelById } from '@/api/channels';
import { fetchChannelUsers } from '@/api/users';

export default function ChannelScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { 
    connectToChannel, 
    disconnectFromChannel, 
    isConnected,
    isSpeaking,
    startSpeaking,
    stopSpeaking
  } = useVoice();
  
  const [channel, setChannel] = useState<Channel | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [speakingUsers, setSpeakingUsers] = useState<string[]>([]);

  useEffect(() => {
    loadChannel();

    return () => {
      disconnectFromChannel();
    };
  }, [id]);

  useEffect(() => {
    if (channel) {
      loadUsers();
      connectToChannel(channel);
    }
  }, [channel]);

  // Simulate other users speaking
  useEffect(() => {
    const interval = setInterval(() => {
      if (users.length > 0 && Math.random() > 0.7) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        setSpeakingUsers(prev => [...prev, randomUser.id]);
        
        setTimeout(() => {
          setSpeakingUsers(prev => prev.filter(id => id !== randomUser.id));
        }, 2000 + Math.random() * 3000);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [users]);

  const loadChannel = async () => {
    if (!id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const channelData = await fetchChannelById(parseInt(id));
      setChannel(channelData);
    } catch (err) {
      setError('Failed to load channel');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUsers = async () => {
    if (!channel) return;
    
    try {
      const userData = await fetchChannelUsers(channel.id);
      setUsers(userData);
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const handlePTTPress = () => {
    startSpeaking();
  };

  const handlePTTRelease = () => {
    stopSpeaking();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !channel) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Channel not found'}</Text>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <ArrowLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.channelInfo}>
          <Text style={styles.channelName}>{channel.name}</Text>
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, { backgroundColor: isConnected ? colors.success : colors.error }]} />
            <Text style={styles.statusText}>{isConnected ? 'Connected' : 'Disconnected'}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          Users in Channel ({users.length})
        </Text>
        
        <View style={styles.usersContainer}>
          {users.map(user => (
            <ChannelUser 
              key={user.id} 
              user={user} 
              isSpeaking={speakingUsers.includes(user.id)}
            />
          ))}
          
          {users.length === 0 && (
            <Text style={styles.emptyText}>No users in this channel</Text>
          )}
        </View>
      </View>
      
      <View style={styles.pttContainer}>
        <PTTButton 
          onPressIn={handlePTTPress}
          onPressOut={handlePTTRelease}
          isSpeaking={isSpeaking}
          size="large"
        />
        <Text style={styles.pttText}>
          {isSpeaking ? 'Release to end transmission' : 'Push to Talk'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: colors.error,
    marginBottom: 20,
    textAlign: 'center',
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: 16,
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.text.primary,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.text.secondary,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 16,
  },
  usersContainer: {
    marginBottom: 16,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 24,
  },
  pttContainer: {
    backgroundColor: colors.cardBackground,
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  pttText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 12,
  },
});