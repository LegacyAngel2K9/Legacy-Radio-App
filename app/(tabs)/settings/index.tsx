import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { LogOut, ChevronRight, Radio, Volume2, Bluetooth, Truck, KeySquare } from 'lucide-react-native';
import { colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { useVoice } from '@/context/VoiceContext';

export default function SettingsScreen() {
  const { logout, user } = useAuth();
  const { isConnected, disconnectFromChannel, currentChannel } = useVoice();
  
  const [largeTouchTargets, setLargeTouchTargets] = useState(false);
  const [autoJoinLastChannel, setAutoJoinLastChannel] = useState(true);
  const [automaticGainControl, setAutomaticGainControl] = useState(true);
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [bluetoothAudio, setBluetoothAudio] = useState(true);
  
  const handleLogout = async () => {
    if (isConnected && currentChannel) {
      await disconnectFromChannel();
    }
    await logout();
    router.replace('/auth/login');
  };

  const navigateToButtonMapping = () => {
    router.push('/settings/button-mapping');
  };

  const navigateToAudioSettings = () => {
    router.push('/settings/audio');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userSection}>
        <View style={styles.profileCircle}>
          <Text style={styles.profileInitial}>
            {user?.username.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.username || 'User'}</Text>
          <Text style={styles.userRank}>{user?.rank || 'Member'}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interface Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Truck size={20} color={colors.text.primary} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Large Button Mode</Text>
          </View>
          <Switch
            value={largeTouchTargets}
            onValueChange={setLargeTouchTargets}
            trackColor={{ false: colors.switchTrackOff, true: colors.primary }}
            thumbColor={largeTouchTargets ? colors.switchThumbOn : colors.switchThumbOff}
            ios_backgroundColor={colors.switchTrackOff}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Radio size={20} color={colors.text.primary} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Auto-join Last Channel</Text>
          </View>
          <Switch
            value={autoJoinLastChannel}
            onValueChange={setAutoJoinLastChannel}
            trackColor={{ false: colors.switchTrackOff, true: colors.primary }}
            thumbColor={autoJoinLastChannel ? colors.switchThumbOn : colors.switchThumbOff}
            ios_backgroundColor={colors.switchTrackOff}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Audio Settings</Text>
        
        <TouchableOpacity style={styles.settingNavItem} onPress={navigateToAudioSettings}>
          <View style={styles.settingLabelContainer}>
            <Volume2 size={20} color={colors.text.primary} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Audio Devices</Text>
          </View>
          <ChevronRight size={20} color={colors.text.secondary} />
        </TouchableOpacity>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Bluetooth size={20} color={colors.text.primary} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Bluetooth Audio</Text>
          </View>
          <Switch
            value={bluetoothAudio}
            onValueChange={setBluetoothAudio}
            trackColor={{ false: colors.switchTrackOff, true: colors.primary }}
            thumbColor={bluetoothAudio ? colors.switchThumbOn : colors.switchThumbOff}
            ios_backgroundColor={colors.switchTrackOff}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Radio size={20} color={colors.text.primary} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Automatic Gain Control</Text>
          </View>
          <Switch
            value={automaticGainControl}
            onValueChange={setAutomaticGainControl}
            trackColor={{ false: colors.switchTrackOff, true: colors.primary }}
            thumbColor={automaticGainControl ? colors.switchThumbOn : colors.switchThumbOff}
            ios_backgroundColor={colors.switchTrackOff}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Radio size={20} color={colors.text.primary} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Noise Suppression</Text>
          </View>
          <Switch
            value={noiseSuppression}
            onValueChange={setNoiseSuppression}
            trackColor={{ false: colors.switchTrackOff, true: colors.primary }}
            thumbColor={noiseSuppression ? colors.switchThumbOn : colors.switchThumbOff}
            ios_backgroundColor={colors.switchTrackOff}
          />
        </View>
      </View>
      
      {Platform.OS === 'android' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hardware Controls</Text>
          
          <TouchableOpacity style={styles.settingNavItem} onPress={navigateToButtonMapping}>
            <View style={styles.settingLabelContainer}>
              <KeySquare size={20} color={colors.text.primary} style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Button Mapping</Text>
            </View>
            <ChevronRight size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
      )}
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color={colors.white} style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      
      <Text style={styles.versionText}>Legacy Radio v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.cardBackground,
    marginBottom: 16,
  },
  profileCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: colors.white,
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.text.primary,
  },
  userRank: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  section: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.text.secondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.text.primary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 12,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.white,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginBottom: 32,
  },
});