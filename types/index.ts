export interface Server {
  id: number;
  name: string;
  region: string;
  hasActiveSubscription: boolean;
  userCount: number;
}

export interface Channel {
  id: number;
  name: string;
  serverId: number;
  userCount: number;
  requiresPermission: boolean;
}

export interface User {
  id: string;
  username: string;
  rank: string;
  status?: 'online' | 'offline';
  serverId: number | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface VoiceState {
  currentServer: Server | null;
  currentChannel: Channel | null;
  isConnecting: boolean;
  isConnected: boolean;
  isSpeaking: boolean;
  selectServer: (server: Server) => void;
  connectToChannel: (channel: Channel) => Promise<void>;
  disconnectFromChannel: () => Promise<void>;
  startSpeaking: () => void;
  stopSpeaking: () => void;
}