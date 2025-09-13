# Telegram Bot Setup Guide

This guide will help you set up Telegram Bot integration for your business card website.

## Step 1: Creating Telegram Bot

### 1.1 Creating bot through BotFather

1. Open Telegram and find [@BotFather](https://t.me/botfather)
2. Send command `/newbot`
3. Enter a name for your bot (e.g., "My Portfolio Bot")
4. Enter bot username (e.g., "my_portfolio_bot")
5. Save the received **Bot Token** - you'll need it later

### 1.2 Bot configuration

Execute the following commands in chat with BotFather:

```
/setprivacy - Disable (so bot can see all messages)
/setjoingroups - Disable (bot won't join groups)
/setcommands - Add management commands
```

## Step 2: Getting Chat ID

### 2.1 Method 1: Through @userinfobot

1. Find [@userinfobot](https://t.me/userinfobot) in Telegram
2. Send it any message
3. Copy your **Chat ID** from the response

### 2.2 Method 2: Through Telegram API

1. Send a message to your bot
2. Open in browser: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Find `"chat":{"id":` in response - this is your Chat ID

## Step 3: Webhook Setup (for receiving responses)

### 3.1 Setting Webhook URL

Replace `<YOUR_BOT_TOKEN>` with your bot token and execute request:

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-domain.vercel.app/api/telegram/webhook"
  }'
```

### 3.2 Webhook verification

```bash
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo"
```

## Step 4: Environment Variables Setup

### 4.1 For Vercel (Production)

In Vercel dashboard, add the following environment variables:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### 4.2 For local development

Create `.env.local` file in project root:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

## Step 5: Integration Testing

### 5.1 Message sending test

1. Run project locally: `yarn dev`
2. Open website and send test message through chat
3. Check that message arrived in your Telegram

### 5.2 Response receiving test

1. Reply to message in Telegram (use Reply)
2. Check that response appeared in website chat

## System Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   User Browser  │    │   Vercel API     │    │  Telegram Bot   │
│                 │    │                  │    │                 │
│ ┌─────────────┐ │    │ ┌──────────────┐ │    │ ┌─────────────┐ │
│ │ Chat Button │ │◄──►│ │ send-message │ │    │ │ Bot API     │ │
│ │             │ │    │ │              │ │    │ │             │ │
│ └─────────────┘ │    │ └──────────────┘ │    │ └─────────────┘ │
│                 │    │        │         │    │        ▲       │
│ ┌─────────────┐ │    │ ┌──────────────┐ │    │        │       │
│ │ Chat UI     │ │◄──►│ │ webhook      │ │    │ ┌─────────────┐ │
│ │             │ │    │ │              │ │    │ │ Telegram    │ │
│ └─────────────┘ │    │ └──────────────┘ │    │ │ Server      │ │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │   Vercel KV      │
                       │   Storage        │
                       └──────────────────┘
```

## Message Flow

### Sending message from user:

1. **User** → enters message in chat
2. **Frontend** → sends POST request to `/api/telegram/send-message`
3. **API** → formats message with user metadata
4. **API** → sends message to Telegram via Bot API
5. **Telegram** → delivers message to site owner

### Receiving response from owner:

1. **Owner** → replies to message in Telegram (Reply)
2. **Telegram** → sends webhook to `/api/telegram/webhook`
3. **Webhook** → extracts userSiteId from original message
4. **Webhook** → saves response in Vercel KV
5. **Frontend** → periodically checks new messages via `/api/chat/messages-kv`

## User Metadata

System automatically collects following user information:

- **👤 Username** (if provided)
- **🆔 Unique ID** of user on website
- **🕐 Time and timezone**
- **💻 Device information** (type, OS, browser, screen resolution)
- **🌐 URL and referrer**
- **🗣️ Language settings**
- **📈 Visit statistics**

## Security

### ⚠️ Important points:

1. **Never put Bot Token in frontend code**
2. **Use environment variables for all secret data**
3. **Webhook URL must be HTTPS**
4. **Regularly update bot tokens**

### Recommendations:

- Use separate bot for each project
- Set up rate limiting to prevent spam
- Regularly check logs for suspicious activity

## Troubleshooting

### Problem: Messages not sending

**Solution:**
1. Check Bot Token correctness
2. Ensure Chat ID is correct
3. Check environment variables in Vercel

### Problem: Responses not coming

**Solution:**
1. Check Webhook URL setup
2. Ensure you're replying to correct message (Reply)
3. Check Vercel Functions logs

### Problem: Webhook not working

**Solution:**
1. Check that URL is accessible via HTTPS
2. Ensure webhook function is deployed
3. Check webhook status: `https://api.telegram.org/bot<TOKEN>/getWebhookInfo`

## Additional Features

### Bot commands setup

Add commands through BotFather:

```
start - Start working with bot
help - Show help
status - System status
```

### New message notifications

System automatically sends notifications with complete user information, including:
- Send time
- Device and browser
- Referrer source
- Visit statistics

This will help you better understand your audience and respond more personally.