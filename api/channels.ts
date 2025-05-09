import { Channel } from '@/types';

// This is a mock implementation. In a real app, this would make a fetch call to an API
export const fetchChannels = async (serverId: number): Promise<Channel[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate API response based on server ID
  switch (serverId) {
    case 1:
      return [
        { 
          id: 101, 
          name: 'Dispatch', 
          serverId: 1,
          userCount: 8,
          requiresPermission: false
        },
        { 
          id: 102, 
          name: 'Operations', 
          serverId: 1,
          userCount: 12,
          requiresPermission: false
        },
        { 
          id: 103, 
          name: 'Management', 
          serverId: 1,
          userCount: 4,
          requiresPermission: true
        }
      ];
    case 2:
      return [
        { 
          id: 201, 
          name: 'Route Planning', 
          serverId: 2,
          userCount: 6,
          requiresPermission: false
        },
        { 
          id: 202, 
          name: 'Drivers', 
          serverId: 2,
          userCount: 15,
          requiresPermission: false
        }
      ];
    case 3:
      return [
        { 
          id: 301, 
          name: 'Fleet Control', 
          serverId: 3,
          userCount: 10,
          requiresPermission: false
        },
        { 
          id: 302, 
          name: 'Logistics', 
          serverId: 3,
          userCount: 8,
          requiresPermission: false
        },
        { 
          id: 303, 
          name: 'Maintenance', 
          serverId: 3,
          userCount: 5,
          requiresPermission: false
        },
        { 
          id: 304, 
          name: 'Administration', 
          serverId: 3,
          userCount: 3,
          requiresPermission: true
        }
      ];
    default:
      return [];
  }
};

export const fetchChannelById = async (channelId: number): Promise<Channel> => {
  // Determine which server this channel belongs to based on ID range
  let serverId: number;
  
  if (channelId >= 100 && channelId < 200) {
    serverId = 1;
  } else if (channelId >= 200 && channelId < 300) {
    serverId = 2;
  } else if (channelId >= 300 && channelId < 400) {
    serverId = 3;
  } else {
    throw new Error('Channel not found');
  }
  
  const channels = await fetchChannels(serverId);
  const channel = channels.find(c => c.id === channelId);
  
  if (!channel) {
    throw new Error('Channel not found');
  }
  
  return channel;
};