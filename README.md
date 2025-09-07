# Business Card - Personal Portfolio with Chat

A modern personal portfolio website built with React, TypeScript, and Vite, featuring a real-time chat system with Telegram Bot integration.

## Features

- 🎨 Modern responsive design with dark/light theme
- 💬 Real-time chat with Telegram Bot integration
- 📱 PWA support for mobile devices
- 🌐 Multi-language support (EN/RU)
- 📄 CV export functionality
- ⚡ High performance with Vite and React 19

## Quick Start

### 1. Install dependencies

```bash
yarn install
```

### 2. Set up environment variables

**For Development:**
No additional environment variables needed for local development!

**For Production (Vercel):**
Add these environment variables in Vercel dashboard:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

⚠️ **Important:** Never put bot tokens in frontend environment variables!

### 3. Run the development server

```bash
yarn dev
```

### 4. Real-time chat with SSE

The chat system uses Server-Sent Events (SSE) for real-time communication, which works perfectly on Vercel!

## Chat System Setup

For detailed instructions on setting up the Telegram Bot integration, see [TELEGRAM_SETUP.md](./TELEGRAM_SETUP.md).

## Security & Deployment

For security considerations and deployment instructions, see [SECURITY_AND_DEPLOYMENT.md](./SECURITY_AND_DEPLOYMENT.md).

## Tech Stack



# CHAT SYSTEM ARCHITECTURE

## Overview

The chat system consists of several interconnected components that enable real-time communication between website visitors and the site owner through Telegram.

## Architecture Diagram

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   User Browser  │    │   React App      │    │  Telegram Bot   │
│                 │    │                  │    │                 │
│ ┌─────────────┐ │    │ ┌──────────────┐ │    │ ┌─────────────┐ │
│ │ Chat Button │ │◄──►│ │ ChatDrawer   │ │    │ │ Bot API     │ │
│ │ (Fixed)     │ │    │ │              │ │    │ │             │ │
│ └─────────────┘ │    │ └──────────────┘ │    │ └─────────────┘ │
│                 │    │        │         │    │        ▲       │
│ ┌─────────────┐ │    │ ┌──────────────┐ │    │        │       │
│ │ Chat UI     │ │◄──►│ │ Chat         │ │    │ ┌─────────────┐ │
│ │ (Messages)  │ │    │ │ Component    │ │    │ │ Telegram    │ │
│ └─────────────┘ │    │ └──────────────┘ │    │ │ Server      │ │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │   WebSocket      │
                       │   Server         │
                       │   (Optional)     │
                       └──────────────────┘
```

## Component Flow

### 1. User Interaction

- User clicks the floating chat button
- ChatDrawer opens with Chat component
- User types message and sends it

### 2. Message Processing

- Message is added to local state (Jotai)
- Message is sent to Telegram Bot API
- Message is also sent to WebSocket (if configured)

### 3. Telegram Integration

- Bot receives message with user metadata
- Bot forwards message to site owner's Telegram
- Bot can respond back through WebSocket

### 4. Real-time Responses

- WebSocket server receives responses from Telegram
- Responses are pushed to the chat interface
- User sees responses in real-time

## Key Components

### Frontend Components

- **ChatButton**: Fixed floating button with animation
- **ChatDrawer**: Modal drawer container
- **Chat**: Main chat interface with message list
- **Chat State**: Jotai atoms for state management

### Backend Services

- **Telegram Bot API**: Sends messages to Telegram
- **WebSocket Server**: Handles real-time communication
- **User Metadata**: Collects browser/device information

### State Management

- **chatStateAtom**: Stores messages, loading, connection status
- **useChatState**: Hook for accessing chat state
- **useAddMessage**: Hook for adding new messages
- **useTelegramBot**: Hook for Telegram integration
- **useWebSocket**: Hook for WebSocket communication

## Data Flow

1. **User Input** → Chat Component
2. **Chat Component** → Jotai State + Telegram API + WebSocket
3. **Telegram API** → Telegram Bot → Site Owner
4. **Site Owner Response** → WebSocket → Chat Component
5. **Chat Component** → Jotai State → UI Update

## Environment Configuration

```env
VITE_TELEGRAM_BOT_TOKEN=bot_token_from_botfather
VITE_TELEGRAM_CHAT_ID=your_telegram_chat_id
VITE_WEBSOCKET_URL=ws://localhost:3001
```

## Security Considerations

- Bot token should be kept secure
- User metadata is collected but not stored permanently
- WebSocket connections should be authenticated in production
- Rate limiting should be implemented for message sending
