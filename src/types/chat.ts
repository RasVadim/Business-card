export enum EMessageType {
  USER = 'user',
  BOT = 'bot',
  OWNER = 'owner',
}

export interface IChatMessage {
  id: string;
  text: string;
  timestamp: number;
  type: EMessageType;
  isRead?: boolean;
  userSiteId?: string; // For personal messages
}

export interface IChatState {
  messages: IChatMessage[];
  isLoading: boolean;
  isConnected: boolean;
  userId?: string;
}
