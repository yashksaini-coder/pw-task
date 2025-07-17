import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming form data
    const data = await request.json();
    
    // Log the received data
    console.log('Received form data:', data);
    
    // Validate required fields
    const requiredFields = ['fullName', 'address', 'mobileNumber', 'emailId', 'gender'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Missing required field: ${field}` 
          },
          { status: 400 }
        );
      }
    }
    
    // Prepare data for Google Sheets
    const timestamp = new Date().toISOString();
    const formattedData = {
      timestamp,
      ...data
    };
    
    // Google Apps Script Web App URL (to be provided after deployment)
    // You'll need to replace this with your actual Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';
    
    if (!GOOGLE_SCRIPT_URL) {
      console.error('Google Script URL not configured');
      console.log('Form data that would be sent:', formattedData);
      
      // For testing purposes, return success even without Google Sheets
      return NextResponse.json({
        success: true,
        message: 'Customer details received (Google Sheets not configured)',
        data: formattedData,
        warning: 'Google Sheets integration not set up. Please follow the setup guide.'
      });
    }
    
    try {
      // Send data to Google Sheets via Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        console.log('Data successfully saved to Google Sheets');
        return NextResponse.json({
          success: true,
          message: 'Customer details saved successfully',
          data: formattedData
        });
      } else {
        console.error('Google Sheets error:', result.message);
        return NextResponse.json(
          { 
            success: false, 
            error: 'Failed to save data to Google Sheets' 
          },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error('Error sending data to Google Sheets:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to save data' 
        },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid request data' 
      },
      { status: 400 }
    );
  }
} 