# Contact Form Integration Setup Guide

This guide will help you set up the Google Forms/Sheets integration for the contact form.

## Quick Start

1. **Set up Google Apps Script** (see `google-apps-script/README.md` for detailed instructions)
2. **Create `.env` file** in the project root with your Google Apps Script URL
3. **Restart your dev server**

## Environment Variables

Create a `.env` file in the project root directory with the following:

```env
# Google Apps Script Web App URL
# Get this URL after deploying your Google Apps Script as a web app
# Format: https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_GOOGLE_APPS_SCRIPT_URL=YOUR_GOOGLE_APPS_SCRIPT_URL_HERE
```

**Important**:

- Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your actual Google Apps Script Web App URL
- The `.env` file should be in the root directory (same level as `package.json`)
- After creating/updating `.env`, restart your development server: `npm run dev`

## What Happens When a Customer Submits the Form?

1. ✅ Customer fills out the contact form (Name, Email, Phone, Message)
2. ✅ Clicks "Send Message" button
3. ✅ Data is sent to Google Apps Script
4. ✅ **Email is automatically sent** to `nexgendigital1111@gmail.com` with formatted details
5. ✅ **Data is automatically added** to Google Sheets with proper formatting:
   - Timestamp column (formatted date/time)
   - Name, Email, Phone, Message columns
   - Professional formatting with headers, alternating row colors, and borders
   - Auto-resized columns for readability

## Files Created

- `src/lib/contact-api.ts` - API service for form submission
- `src/components/ContactSection.tsx` - Updated to use the API service
- `google-apps-script/ContactFormHandler.gs` - Google Apps Script code
- `google-apps-script/README.md` - Detailed setup instructions for Google Apps Script

## Next Steps

1. Follow the instructions in `google-apps-script/README.md` to set up Google Apps Script
2. Create your `.env` file with the Web App URL
3. Test the form submission
4. Check your email and Google Sheet to verify everything works

## Troubleshooting

### Form shows error about missing URL

- Make sure you created the `.env` file in the project root
- Verify the variable name is exactly: `VITE_GOOGLE_APPS_SCRIPT_URL`
- Restart your dev server after creating/updating `.env`

### Form submits but no email/sheet entry

- Check Google Apps Script execution log: View > Executions
- Verify the Sheet ID is correct in the script
- Make sure the script has proper permissions

For more detailed troubleshooting, see `google-apps-script/README.md`.
