# Testing Your Google Apps Script

## Quick Test

1. Open your Google Apps Script project
2. Click **"Run"** > Select **"testScript"**
3. Click **"Run"** (play button)
4. If prompted, authorize the script
5. Check the execution log (View > Executions) for results

## Manual Testing

### Test 1: Check doGet (Browser Test)

1. Open your Web App URL in a browser:
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
2. You should see:
   ```json
   {
     "success": true,
     "message": "Google Apps Script is working! Use POST to submit form data."
   }
   ```

### Test 2: Test doPost (Browser Console)

1. Open your browser's developer console (F12)
2. Run this command (replace with your URL):
   ```javascript
   fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
     method: "POST",
     mode: "cors",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       name: "Test User",
       email: "test@example.com",
       phone: "1234567890",
       message: "Test message from browser",
       timestamp: new Date().toISOString(),
     }),
   })
     .then((r) => r.json())
     .then(console.log)
     .catch(console.error);
   ```
3. Check:
   - Console shows success response
   - Email received at nexgendigital1111@gmail.com
   - Data appears in Google Sheet

### Test 3: Check Sheet Access

1. In Google Apps Script, run this in the console:
   ```javascript
   function testSheetAccess() {
     const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID");
     const sheetName = sheet.getSheetByName("Sheet1");
     Logger.log("Sheet accessible: " + (sheetName !== null));
   }
   ```
2. Replace `YOUR_SHEET_ID` with your actual Sheet ID
3. Run the function
4. Check the execution log

## Common Issues

### "Cannot read properties of undefined (reading 'postData')"

**Cause**: The event object `e` is undefined or doesn't have `postData`

**Solution**:

- Make sure you're sending a POST request (not GET)
- Verify the request includes `Content-Type: application/json` header
- Check that the request body contains valid JSON

### "Script function not found: doGet"

**Fixed**: Added `doGet` function to handle GET requests

### Sheet not updating

**Check**:

1. Sheet ID is correct (no extra spaces)
2. Sheet name matches `SHEET_NAME` constant
3. Script has permission to access the sheet
4. Check execution log for specific errors

### Email sent but sheet not updated

**Check**:

1. Look at the execution log - it will show the specific error
2. Verify SHEET_ID is set correctly
3. Make sure the sheet exists and is accessible
4. Check if there are any permission issues

## Debugging Tips

1. **Check Execution Log**:

   - View > Executions
   - Click on the latest execution
   - Look for error messages

2. **Add Logger statements**:

   ```javascript
   Logger.log("Variable value: " + variableName);
   ```

3. **Test individual functions**:

   - Run `sendEmailNotification` separately
   - Run `writeToSheet` separately
   - This helps isolate the problem

4. **Check Sheet Permissions**:
   - Make sure the Google account running the script has access to the sheet
   - The sheet should be shared with the script's Google account if needed
