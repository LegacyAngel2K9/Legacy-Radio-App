import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User as UserIcon, Mic, BadgeCheck } from 'lucide-react-native';
import { colors } from '@/constants/Colors';
import { User } from '@/types';

interface ChannelUserProps {
  user: User;
  isSpeaking?: boolean;
}

export default function ChannelUser({ user, isSpeaking = false }: ChannelUserProps) {
  const getRankColor = () => {
    switch (user.rank.toLowerCase()) {
      case 'admin':
        return colors.rankAdmin;
      case 'moderator':
        return colors.rankModerator;
      case 'operator':
        return colors.rankOperator;
      default:
        return colors.rankMember;
    }
  };

  const isAdmin = user.rank.toLowerCase() === 'admin';
  const isModerator = user.rank.toLowerCase() === 'moderator';
  
  return (
    <View style={[
      styles.container,
      isSpeaking && styles.speakingContainer
    ]}>
      <View style={[
        styles.avatarContainer,
        { backgroundColor: getRankColor() }
      ]}>
        <UserIcon size={18} color={colors.white} />
      </View>
      
      <View style={styles.userInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.username}>{user.username}</Text>
          {(isAdmin || isModerator) && (
            <BadgeCheck 
              size={16} 
              color={isAdmin ? colors.rankAdmin : colors.rankModerator} 
              style={styles.badge}
            />
          )}
        </View>
        <Text style={styles.rank}>{user.rank}</Text>
      </View>
      
      {isSpeaking && (
        <View style={styles.speakingIndicator}>
          <Mic size={16} color={colors.white} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  speakingContainer: {
    borderColor: colors.speaking,
    borderWidth: 1,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.text.primary,
  },
  badge: {
    marginLeft: 4,
  },
  rank: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  speakingIndicator: {
    backgroundColor: colors.speaking,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});