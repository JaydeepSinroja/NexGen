/**
 * Google Apps Script for Contact Form Integration
 *
 * READY TO USE - Just copy and paste this entire file into Google Apps Script
 *
 * This script handles:
 * 1. Receiving form data from the website
 * 2. Sending email notification to nexgendigital1111@gmail.com
 * 3. Writing data to Google Sheets with proper formatting
 *
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Click "New Project"
 * 3. Delete the default code
 * 4. Paste this entire file
 * 5. Click "Save"
 * 6. Click "Deploy" > "New deployment"
 * 7. Click gear icon ⚙️ > Select "Web app"
 * 8. Set "Who has access" to "Anyone"
 * 9. Click "Deploy"
 * 10. Copy the Web App URL and add it to your .env file
 */

// ========== CONFIGURATION ==========
const SHEET_ID = "1RESHUNqzP0PCUSTcgM-xEwiz9tLB7xZvmOzxQCEmQyE";
const RECIPIENT_EMAIL = "nexgendigital1111@gmail.com";
const SHEET_NAME = "Contact Form Submissions";

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

/**
 * Test doPost function with a mock event object
 * This simulates what happens when a form is submitted from your website
 * Run this from the script editor to test the full doPost flow
 */
function testDoPost() {
  const testData = {
    name: "Test User from doPost",
    email: "test@example.com",
    phone: "1234567890",
    message: "This is a test message from doPost function",
    timestamp: new Date().toISOString(),
  };

  // Create a mock event object that simulates a POST request
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData),
      name: "postData",
      type: "application/json",
    },
    parameter: {},
    contextPath: "",
    contentLength: JSON.stringify(testData).length,
  };

  console.log("Testing doPost function with mock event...");
  console.log("Mock event data:", JSON.stringify(mockEvent.postData.contents));

  try {
    const result = doPost(mockEvent);
    const resultText = result.getContent();
    const resultJson = JSON.parse(resultText);

    console.log("✓ doPost test completed");
    console.log("Response:", resultJson);

    if (resultJson.success) {
      console.log("✓ Form submission successful!");
      console.log("✓ Email should have been sent");
      console.log("✓ Data should have been written to sheet");
    } else {
      console.error("✗ Form submission failed:", resultJson.message);
    }
  } catch (error) {
    console.error("✗ doPost test failed:", error);
    console.error("Error details:", error.toString());
  }

  console.log("doPost test completed. Check the logs above for results.");
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
    // Open the spreadsheet
    let spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    } catch (openError) {
      throw new Error(
        `Cannot open spreadsheet with ID "${SHEET_ID}". Please verify the Sheet ID is correct and the script has access. Error: ${openError.toString()}`
      );
    }

    // Get the sheet by name (try exact match first, then case-insensitive)
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // If exact match fails, try to find by case-insensitive match
    if (!sheet) {
      const allSheets = spreadsheet.getSheets();
      for (let i = 0; i < allSheets.length; i++) {
        if (allSheets[i].getName().toLowerCase() === SHEET_NAME.toLowerCase()) {
          sheet = allSheets[i];
          console.log(
            `Found sheet with case-insensitive match: ${sheet.getName()}`
          );
          break;
        }
      }
    }

    // If sheet still doesn't exist, create it
    if (!sheet) {
      console.log(`Sheet "${SHEET_NAME}" not found. Creating new sheet...`);
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    // Get the last row to check if sheet is empty
    const lastRow = sheet.getLastRow();

    // Check if headers exist by reading row 1
    const headerRow = sheet.getRange(1, 1, 1, 5).getValues()[0];
    const hasHeaders = headerRow[0] === "Timestamp" && headerRow[1] === "Name";

    // If sheet is empty or headers don't exist, create headers first
    if (lastRow === 0 || !hasHeaders) {
      console.log("Creating/updating headers...");
      formatSheetHeaders(sheet);
    }

    // Prepare the row data
    const timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
    const rowData = [
      timestamp,
      data.name || "",
      data.email || "",
      data.phone || "",
      data.message || "",
    ];

    // Append the new row (after headers, so row 2 for first entry)
    const newRow = lastRow === 0 || !hasHeaders ? 2 : lastRow + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);

    // Format the new row (always format, even if it fails)
    try {
      formatSheetRow(sheet, newRow);
      console.log(`Row ${newRow} formatted successfully`);
    } catch (formatError) {
      console.warn("Error formatting row (data still saved):", formatError);
      // Don't throw - data is saved, but try to apply basic formatting
      try {
        // Apply basic formatting as fallback
        const rowRange = sheet.getRange(newRow, 1, 1, 5);
        rowRange.setBorder(
          true, // top
          true, // left
          true, // bottom
          true, // right
          true, // vertical
          true, // horizontal
          "#e0e0e0", // color
          SpreadsheetApp.BorderStyle.SOLID // style
        );
        const timestampCell = sheet.getRange(newRow, 1);
        timestampCell.setNumberFormat("yyyy-mm-dd hh:mm:ss");
      } catch (fallbackError) {
        console.warn("Fallback formatting also failed:", fallbackError);
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
  try {
    const headerRange = sheet.getRange(1, 1, 1, 5);

    // Set header text first
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

    // Set column widths
    sheet.setColumnWidth(1, 180); // Timestamp
    sheet.setColumnWidth(2, 150); // Name
    sheet.setColumnWidth(3, 200); // Email
    sheet.setColumnWidth(4, 150); // Phone
    sheet.setColumnWidth(5, 400); // Message

    console.log("Headers created and formatted successfully");
  } catch (error) {
    console.error("Error formatting headers:", error);
    // Try to at least set the header text
    try {
      sheet
        .getRange(1, 1, 1, 5)
        .setValues([["Timestamp", "Name", "Email", "Phone", "Message"]]);
    } catch (fallbackError) {
      console.error("Failed to set header text:", fallbackError);
    }
  }
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

  // Set borders (top, left, bottom, right, vertical, horizontal, color, style)
  rowRange.setBorder(
    true, // top
    true, // left
    true, // bottom
    true, // right
    true, // vertical
    true, // horizontal
    "#e0e0e0", // color
    SpreadsheetApp.BorderStyle.SOLID // style
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
