import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { colors } from '@/constants/Colors';
import { fetchUsers } from '@/api/users';
import { User } from '@/types';
import UserListItem from '@/components/users/UserListItem';
import { useVoice } from '@/context/VoiceContext';

export default function UsersScreen() {
  const { currentServer } = useVoice();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (currentServer) {
      loadUsers();
    }
  }, [currentServer]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(user => {
      const query = searchQuery.toLowerCase();
      return (
        user.username.toLowerCase().includes(query) ||
        user.rank.toLowerCase().includes(query)
      );
    });
    
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const loadUsers = async () => {
    if (!currentServer) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const userData = await fetchUsers(currentServer.id);
      setUsers(userData);
      setFilteredUsers(userData);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={colors.text.secondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          placeholderTextColor={colors.text.secondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          {currentServer ? `Users • ${currentServer.name}` : 'Users'}
        </Text>
        
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <UserListItem user={item} />
            )}
            contentContainerStyle={styles.userList}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                {isLoading 
                  ? 'Loading users...' 
                  : searchQuery.trim() !== '' 
                    ? 'No users found matching your search'
                    : currentServer 
                      ? 'No users available' 
                      : 'Please select a server first'}
              </Text>
            }
          />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.text.primary,
    paddingVertical: 12,
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
  userList: {
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
});