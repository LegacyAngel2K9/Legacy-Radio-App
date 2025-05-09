import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, KeySquare } from 'lucide-react-native';
import { colors } from '@/constants/Colors';

type ButtonAction = 'ptt' | 'channel_1' | 'channel_2' | 'channel_3' | 'channel_4' | 'mute' | 'none';

interface ButtonMapping {
  button: number;
  action: ButtonAction;
  enabled: boolean;
}

const defaultMappings: ButtonMapping[] = [
  { button: 1, action: 'ptt', enabled: true },
  { button: 2, action: 'channel_1', enabled: true },
  { button: 3, action: 'channel_2', enabled: true },
  { button: 4, action: 'channel_3', enabled: true },
  { button: 5, action: 'channel_4', enabled: true },
  { button: 6, action: 'mute', enabled: true },
  { button: 7, action: 'none', enabled: false },
  { button: 8, action: 'none', enabled: false },
];

const actionNames: Record<ButtonAction, string> = {
  ptt: 'Push to Talk',
  channel_1: 'Channel 1',
  channel_2: 'Channel 2',
  channel_3: 'Channel 3',
  channel_4: 'Channel 4',
  mute: 'Mute Audio',
  none: 'Not Assigned',
};

export default function ButtonMappingScreen() {
  const [mappings, setMappings] = useState<ButtonMapping[]>(defaultMappings);
  
  const handleGoBack = () => {
    router.back();
  };

  const handleChangeAction = (buttonIndex: number, action: ButtonAction) => {
    const newMappings = [...mappings];
    newMappings[buttonIndex].action = action;
    setMappings(newMappings);
  };

  const handleToggleButton = (buttonIndex: number) => {
    const newMappings = [...mappings];
    newMappings[buttonIndex].enabled = !newMappings[buttonIndex].enabled;
    setMappings(newMappings);
  };

  const renderActionOptions = (buttonIndex: number) => {
    const actions: ButtonAction[] = ['ptt', 'channel_1', 'channel_2', 'channel_3', 'channel_4', 'mute', 'none'];
    
    return (
      <View style={styles.actionOptions}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action}
            style={[
              styles.actionOption,
              mappings[buttonIndex].action === action && styles.selectedAction
            ]}
            onPress={() => handleChangeAction(buttonIndex, action)}
          >
            <Text style={[
              styles.actionText,
              mappings[buttonIndex].action === action && styles.selectedActionText
            ]}>
              {actionNames[action]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <ArrowLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Button Mapping</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.description}>
          Configure hardware buttons to perform specific actions when pressed.
          Enable or disable each button and assign the desired function.
        </Text>
        
        {mappings.map((mapping, index) => (
          <View key={index} style={styles.mappingItem}>
            <View style={styles.mappingHeader}>
              <View style={styles.buttonInfo}>
                <KeySquare size={20} color={colors.text.primary} style={styles.buttonIcon} />
                <Text style={styles.buttonLabel}>Button {mapping.button}</Text>
              </View>
              <Switch
                value={mapping.enabled}
                onValueChange={() => handleToggleButton(index)}
                trackColor={{ false: colors.switchTrackOff, true: colors.primary }}
                thumbColor={mapping.enabled ? colors.switchThumbOn : colors.switchThumbOff}
                ios_backgroundColor={colors.switchTrackOff}
              />
            </View>
            
            {mapping.enabled && (
              <View style={styles.actionSection}>
                <Text style={styles.actionTitle}>Assigned Action:</Text>
                {renderActionOptions(index)}
              </View>
            )}
          </View>
        ))}
        
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            Note: Hardware button support requires a compatible Android device. 
            Button mapping is not available on iOS devices.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.text.primary,
  },
  content: {
    padding: 16,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 24,
    lineHeight: 24,
  },
  mappingItem: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mappingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 12,
  },
  buttonLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.text.primary,
  },
  actionSection: {
    marginTop: 16,
  },
  actionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  actionOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionOption: {
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedAction: {
    backgroundColor: colors.primary,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.text.primary,
  },
  selectedActionText: {
    color: colors.white,
  },
  warningContainer: {
    backgroundColor: colors.warningBackground,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  warningText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.warning,
    lineHeight: 20,
  },
});