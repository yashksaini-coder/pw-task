# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets to receive form data from your Next.js application.

## Step 1: Access Your Google Sheet

1. Open the Google Sheet you provided: https://docs.google.com/spreadsheets/d/13bruY6FVTgKizW6iKJ0tSlrUIqGkDb9h8-P_vIL1BSA/edit
2. Make sure you have edit permissions

## Step 2: Set Up Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy all the code from the `google-apps-script.gs` file in this project
4. Paste it into the Apps Script editor
5. Click **Save** (Ctrl+S or Cmd+S)

## Step 3: Deploy as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Configure the deployment:
   - **Description**: "Form Data Handler" (or any name you prefer)
   - **Execute as**: "Me" (your email)
   - **Who has access**: "Anyone" (this allows your app to send data)
4. Click **Deploy**
5. You'll get a Web App URL that looks like:
   ```
   https://script.google.com/macros/s/[YOUR_SCRIPT_ID]/exec
   ```
6. **COPY THIS URL** - you'll need it for the next step

## Step 4: Configure Your Next.js Application

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add the Google Script URL:
   ```
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/[YOUR_SCRIPT_ID]/exec
   ```
   Replace `[YOUR_SCRIPT_ID]` with your actual script ID from Step 3

## Step 5: Test the Setup

1. Run your Next.js application:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

2. Open http://localhost:3000 in your browser
3. Click "Buy Now" button
4. Fill out the customer form and submit
5. Check your Google Sheet - you should see the new data!

## Troubleshooting

### If data isn't appearing in your sheet:

1. **Check the console** in your browser's developer tools for any errors
2. **Verify the Web App URL** is correctly set in your `.env.local` file
3. **Make sure the deployment is active** in Google Apps Script
4. **Test the Apps Script directly**:
   - In the Apps Script editor, select `testPost` function from the dropdown
   - Click **Run**
   - Check if test data appears in your sheet

### Common Issues:

- **CORS errors**: Make sure "Who has access" is set to "Anyone" in the deployment settings
- **Authentication errors**: Redeploy the web app and update the URL
- **Data not formatting correctly**: Check that column headers match the expected format

## Sheet Structure

Your Google Sheet will have the following columns:
- **Timestamp**: When the form was submitted
- **Full Name**: Customer's full name
- **Address**: Customer's address
- **Mobile Number**: Customer's phone number
- **Email ID**: Customer's email address
- **Gender**: Customer's gender (male/female)

## Security Notes

- The Google Apps Script runs under your Google account
- Anyone with the Web App URL can send data to your sheet
- Consider adding validation or authentication if needed for production use
- Never share your Web App URL publicly if it contains sensitive data

## Next Steps

- Add data validation in Google Sheets
- Set up email notifications for new submissions
- Create charts or reports from the collected data
- Add more fields to the form as needed 