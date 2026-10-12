/**
 * Google Apps Script for Contact Form Integration
 *
 * This script handles:
 * 1. Receiving form data from the website
 * 2. Sending email notification to nexgendigital1111@gmail.com
 * 3. Writing data to Google Sheets with proper formatting
 *
 * SETUP INSTRUCTIONS:
 *
 * 1. Create a Google Sheet:
 *    - Go to https://sheets.google.com
 *    - Create a new spreadsheet
 *    - Name it "Contact Form Submissions" (or your preferred name)
 *    - Add headers in Row 1: Timestamp | Name | Email | Phone | Message
 *    - Copy the Sheet ID from the URL (the long string between /d/ and /edit)
 *
 * 2. Create Google Apps Script:
 *    - Go to https://script.google.com
 *    - Click "New Project"
 *    - Delete the default code and paste this entire file
 *    - Update the SHEET_ID and RECIPIENT_EMAIL constants below
 *
 * 3. Deploy as Web App:
 *    - Click "Deploy" > "New deployment"
 *    - Click the gear icon ⚙️ next to "Select type" and choose "Web app"
 *    - Description: "Contact Form Handler"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (important for public website access)
 *    - Click "Deploy"
 *    - Copy the Web App URL (you'll need this for your .env file)
 *
 * 4. Authorize the Script:
 *    - When you first run it, Google will ask for permissions
 *    - Click "Review Permissions" > Choose your account
 *    - Click "Advanced" > "Go to [Project Name] (unsafe)" (this is safe, it's your own script)
 *    - Click "Allow"
 *
 * 5. Add the URL to your project:
 *    - Copy the Web App URL from step 3
 *    - Create a .env file in your project root (copy from .env.example)
 *    - Add: VITE_GOOGLE_APPS_SCRIPT_URL=your_copied_url_here
 *    - Restart your dev server
 */

// ========== CONFIGURATION ==========
const SHEET_ID = "YOUR_SHEET_ID_HERE"; // Replace with your Google Sheet ID
const RECIPIENT_EMAIL = "nexgendigital1111@gmail.com";
const SHEET_NAME = "Sheet1"; // Change if your sheet tab has a different name

// ========== MAIN FUNCTION ==========
/**
 * Main function to handle POST requests from the contact form
 * @param {Object} e - Event object containing the request data
 * @returns {Object} Response object
 */
function doPost(e) {
  try {
    // Validate that the event object and postData exist
    if (!e) {
      throw new Error("Event object is undefined");
    }

    if (!e.postData || !e.postData.contents) {
      throw new Error(
        "postData is missing. Make sure you're sending a POST request with JSON data."
      );
    }

    // Parse the incoming JSON data
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      throw new Error("Invalid JSON data: " + parseError.toString());
    }

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return createCorsResponse({
        success: false,
        message: "Missing required fields",
      });
    }

    // Send email notification
    try {
      sendEmailNotification(data);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Continue even if email fails
    }

    // Write to Google Sheets
    try {
      writeToSheet(data);
    } catch (sheetError) {
      console.error("Error writing to sheet:", sheetError);
      // Return error but don't throw - email was sent successfully
      return createCorsResponse({
        success: false,
        message:
          "Email sent but failed to write to sheet: " + sheetError.toString(),
      });
    }

    // Return success response
    return createCorsResponse({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (error) {
    // Log error and return error response
    console.error("Error processing form submission:", error);
    console.error("Error details:", error.toString());
    console.error("Stack trace:", error.stack);
    return createCorsResponse({
      success: false,
      message:
        "An error occurred while processing your submission: " +
        error.toString(),
    });
  }
}

/**
 * Handle GET requests (for testing/debugging)
 * @param {Object} e - Event object
 * @returns {Object} Response object
 */
function doGet(e) {
  return createCorsResponse({
    success: true,
    message: "Google Apps Script is working! Use POST to submit form data.",
    instructions:
      "This endpoint accepts POST requests with JSON data containing: name, email, phone, message, timestamp",
  });
}

/**
 * Creates a CORS-enabled response for cross-origin requests
 * @param {Object} data - Response data object
 * @returns {TextOutput} CORS-enabled response
 */
function createCorsResponse(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);

  // Note: Google Apps Script automatically handles CORS for web apps
  // deployed with "Anyone" access. No additional headers needed.

  return output;
}

/**
 * OPTIONS handler for CORS preflight requests
 * This is called automatically by Google Apps Script for CORS requests
 */
function doOptions() {
  return createCorsResponse({ success: true });
}

/**
 * Test function to verify script setup
 * Run this from the script editor to test your configuration
 */
function testScript() {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    phone: "1234567890",
    message: "This is a test message",
    timestamp: new Date().toISOString(),
  };

  console.log("Testing script configuration...");
  console.log("SHEET_ID:", SHEET_ID);
  console.log("RECIPIENT_EMAIL:", RECIPIENT_EMAIL);
  console.log("SHEET_NAME:", SHEET_NAME);

  // Test email
  try {
    sendEmailNotification(testData);
    console.log("✓ Email test passed");
  } catch (error) {
    console.error("✗ Email test failed:", error);
  }

  // Test sheet writing
  try {
    writeToSheet(testData);
    console.log("✓ Sheet writing test passed");
  } catch (error) {
    console.error("✗ Sheet writing test failed:", error);
  }

  console.log("Test completed. Check the logs above for results.");
}

