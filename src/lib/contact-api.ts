/**
 * Contact Form API Service
 * Handles form submission to Google Apps Script which:
 * 1. Sends email to nexgendigital1111@gmail.com
 * 2. Writes data to Google Sheets
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}

/**
 * Submits contact form data to Google Apps Script
 * @param formData - The form data to submit
 * @returns Promise with success status and message
 */
export async function submitContactForm(
  formData: ContactFormData
): Promise<ContactFormResponse> {
  try {
    const scriptUrl =
      import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL ||
      "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

    // Debug: Log the URL status in development
    if (import.meta.env.DEV) {
      const urlConfigured =
        scriptUrl && scriptUrl !== "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
      console.log("Contact Form Debug:", {
        urlConfigured,
        urlLength: scriptUrl?.length || 0,
        urlStartsWith:
          scriptUrl?.startsWith("https://script.google.com") || false,
      });

      if (!urlConfigured) {
        console.error(
          "⚠️ VITE_GOOGLE_APPS_SCRIPT_URL is not set in .env file!\n" +
            "Please create a .env file in the project root with:\n" +
            "VITE_GOOGLE_APPS_SCRIPT_URL=your_google_apps_script_url"
        );
      }
    }

    if (!scriptUrl || scriptUrl === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
      throw new Error(
        "Google Apps Script URL is not configured. Please set VITE_GOOGLE_APPS_SCRIPT_URL in your .env file and restart the dev server."
      );
    }

    // Validate URL format
    if (!scriptUrl.startsWith("https://script.google.com")) {
      throw new Error(
        "Invalid Google Apps Script URL. URL should start with 'https://script.google.com'"
      );
    }

    const requestBody = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      timestamp: new Date().toISOString(),
    };

    // Try with CORS first
    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Check if response is ok
      if (!response.ok) {
        // Check if it's a 404 or HTML response (indicates script not found/not deployed)
        const contentType = response.headers.get("content-type");
        if (response.status === 404 || contentType?.includes("text/html")) {
          throw new Error(
            "Google Apps Script not found or not deployed. Please check:\n" +
              "1. The script is deployed as a Web App\n" +
              "2. Deployment has 'Anyone' access\n" +
              "3. The URL in .env matches the deployment URL"
          );
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // Response might be HTML (error page)
        const text = await response.text();
        if (
          text.includes("Page not found") ||
          text.includes("unable to open")
        ) {
          throw new Error(
            "Google Apps Script not accessible. Please verify:\n" +
              "1. The script is deployed and active\n" +
              "2. Deployment permissions are set to 'Anyone'\n" +
              "3. The script has been authorized"
          );
        }
        throw new Error("Unexpected response format from Google Apps Script");
      }

      // Parse the response
      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          message: "Your message has been sent successfully!",
        };
      } else {
        throw new Error(result.message || "Failed to submit form");
      }
    } catch (corsError) {
      // If CORS fails, try with no-cors mode (fire and forget)
      // This is a fallback for Google Apps Script compatibility
      console.warn("CORS request failed, trying no-cors mode:", corsError);

      try {
        await fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        // With no-cors, we can't read the response, so we assume success
        // The Google Apps Script will still process the request
        return {
          success: true,
          message: "Your message has been sent successfully!",
        };
      } catch (noCorsError) {
        // If both fail, throw the original error
        throw corsError;
      }
    }
  } catch (error) {
    console.error("Error submitting contact form:", error);

    // Provide more specific error messages
    let errorMessage = "Failed to send message. Please try again later.";

    if (error instanceof TypeError && error.message.includes("fetch")) {
      errorMessage =
        "Network error. Please check your internet connection and try again.";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
}
