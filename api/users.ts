import { User } from '@/types';

// Mock implementation for fetching all users in a server
export const fetchUsers = async (serverId: number): Promise<User[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Base users present in all servers
  const baseUsers: User[] = [
    {
      id: 'u1',
      username: 'dispatcher1',
      rank: 'Admin',
      status: 'online',
      serverId
    },
    {
      id: 'u2',
      username: 'driver458',
      rank: 'Member',
      status: 'online',
      serverId
    },
    {
      id: 'u3',
      username: 'fleetops',
      rank: 'Moderator',
      status: 'online',
      serverId
    }
  ];
  
  // Add server-specific users
  let additionalUsers: User[] = [];
  
  switch (serverId) {
    case 1:
      additionalUsers = [
        {
          id: 'u11',
          username: 'logistics_lead',
          rank: 'Operator',
          status: 'online',
          serverId
        },
        {
          id: 'u12',
          username: 'driver_supervisor',
          rank: 'Moderator',
          status: 'offline',
          serverId
        },
        {
          id: 'u13',
          username: 'truckdriver42',
          rank: 'Member',
          status: 'online',
          serverId
        }
      ];
      break;
    case 2:
      additionalUsers = [
        {
          id: 'u21',
          username: 'route_planner',
          rank: 'Operator',
          status: 'online',
          serverId
        },
        {
          id: 'u22',
          username: 'fleet_manager',
          rank: 'Moderator',
          status: 'online',
          serverId
        }
      ];
      break;
    case 3:
      additionalUsers = [
        {
          id: 'u31',
          username: 'maintenance_lead',
          rank: 'Operator',
          status: 'offline',
          serverId
        },
        {
          id: 'u32',
          username: 'admin_user',
          rank: 'Admin',
          status: 'online',
          serverId
        },
        {
          id: 'u33',
          username: 'driver_coach',
          rank: 'Moderator',
          status: 'online',
          serverId
        },
        {
          id: 'u34',
          username: 'new_driver',
          rank: 'Member',
          status: 'online',
          serverId
        }
      ];
      break;
  }
  
  return [...baseUsers, ...additionalUsers];
};

// Mock implementation for fetching users in a specific channel
export const fetchChannelUsers = async (channelId: number): Promise<User[]> => {
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
  
  // Get all users from this server
  const serverUsers = await fetchUsers(serverId);
  
  // Randomly select a subset of users for this channel
  // In a real implementation, this would be actual channel membership data
  return serverUsers.filter(() => Math.random() > 0.4);
};