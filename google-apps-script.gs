// Google Apps Script to deploy as Web App
// Copy this code to your Google Sheet's Apps Script Editor

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      const headers = ['Timestamp', 'Full Name', 'Address', 'Mobile Number', 'Email ID', 'Gender'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.fullName,
      data.address,
      data.mobileNumber,
      data.emailId,
      data.gender
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Log the submission
    console.log('Data saved:', rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data saved successfully',
        data: data
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to check if the script is working
function testPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        fullName: 'Test User',
        address: '123 Test Street',
        mobileNumber: '1234567890',
        emailId: 'test@example.com',
        gender: 'male'
      })
    }
  };
  
  const result = doPost(testData);
  console.log(result.getContent());
} 