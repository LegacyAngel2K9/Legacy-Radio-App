import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Volume2, Check, RefreshCw } from 'lucide-react-native';
import { colors } from '@/constants/Colors';

// Mock audio devices for the demo
const mockAudioDevices = [
  { id: '1', name: 'Internal Microphone', type: 'input', isDefault: true },
  { id: '2', name: 'Internal Speaker', type: 'output', isDefault: true },
  { id: '3', name: 'Bluetooth Headset', type: 'input', isDefault: false },
  { id: '4', name: 'Bluetooth Headset', type: 'output', isDefault: false },
  { id: '5', name: 'Car Stereo', type: 'output', isDefault: false },
  { id: '6', name: 'External Microphone', type: 'input', isDefault: false },
];

interface AudioDevice {
  id: string;
  name: string;
  type: 'input' | 'output';
  isDefault: boolean;
}

export default function AudioSettingsScreen() {
  const [inputDevices, setInputDevices] = useState<AudioDevice[]>([]);
  const [outputDevices, setOutputDevices] = useState<AudioDevice[]>([]);
  const [selectedInputId, setSelectedInputId] = useState<string>('');
  const [selectedOutputId, setSelectedOutputId] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAudioDevices();
  }, []);

  const loadAudioDevices = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const inputs = mockAudioDevices.filter(device => device.type === 'input');
      const outputs = mockAudioDevices.filter(device => device.type === 'output');
      
      setInputDevices(inputs);
      setOutputDevices(outputs);
      
      const defaultInput = inputs.find(device => device.isDefault);
      const defaultOutput = outputs.find(device => device.isDefault);
      
      if (defaultInput) setSelectedInputId(defaultInput.id);
      if (defaultOutput) setSelectedOutputId(defaultOutput.id);
      
      setIsLoading(false);
    }, 1000);
  };

  const refreshDevices = () => {
    setIsRefreshing(true);
    // Simulate refreshing devices
    setTimeout(() => {
      loadAudioDevices();
      setIsRefreshing(false);
    }, 1500);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleSelectInput = (deviceId: string) => {
    setSelectedInputId(deviceId);
  };

  const handleSelectOutput = (deviceId: string) => {
    setSelectedOutputId(deviceId);
  };

  const renderDeviceList = (
    devices: AudioDevice[],
    selectedId: string,
    onSelect: (id: string) => void
  ) => {
    return devices.map(device => (
      <TouchableOpacity
        key={device.id}
        style={[
          styles.deviceItem,
          selectedId === device.id && styles.selectedDevice
        ]}
        onPress={() => onSelect(device.id)}
      >
        <Text style={styles.deviceName}>{device.name}</Text>
        {selectedId === device.id && (
          <Check size={20} color={colors.primary} />
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <ArrowLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Audio Settings</Text>
        <TouchableOpacity 
          style={styles.refreshButton} 
          onPress={refreshDevices}
          disabled={isRefreshing || isLoading}
        >
          <RefreshCw 
            size={20} 
            color={colors.text.primary} 
            style={isRefreshing ? styles.rotating : undefined}
          />
        </TouchableOpacity>
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading audio devices...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Input Devices</Text>
            {inputDevices.length === 0 ? (
              <Text style={styles.emptyText}>No input devices found</Text>
            ) : (
              renderDeviceList(inputDevices, selectedInputId, handleSelectInput)
            )}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Output Devices</Text>
            {outputDevices.length === 0 ? (
              <Text style={styles.emptyText}>No output devices found</Text>
            ) : (
              renderDeviceList(outputDevices, selectedOutputId, handleSelectOutput)
            )}
          </View>
          
          <View style={styles.infoContainer}>
            <Volume2 size={20} color={colors.text.secondary} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Changes to audio devices take effect immediately. Audio quality is automatically
              optimized for voice communication.
            </Text>
          </View>
        </ScrollView>
      )}
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
    flex: 1,
  },
  refreshButton: {
    padding: 8,
  },
  rotating: {
    transform: [{ rotate: '45deg' }],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 16,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 12,
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedDevice: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  deviceName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.text.primary,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: colors.infoBackground,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.text.secondary,
    flex: 1,
    lineHeight: 20,
  },
});