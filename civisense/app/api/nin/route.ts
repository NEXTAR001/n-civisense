import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('=== NIN Verification Request ===');
  console.log('Request URL:', request.url);
  console.log('Request Headers:', Object.fromEntries(request.headers.entries()));
  
  try {
    // Parse the request body
    let requestBody;
    const requestText = await request.text();
    console.log('Raw request body:', requestText);
    
    try {
      requestBody = JSON.parse(requestText);
      console.log('Parsed request body:', requestBody);
    } catch (error) {
      console.error('Error parsing request body:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid request body',
          error: error instanceof Error ? error.message : 'Unknown error',
          receivedBody: requestText
        },
        { status: 400 }
      );
    }

    const { nin } = requestBody;
    console.log('Extracted NIN:', { nin, type: typeof nin });
    
    // Validate NIN
    if (!nin) {
      const error = { 
        success: false, 
        message: 'NIN is required', 
        detail: 'Missing NIN field',
        requestBody
      };
      console.error('Validation error:', error);
      return NextResponse.json(error, { status: 400 });
    }

    if (typeof nin !== 'string' || nin.trim().length !== 11) {
      const error = { 
        success: false, 
        message: 'Invalid NIN format', 
        detail: 'NIN must be an 11-digit string',
        received: nin,
        type: typeof nin,
        length: nin?.toString().length
      };
      console.error('Validation error:', error);
      return NextResponse.json(error, { status: 400 });
    }

    const trimmedNin = nin.trim();
    console.log('Forwarding NIN verification request for:', { trimmedNin });
    
    const externalUrl = 'https://n-civisense-api.onrender.com/api/v1/nin/lookup';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ nin: trimmedNin })
    };
    
    console.log('Sending to external API:', { 
      url: externalUrl,
      options: {
        ...requestOptions,
        body: JSON.parse(requestOptions.body) // Log the parsed body for clarity
      }
    });

    try {
      const response = await fetch(externalUrl, requestOptions);
      const responseText = await response.text();
      console.log('External API response status:', response.status);
      console.log('External API response text:', responseText);
      
      let responseData;
      try {
        responseData = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.error('Failed to parse external API response:', e);
        throw new Error(`Invalid JSON response from external API: ${responseText.substring(0, 200)}`);
      }

      if (!response.ok) {
        const error = { 
          success: false, 
          message: 'Failed to verify NIN with external service',
          status: response.status,
          error: responseData || response.statusText
        };
        console.error('External API error:', error);
        return NextResponse.json(error, { status: response.status });
      }

      console.log('NIN verification successful for:', { nin: trimmedNin });
      
      return NextResponse.json({
        success: true,
        message: 'Verification successful',
        data: responseData
      });
      
    } catch (error) {
      console.error('Error calling external API:', error);
      throw error; // This will be caught by the outer catch
    }
    
  } catch (error) {
    console.error('Unexpected error during NIN verification:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An unexpected error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  } finally {
    console.log('=== End of NIN Verification Request ===\n');
  }
}

export const dynamic = 'force-dynamic';
