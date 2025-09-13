# Security & Deployment Guide

Guide for security and deployment of your business card website with Telegram Bot integration.

## Security

### 🔐 Environment Variables

#### Critical secrets:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here

# Vercel KV (automatically configured)
KV_REST_API_URL=your_kv_url
KV_REST_API_TOKEN=your_kv_token
```

#### ⚠️ NEVER DO:

- ❌ Don't put secrets in frontend code
- ❌ Don't commit `.env` files to Git
- ❌ Don't use one token for multiple projects
- ❌ Don't pass tokens via URL parameters

#### ✅ CORRECTLY:

- ✅ Use server environment variables
- ✅ Add `.env*` to `.gitignore`
- ✅ Create separate bot for each project
- ✅ Regularly rotate tokens

### 🛡️ API Endpoints Protection

#### Rate Limiting

Add request limits:

```javascript
// Example middleware for rate limiting
const rateLimitMap = new Map();

function rateLimit(ip, limit = 10, window = 60000) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];
  
  // Clear old requests
  const validRequests = userRequests.filter(time => now - time < window);
  
  if (validRequests.length >= limit) {
    return false; // Limit exceeded
  }
  
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  return true;
}
```

#### Input Data Validation

```javascript
// Message validation
function validateMessage(message) {
  if (!message || typeof message !== 'string') {
    throw new Error('Invalid message format');
  }
  
  if (message.length > 4000) {
    throw new Error('Message too long');
  }
  
  // Check for potentially dangerous content
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i
  ];
  
  if (dangerousPatterns.some(pattern => pattern.test(message))) {
    throw new Error('Potentially dangerous content detected');
  }
  
  return true;
}
```

### 🔒 HTTPS and SSL

#### Required requirements:

- ✅ All API endpoints must work only via HTTPS
- ✅ Webhook URL must be HTTPS
- ✅ Vercel automatically provides SSL certificates

#### SSL Check:

```bash
# Check SSL certificate
curl -I https://your-domain.vercel.app/api/telegram/send-message

# Security check
npx lighthouse https://your-domain.vercel.app --only-categories=security
```

### 🚫 CORS Settings

```javascript
// Proper CORS setup
res.setHeader('Access-Control-Allow-Origin', 'https://your-domain.vercel.app');
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
```

## Deployment

### 🚀 Vercel Deployment

#### 1. Deployment preparation

```bash
# Install dependencies
yarn install

# Check build
yarn build

# Local test
yarn preview
```

#### 2. Vercel Configuration

1. **Repository connection:**
   ```bash
   npx vercel --prod
   ```

2. **Environment variables setup:**
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Environment Variables
   - Add all necessary variables

### 🔄 Backup and Recovery

#### Backup Strategy

1. **Code:** Git repository (GitHub/GitLab)
2. **Environment variables:** Export from Vercel Dashboard
3. **Messages:** Vercel KV automatically saves data

#### Recovery Procedure

```bash
# 1. Code recovery
git clone https://github.com/your-username/your-repo.git
cd your-repo
yarn install

# 2. Environment variables recovery
# Copy variables from Vercel Dashboard

# 3. Deployment
npx vercel --prod
```

### 🧪 Testing Before Deployment

#### Local Testing

```bash
# Build test
yarn build

# API endpoints test
curl -X POST http://localhost:3000/api/telegram/send-message \
  -H "Content-Type: application/json" \
  -d '{"message": "Test message", "userMetadata": {}}'

# Webhook test
curl -X POST http://localhost:3000/api/telegram/webhook \
  -H "Content-Type: application/json" \
  -d '{"message": {"text": "Test", "message_id": 1}}'
```

#### Production Testing

```bash
# Check all endpoints
curl https://your-domain.vercel.app/api/telegram/send-message
curl https://your-domain.vercel.app/api/telegram/webhook
curl https://your-domain.vercel.app/api/chat/messages-kv

# SSL check
openssl s_client -connect your-domain.vercel.app:443
```

### 🚨 Incident Response

#### Action Plan for Issues

1. **Telegram Bot Issue:**
   - Check Bot Token status
   - Check webhook settings
   - Check Vercel Functions logs

2. **API Issue:**
   - Check environment variables
   - Check Vercel limits
   - Check error logs

3. **Security Issue:**
   - Immediately revoke compromised tokens
   - Check logs for suspicious activity
   - Update all secrets

#### DDoS Protection

- Vercel automatically protects against DDoS attacks
- Use Cloudflare for additional protection
- Set up rate limiting at API level

#### Regular Checks

- Weekly check logs for suspicious activity
- Monthly update dependencies
- Quarterly rotate secret keys

This guide will help you safely deploy and maintain your business card website with maximum data protection and stable operation.