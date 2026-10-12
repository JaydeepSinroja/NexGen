# Quick Fix for "Load Failed" Error

## The Problem

Your Google Apps Script URL is returning "Page not found", which means the script is either:

- Not deployed
- Not accessible
- Not authorized
- The URL is incorrect

## Quick Solution

### Step 1: Verify Your Google Apps Script Deployment

1. Go to [Google Apps Script](https://script.google.com)
2. Open your project
3. Click **"Deploy"** > **"Manage deployments"**
4. Check if there's an active deployment

### Step 2: Create/Update the Deployment

If there's no deployment or it's not working:

1. Click **"Deploy"** > **"New deployment"** (or edit existing)
2. Click the **gear icon ⚙️** > Select **"Web app"**
3. Set these settings:
   - **Description**: "Contact Form Handler"
   - **Execute as**: "Me" (your email)
   - **Who has access**: **"Anyone"** ⚠️ (This is critical!)
4. Click **"Deploy"**
5. **Copy the NEW Web App URL**

### Step 3: Update Your .env File

1. Open your `.env` file in the project root
2. Replace the URL with the new one you just copied:
   ```env
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_NEW_SCRIPT_ID/exec
   ```
3. Make sure:
   - No quotes around the URL
   - No extra spaces
   - URL ends with `/exec` (not `/edit`)

### Step 4: Authorize the Script

1. In Google Apps Script, click **"Run"** > Select any function (like `doPost`)
2. Click **"Authorize"** or **"Review Permissions"**
3. Choose your Google account
4. Click **"Advanced"** > **"Go to [Project Name] (unsafe)"**
5. Click **"Allow"**

### Step 5: Restart Your Dev Server

```bash
# Stop the server (Ctrl+C or Cmd+C)
npm run dev
```

### Step 6: Test Again

1. Fill out the contact form
2. Click "Send Message"
3. Check browser console (F12) for any errors

## Still Not Working?

### Check the URL Directly

1. Open your Google Apps Script URL in a browser:
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
2. You should see a JSON response like:
   ```json
   { "success": false, "message": "Missing required fields" }
   ```
3. If you see "Page not found" or HTML, the deployment is not working

### Common Issues

**Issue**: URL shows "Page not found"

- **Fix**: Redeploy the script and make sure "Anyone" has access

**Issue**: "403 Forbidden"

- **Fix**: Change deployment access to "Anyone"

**Issue**: "Authorization required"

- **Fix**: Run the script once in the editor to authorize it

**Issue**: Environment variable not loading

- **Fix**:
  - Make sure file is named exactly `.env` (not `.env.local`)
  - File is in project root (same folder as `package.json`)
  - Restart dev server completely

## Need More Help?

See `TROUBLESHOOTING.md` for detailed troubleshooting steps.
