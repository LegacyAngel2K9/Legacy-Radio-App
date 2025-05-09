import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User as UserIcon, BadgeCheck } from 'lucide-react-native';
import { colors } from '@/constants/Colors';
import { User } from '@/types';

interface UserListItemProps {
  user: User;
}

export default function UserListItem({ user }: UserListItemProps) {
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
  const isOnline = user.status === 'online';
  
  return (
    <View style={styles.container}>
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
      
      <View style={[
        styles.statusIndicator,
        { backgroundColor: isOnline ? colors.success : colors.text.tertiary }
      ]} />
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
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});