// ========== EMAIL FUNCTION ==========
/**
 * Sends email notification with form data
 * @param {Object} data - Form data object
 */
function sendEmailNotification(data) {
  const subject = `New Contact Form Submission from ${data.name}`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Phone:</strong> ${
          data.phone ? escapeHtml(data.phone) : "Not provided"
        }</p>
        <p><strong>Submitted:</strong> ${formatTimestamp(data.timestamp)}</p>
      </div>
      
      <div style="background-color: #fff; padding: 20px; border-left: 4px solid #4CAF50; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Project Requirements:</h3>
        <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(
          data.message
        )}</p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
        <p>This email was automatically generated from your website contact form.</p>
      </div>
    </div>
  `;

  const plainBody = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Submitted: ${formatTimestamp(data.timestamp)}

Project Requirements:
${data.message}
  `;

  try {
    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      body: plainBody,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    // Don't throw - continue to write to sheet even if email fails
  }
}

// ========== SHEETS FUNCTION ==========
/**
 * Writes form data to Google Sheets with proper formatting
 * @param {Object} data - Form data object
 */
function writeToSheet(data) {
  try {
    // Validate SHEET_ID is configured
    if (!SHEET_ID || SHEET_ID === "YOUR_SHEET_ID_HERE") {
      throw new Error(
        "SHEET_ID is not configured. Please update the SHEET_ID constant in the script."
      );
    }

    // Open the spreadsheet
    let spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    } catch (openError) {
      throw new Error(
        `Cannot open spreadsheet with ID "${SHEET_ID}". Please verify the Sheet ID is correct and the script has access. Error: ${openError.toString()}`
      );
    }

    // Get the sheet by name
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // If sheet doesn't exist, try to create it or use the first sheet
    if (!sheet) {
      console.warn(
        `Sheet "${SHEET_NAME}" not found. Trying to use the first sheet or create a new one.`
      );
      // Try to get the first sheet
      sheet = spreadsheet.getSheets()[0];
      if (!sheet) {
        // Create a new sheet if none exists
        sheet = spreadsheet.insertSheet(SHEET_NAME);
      }
    }

    // Get the last row to append data
    const lastRow = sheet.getLastRow();

    // Prepare the row data
    const timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
    const rowData = [
      timestamp,
      data.name || "",
      data.email || "",
      data.phone || "",
      data.message || "",
    ];

    // Append the new row
    const newRow = lastRow + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);

    // Format the new row
    try {
      formatSheetRow(sheet, newRow);
    } catch (formatError) {
      console.warn("Error formatting row (data still saved):", formatError);
      // Don't throw - data is saved
    }

    // Format headers if this is the first data row
    if (newRow === 2) {
      try {
        formatSheetHeaders(sheet);
      } catch (headerError) {
        console.warn("Error formatting headers:", headerError);
        // Don't throw - data is saved
      }
    }

    console.log(`Successfully wrote data to sheet at row ${newRow}`);
  } catch (error) {
    console.error("Error writing to sheet:", error);
    console.error("Error details:", error.toString());
    console.error("Stack trace:", error.stack);
    throw error;
  }
}

// ========== FORMATTING FUNCTIONS ==========
/**
 * Formats the header row of the sheet
 * @param {Sheet} sheet - Google Sheet object
 */
function formatSheetHeaders(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, 5);

  // Set header text
  headerRange.setValues([["Timestamp", "Name", "Email", "Phone", "Message"]]);

  // Format header style
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#4CAF50");
  headerRange.setFontColor("#ffffff");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  headerRange.setFontSize(11);

  // Freeze header row
  sheet.setFrozenRows(1);
}

/**
 * Formats a data row in the sheet
 * @param {Sheet} sheet - Google Sheet object
 * @param {number} row - Row number to format
 */
function formatSheetRow(sheet, row) {
  const rowRange = sheet.getRange(row, 1, 1, 5);

  // Format timestamp column
  const timestampCell = sheet.getRange(row, 1);
  timestampCell.setNumberFormat("yyyy-mm-dd hh:mm:ss");
  timestampCell.setHorizontalAlignment("left");

  // Format text columns
  sheet.getRange(row, 2, 1, 2).setHorizontalAlignment("left"); // Name, Email
  sheet.getRange(row, 4).setHorizontalAlignment("left"); // Phone

  // Format message column (wider, wrap text)
  const messageCell = sheet.getRange(row, 5);
  messageCell.setWrap(true);
  messageCell.setVerticalAlignment("top");

  // Set row height for message column
  sheet.setRowHeight(row, 60);

  // Add alternating row colors
  if (row % 2 === 0) {
    rowRange.setBackground("#f9f9f9");
  } else {
    rowRange.setBackground("#ffffff");
  }

  // Set borders
  rowRange.setBorder(
    true,
    true,
    true,
    true, // all borders
    false,
    false, // no color
    "#e0e0e0" // border color
  );

  // Auto-resize columns (except message which should be wider)
  sheet.autoResizeColumns(1, 4); // Auto-resize first 4 columns
  sheet.setColumnWidth(5, 400); // Set message column to 400px width
}

// ========== UTILITY FUNCTIONS ==========
/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Formats timestamp for display
 * @param {string} timestamp - ISO timestamp string
 * @returns {string} Formatted timestamp
 */
function formatTimestamp(timestamp) {
  if (!timestamp) return new Date().toLocaleString();
  try {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch (error) {
    return new Date().toLocaleString();
  }
}
