import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, ActivityIndicator } from 'react-native';
import { ChevronDown, Check, Radio } from 'lucide-react-native';
import { colors } from '@/constants/Colors';
import { useVoice } from '@/context/VoiceContext';
import { Server } from '@/types';
import { fetchServers } from '@/api/servers';

export default function ServerSelector() {
  const { currentServer, selectServer } = useVoice();
  const [modalVisible, setModalVisible] = useState(false);
  const [servers, setServers] = useState<Server[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadServers();
  }, []);

  const loadServers = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const serverData = await fetchServers();
      setServers(serverData);
      
      // Auto-select first server if none is selected
      if (serverData.length > 0 && !currentServer) {
        selectServer(serverData[0]);
      }
    } catch (err) {
      setError('Failed to load servers');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServerSelect = (server: Server) => {
    selectServer(server);
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selector} onPress={toggleModal}>
        <Radio size={20} color={colors.text.primary} style={styles.icon} />
        
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : error ? (
          <Text style={styles.errorText}>Error loading servers</Text>
        ) : currentServer ? (
          <Text style={styles.serverName}>{currentServer.name}</Text>
        ) : (
          <Text style={styles.placeholderText}>Select a server</Text>
        )}
        
        <ChevronDown size={20} color={colors.text.secondary} />
      </TouchableOpacity>
      
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Server</Text>
            
            {isLoading ? (
              <ActivityIndicator size="large" color={colors.primary} style={styles.loadingIndicator} />
            ) : error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={loadServers}>
                  <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <FlatList
                data={servers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.serverItem}
                    onPress={() => handleServerSelect(item)}
                  >
                    <Text style={styles.serverItemName}>{item.name}</Text>
                    {currentServer?.id === item.id && (
                      <Check size={20} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.serverList}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>No servers available</Text>
                }
              />
            )}
            
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    marginRight: 8,
  },
  serverName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.text.primary,
    flex: 1,
  },
  placeholderText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.text.secondary,
    flex: 1,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.error,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.text.primary,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  loadingIndicator: {
    marginVertical: 40,
  },
  serverList: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  serverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  serverItemName: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.text.primary,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  errorContainer: {
    padding: 16,
    alignItems: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  retryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.white,
  },
  closeButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  closeButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.primary,
  },
});