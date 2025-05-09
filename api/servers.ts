import { Server } from '@/types';

// This is a mock implementation. In a real app, this would make a fetch call to an API
export const fetchServers = async (): Promise<Server[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate API response
  return [
    { 
      id: 1, 
      name: 'Logistics Central', 
      region: 'US East',
      hasActiveSubscription: true,
      userCount: 42
    },
    { 
      id: 2, 
      name: 'Dispatch Network', 
      region: 'US West',
      hasActiveSubscription: true,
      userCount: 28
    },
    { 
      id: 3, 
      name: 'Fleet Operations', 
      region: 'EU Central',
      hasActiveSubscription: true,
      userCount: 36
    }
  ];
};

export const fetchServerById = async (serverId: number): Promise<Server> => {
  const servers = await fetchServers();
  const server = servers.find(s => s.id === serverId);
  
  if (!server) {
    throw new Error('Server not found');
  }
  
  return server;
};