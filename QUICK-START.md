# Quick Start Guide - Cuhvet Email Setup

## 🚀 Quick Setup (5 minutes)

### 1. Enable Gmail 2FA
→ https://myaccount.google.com/security
- Click "2-Step Verification"
- Follow prompts to enable

### 2. Generate App Password
→ https://myaccount.google.com/apppasswords
- App: **Mail**
- Device: **Other (Custom)** → "Cuhvet Website"
- Click **Generate**
- Copy the 16-character password

### 3. Create .env.local File

In your project root, create `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASSWORD=paste-your-16-char-password-here
EMAIL_TO=info@cuhvet.com
```

### 4. Restart Server

```bash
npm run dev
```

### 5. Test

- Go to http://localhost:3000
- Scroll to "Apply Now"
- Fill out and submit the form
- Check `info@cuhvet.com` inbox

## ✅ That's it!

---

## 📧 What You Need

| Variable | Value | Where to Get |
|----------|-------|--------------|
| `SMTP_HOST` | `smtp.gmail.com` | Fixed value |
| `SMTP_PORT` | `587` | Fixed value |
| `SMTP_USER` | Your Gmail address | Your Gmail account |
| `SMTP_PASSWORD` | 16-char App Password | Google Account → Security → App Passwords |
| `EMAIL_TO` | `info@cuhvet.com` | Fixed value |

---

## 🔍 Quick Troubleshooting

**"Invalid login"** → Use App Password, not Gmail password  
**"Connection timeout"** → Try port 465 instead of 587  
**"Not receiving emails"** → Check spam folder at info@cuhvet.com  
**"Env vars not working"** → Restart dev server after creating .env.local  

---

For detailed instructions, see `GMAIL-SMTP-GUIDE.md`
