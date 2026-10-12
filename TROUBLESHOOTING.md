# Troubleshooting "Load Failed" Error

If you're getting a "Load Failed" error when submitting the contact form, follow these steps:

## Step 1: Verify Environment Variable

1. **Check your `.env` file exists** in the project root (same level as `package.json`)
2. **Verify the format** - it should look like this (no quotes around the URL):
   ```env
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. **Check for typos** - Make sure there are no extra spaces or quotes
4. **Restart your dev server** after creating/updating `.env`:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

## Step 2: Verify Google Apps Script URL

1. **Check the URL format** - It should be:

   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

   NOT:

   ```
   https://script.google.com/macros/d/YOUR_SCRIPT_ID/edit  ❌
   ```

2. **Verify the deployment**:

   - Go to [Google Apps Script](https://script.google.com)
   - Click "Deploy" > "Manage deployments"
   - Make sure there's an active deployment
   - Copy the URL from the "Web app" deployment (not the "Test deployments")

3. **Check deployment settings**:
   - Execute as: "Me" (your email)
   - Who has access: **"Anyone"** (This is critical!)

## Step 3: Test the Google Apps Script Directly

1. Open your browser's developer console (F12)
2. Try this test in the console:
   ```javascript
   fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
     method: "POST",
     mode: "cors",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       name: "Test",
       email: "test@example.com",
       phone: "1234567890",
       message: "Test message",
       timestamp: new Date().toISOString(),
     }),
   })
     .then((r) => r.json())
     .then(console.log)
     .catch(console.error);
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with your actual URL
4. Check what error you get - this will help identify the issue

## Step 4: Common Issues and Solutions

### Issue: "Failed to fetch" or "Network error"

**Solution:**

- Check your internet connection
- Verify the Google Apps Script URL is accessible
- Try opening the URL in a browser (you should see a JSON response or error)

### Issue: "CORS error" or "Access-Control-Allow-Origin"

**Solution:**

- Make sure the Google Apps Script is deployed with "Anyone" access
- Redeploy the script: Deploy > Manage deployments > Edit (pencil icon) > Deploy
- Clear browser cache and try again

### Issue: "404 Not Found"

**Solution:**

- The URL might be incorrect
- Make sure you're using the `/exec` endpoint, not `/edit`
- Verify the script ID in the URL matches your deployment

### Issue: "403 Forbidden"

**Solution:**

- The script might not be deployed with "Anyone" access
- Re-authorize the script: Run > doPost > Authorize
- Check if the script has proper permissions

### Issue: Environment variable not loading

**Solution:**

- Make sure the file is named exactly `.env` (not `.env.local` or `.env.example`)
- Check the file is in the project root (same directory as `package.json`)
- Restart the dev server completely
- In development, you can temporarily log the URL to verify:
  ```typescript
  console.log(import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL);
  ```

## Step 5: Check Browser Console

1. Open browser DevTools (F12)
2. Go to the "Console" tab
3. Try submitting the form
4. Look for error messages - they will tell you exactly what's wrong

Common console errors:

- `Failed to load resource` - Network/URL issue
- `CORS policy` - Deployment access issue
- `Unexpected token` - Response format issue
- `TypeError: Failed to fetch` - Network/URL issue

## Step 6: Verify Google Apps Script is Working

1. Go to [Google Apps Script](https://script.google.com)
2. Open your project
3. Click "View" > "Executions"
4. Try submitting the form
5. Check if there's a new execution entry
6. Click on it to see if there are any errors

## Step 7: Manual Testing

Test the Google Apps Script directly:

1. In Google Apps Script editor, create a test function:
   ```javascript
   function testDoPost() {
     const mockEvent = {
       postData: {
         contents: JSON.stringify({
           name: "Test User",
           email: "test@example.com",
           phone: "1234567890",
           message: "Test message",
           timestamp: new Date().toISOString(),
         }),
       },
     };
     const result = doPost(mockEvent);
     Logger.log(result.getContent());
   }
   ```
2. Run this function: Run > testDoPost
3. Check the execution log for errors
4. Verify email was sent and data was added to the sheet

## Still Having Issues?

If none of the above works:

1. **Double-check the setup**:

   - [ ] Google Sheet created and Sheet ID copied
   - [ ] Google Apps Script created with the code
   - [ ] Constants updated (SHEET_ID, RECIPIENT_EMAIL, SHEET_NAME)
   - [ ] Script deployed as Web App
   - [ ] Deployment set to "Anyone" access
   - [ ] Script authorized
   - [ ] `.env` file created with correct URL
   - [ ] Dev server restarted

2. **Check the exact error message** in the browser console and share it

3. **Verify the URL** by opening it directly in a browser - you should see a JSON response

4. **Try a fresh deployment**:
   - Create a new deployment
   - Copy the new URL
   - Update your `.env` file
   - Restart the dev server

## Quick Checklist

- [ ] `.env` file exists in project root
- [ ] `VITE_GOOGLE_APPS_SCRIPT_URL` is set correctly
- [ ] URL starts with `https://script.google.com/macros/s/`
- [ ] URL ends with `/exec`
- [ ] Dev server was restarted after creating `.env`
- [ ] Google Apps Script is deployed
- [ ] Deployment has "Anyone" access
- [ ] Script is authorized
- [ ] Browser console shows no CORS errors
