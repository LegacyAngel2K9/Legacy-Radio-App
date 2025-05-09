import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Radio, Lock, Users } from 'lucide-react-native';
import { colors } from '@/constants/Colors';
import { Channel } from '@/types';

interface ChannelListItemProps {
  channel: Channel;
  isActive: boolean;
  onPress: () => void;
}

export default function ChannelListItem({ channel, isActive, onPress }: ChannelListItemProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive && styles.activeContainer
      ]}
      onPress={onPress}
    >
      <Radio 
        size={20} 
        color={isActive ? colors.primary : colors.text.secondary}
        style={styles.icon}
      />
      
      <View style={styles.channelInfo}>
        <Text style={[
          styles.channelName,
          isActive && styles.activeText
        ]}>
          {channel.name}
        </Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.userCount}>
            <Users size={14} color={colors.text.tertiary} style={styles.detailIcon} />
            <Text style={styles.detailText}>{channel.userCount}</Text>
          </View>
          
          {channel.requiresPermission && (
            <View style={styles.badge}>
              <Lock size={12} color={colors.white} style={styles.badgeIcon} />
              <Text style={styles.badgeText}>Restricted</Text>
            </View>
          )}
        </View>
      </View>
      
      {isActive && <View style={styles.activeIndicator} />}
    </TouchableOpacity>
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
  activeContainer: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  activeIndicator: {
    width: 6,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 3,
    position: 'absolute',
    left: 0,
    top: 10,
  },
  icon: {
    marginRight: 12,
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 4,
  },
  activeText: {
    color: colors.primary,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userCount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  detailIcon: {
    marginRight: 4,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.text.tertiary,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.badge,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: colors.white,
  },
});