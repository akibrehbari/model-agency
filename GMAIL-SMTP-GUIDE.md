# Gmail SMTP Setup - Complete Guide

## What is SMTP?

SMTP (Simple Mail Transfer Protocol) is the standard protocol for sending emails. Gmail provides an SMTP server that you can use to send emails from your application.

## Gmail SMTP Settings

For Gmail, you need these exact settings:

```
SMTP_HOST: smtp.gmail.com
SMTP_PORT: 587 (TLS) or 465 (SSL)
SMTP_USER: your-gmail@gmail.com
SMTP_PASSWORD: 16-character App Password
```

## Complete Setup Process

### Step 1: Prepare Your Gmail Account

1. **Sign in to Gmail** with the account you want to use for sending emails
   - Example: `contact@gmail.com` or `noreply@gmail.com`
   - This will be the "FROM" address in emails

2. **Important**: This Gmail account will send emails TO `info@cuhvet.com`

### Step 2: Enable 2-Step Verification (Required)

1. Go to: https://myaccount.google.com/security
2. Scroll down to "How you sign in to Google"
3. Click on "2-Step Verification"
4. Click "Get Started"
5. Follow the prompts:
   - Enter your password
   - Add your phone number
   - Choose how to get codes (text message or call)
   - Verify with the code sent to your phone
   - Click "Turn On"

**Why is this required?**
Google requires 2-Step Verification before you can create App Passwords. This is a security measure.

### Step 3: Generate App Password

1. Go to: https://myaccount.google.com/apppasswords
   - Or: Google Account → Security → 2-Step Verification → App passwords

2. You might need to sign in again

3. Under "Select app":
   - Choose **"Mail"**

4. Under "Select device":
   - Choose **"Other (Custom name)"**
   - Type: **"Cuhvet Website"** or **"Model Agency Site"**

5. Click **"Generate"**

6. Google will display a 16-character password in a yellow box:
   ```
   abcd efgh ijkl mnop
   ```

7. **IMPORTANT**: 
   - Copy this password immediately (you won't see it again)
   - Remove all spaces: `abcdefghijklmnop`
   - This is your `SMTP_PASSWORD`

8. Click "Done"

### Step 4: Configure Your .env.local File

Create or update `.env.local` in your project root:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-actual-gmail@gmail.com
SMTP_PASSWORD=abcdefghijklmnop
EMAIL_TO=info@cuhvet.com
```

**Real Example:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contact@gmail.com
SMTP_PASSWORD=xpqrmkjhgfdsazxc
EMAIL_TO=info@cuhvet.com
```

### Step 5: Restart Your Development Server

After creating/updating `.env.local`:
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

Environment variables are only loaded when the server starts!

### Step 6: Test the Form

1. Open your website: http://localhost:3000
2. Scroll to the "Apply Now" section
3. Fill out the form
4. Click "Submit Application"
5. Check `info@cuhvet.com` inbox (and spam folder)

## Common Issues & Solutions

### Issue: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solutions:**
- ✅ Make sure 2-Step Verification is enabled
- ✅ Use App Password, NOT your Gmail password
- ✅ Remove all spaces from the App Password
- ✅ Verify `SMTP_USER` is your complete Gmail address
- ✅ Try generating a new App Password

### Issue: "Connection timeout" or "ETIMEDOUT"

**Solutions:**
- ✅ Check your internet connection
- ✅ Some networks block port 587, try port 465 instead:
  ```env
  SMTP_PORT=465
  ```
  And update the code to use `secure: true`
- ✅ Try from a different network (some corporate/school networks block SMTP)

### Issue: "self signed certificate in certificate chain"

**Solution:**
Add this to the transporter config (not recommended for production):
```javascript
tls: {
  rejectUnauthorized: false
}
```

### Issue: Email not received at info@cuhvet.com

**Check:**
1. ✅ Verify `info@cuhvet.com` email exists and is active
2. ✅ Check spam/junk folder
3. ✅ Check Gmail "Sent" folder to confirm it was sent
4. ✅ Wait 5-10 minutes (sometimes delayed)
5. ✅ Check email filters/rules on info@cuhvet.com

### Issue: Environment variables not loading

**Solutions:**
- ✅ File must be named exactly `.env.local` (not `.env.local.txt`)
- ✅ File must be in the root directory (same level as `package.json`)
- ✅ Restart the dev server after creating the file
- ✅ Check for typos in variable names

## Alternative: Using Port 465 (SSL)

If port 587 doesn't work, try SSL on port 465:

**.env.local:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_TO=info@cuhvet.com
```

**Update route.ts:**
```javascript
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});
```

## Security Best Practices

1. **Never commit .env.local to git** (already in .gitignore)
2. **Use a dedicated Gmail account** for sending (not your personal email)
3. **Rotate App Passwords periodically**
4. **Revoke unused App Passwords** from https://myaccount.google.com/apppasswords
5. **Monitor sent emails** for suspicious activity
6. **Add rate limiting** in production to prevent abuse

## Gmail Sending Limits

Gmail has sending limits:
- **Free Gmail**: 500 emails/day
- **Google Workspace**: 2,000 emails/day

For higher volume, consider:
- SendGrid (100 emails/day free, then paid)
- AWS SES (62,000 emails/month free)
- Mailgun (5,000 emails/month free)
- Resend (3,000 emails/month free)