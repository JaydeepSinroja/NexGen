# Google Apps Script Setup Guide

This guide will help you set up Google Apps Script to handle contact form submissions from your website.

## What This Does

When a customer fills out the contact form on your website and clicks "Send Message":

1. ✅ An email is automatically sent to `nexgendigital1111@gmail.com` with all form details
2. ✅ The data is automatically added to a Google Sheet with proper formatting

## Step-by-Step Setup

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Contact Form Submissions" (or any name you prefer)
4. **Important**: Copy the Sheet ID from the URL
   - The URL looks like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the `SHEET_ID_HERE` part (the long string between `/d/` and `/edit`)

### Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New Project"**
3. Delete the default `myFunction` code
4. Copy the entire contents of `ContactFormHandler.gs` file
5. Paste it into the script editor
6. **Update these constants at the top of the file:**
   ```javascript
   const SHEET_ID = "YOUR_SHEET_ID_HERE"; // Paste your Sheet ID here
   const RECIPIENT_EMAIL = "nexgendigital1111@gmail.com"; // Already set
   const SHEET_NAME = "Sheet1"; // Change if your sheet tab has a different name
   ```
7. Click **"Save"** (Ctrl+S or Cmd+S)
8. Name your project: "Contact Form Handler"

### Step 3: Deploy as Web App

1. Click **"Deploy"** in the top right
2. Click **"New deployment"**
3. Click the **gear icon ⚙️** next to "Select type"
4. Choose **"Web app"**
5. Fill in the deployment settings:
   - **Description**: "Contact Form Handler v1"
   - **Execute as**: "Me" (your email address)
   - **Who has access**: **"Anyone"** ⚠️ (This is important - your website needs public access)
6. Click **"Deploy"**
7. **Copy the Web App URL** - You'll need this for your `.env` file
   - It looks like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`

### Step 4: Authorize the Script

1. When you first deploy, Google will ask for permissions
2. Click **"Review Permissions"**
3. Choose your Google account
4. You'll see a warning: "Google hasn't verified this app"
5. Click **"Advanced"**
6. Click **"Go to [Project Name] (unsafe)"** (This is safe - it's your own script)
7. Click **"Allow"**
8. The script now has permission to:
   - Send emails on your behalf
   - Access your Google Sheet

### Step 5: Configure Your Website

1. In your project root, create a `.env` file (copy from `.env.example`)
2. Add your Web App URL:
   ```
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. Restart your development server:
   ```bash
   npm run dev
   ```

### Step 6: Test It!

1. Fill out the contact form on your website
2. Click "Send Message"
3. Check:
   - ✅ Email should arrive at `nexgendigital1111@gmail.com`
   - ✅ Data should appear in your Google Sheet

## Troubleshooting

### Email not received?

- Check your spam folder
- Verify `RECIPIENT_EMAIL` is correct in the script
- Check the Apps Script execution log: View > Executions

### Data not appearing in Sheet?

- Verify `SHEET_ID` is correct (no extra spaces)
- Check the sheet tab name matches `SHEET_NAME`
- Make sure the script has permission to access the sheet
- Check the Apps Script execution log for errors

### Website shows error?

- Verify the `.env` file has the correct URL
- Make sure you restarted the dev server after adding `.env`
- Check browser console for specific error messages
- Verify the Web App is deployed with "Anyone" access

### Permission errors?

- Re-authorize the script: Run > doPost (or any function) > Authorize
- Make sure you're using the same Google account for both Sheet and Script

## Updating the Script

If you need to update the script:

1. Make your changes in the Apps Script editor
2. Click **"Deploy"** > **"Manage deployments"**
3. Click the **pencil icon ✏️** next to your deployment
4. Change the version to **"New version"**
5. Update the description
6. Click **"Deploy"**
7. The URL stays the same - no need to update `.env`

## Security Notes

- The Web App URL is public, but only accepts POST requests with proper data structure
- Consider adding basic validation or rate limiting if needed
- The script validates required fields before processing
- All HTML is escaped to prevent XSS attacks

## Support

If you encounter issues:

1. Check the Apps Script execution log: View > Executions
2. Check browser console for frontend errors
3. Verify all configuration values are correct
4. Test the script manually: Run > doPost (you'll need to provide test data)
