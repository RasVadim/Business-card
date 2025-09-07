export interface IChatMessage {
  id: string;
  text: string;
  timestamp: number;
  isFromUser: boolean;
  isRead?: boolean;
}

export interface IChatState {
  messages: IChatMessage[];
  isLoading: boolean;
  isConnected: boolean;
  userId?: string;
}
