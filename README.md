# Business Card - Personal Portfolio with Chat

A modern personal portfolio website built with React, TypeScript, and Vite, featuring a real-time chat system with Telegram Bot integration.

## Features

- 🎨 Modern responsive design with dark/light theme
- 💬 Real-time chat with Telegram Bot integration
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

### 4. Real-time chat with Vercel KV

The chat system uses Vercel KV for reliable message storage and delivery, with polling for real-time updates!

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
│   User Browser  │    │   Vercel API     │    │  Telegram Bot   │
│                 │    │                  │    │                 │
│ ┌─────────────┐ │    │ ┌──────────────┐ │    │ ┌─────────────┐ │
│ │ Chat Button │ │◄──►│ │ send-message │ │    │ │ Bot API     │ │
│ │ (Fixed)     │ │    │ │              │ │    │ │             │ │
│ └─────────────┘ │    │ └──────────────┘ │    │ └─────────────┘ │
│                 │    │        │         │    │        ▲        │
│ ┌─────────────┐ │    │ ┌──────────────┐ │    │        │        │
│ │ Chat UI     │ │◄──►│ │ webhook      │ │    │ ┌─────────────┐ │
│ │ (Messages)  │ │    │ │              │ │    │ │ Telegram    │ │
│ └─────────────┘ │    │ └──────────────┘ │    │ │ Server      │ │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │   Vercel KV      │
                       │   Storage        │
                       └──────────────────┘
```

## Data Flow

1. **User Input** → Chat Component
2. **Chat Component** → Jotai State + Telegram API
3. **Telegram API** → Telegram Bot → Site Owner
4. **Site Owner Response** → Webhook → Vercel KV
5. **Chat Component** → Polling KV → UI Update

## Environment Configuration

**For Production (Vercel):**
```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

**Note:** Bot tokens are stored securely on the server side only!

## Security Considerations

- Bot token should be kept secure and never exposed to frontend
- User metadata is collected but not stored permanently
- Vercel KV provides secure message storage with automatic cleanup
- Rate limiting should be implemented for message sending
