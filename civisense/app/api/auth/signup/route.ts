import { NextResponse } from 'next/server';

// Define allowed origins
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://your-production-domain.com'
];

// Helper function to set CORS headers
function setCorsHeaders(response: NextResponse, origin: string | null) {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response, '*');
}

export async function POST(request: Request) {
  const { origin } = new URL(request.url);

  try {
    const body = await request.json();
    
    // Validate required fields
    const { email, full_name, password, confirm_password } = body;
    if (!email || !full_name || !password || !confirm_password) {
      const response = NextResponse.json(
        { 
          success: false,
          message: 'All fields are required' 
        },
        { status: 400 }
      );
      return setCorsHeaders(response, origin);
    }

    const apiUrl = 'https://n-civisense-api.onrender.com/api/v1/auth/signup';
    console.log('Signing up user:', email);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        full_name,
        password,
        confirm_password
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Signup API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: data
      });
      
      const errorResponse = NextResponse.json(
        { 
          success: false,
          message: data.message || 'Signup failed',
          error: data
        },
        { status: response.status }
      );
      return setCorsHeaders(errorResponse, origin);
    }
    
    const apiResponse = NextResponse.json({
      success: true,
      ...data
    });
    
    return setCorsHeaders(apiResponse, origin);
    
  } catch (error) {
    console.error('Error in signup API route:', error);
    const errorResponse = NextResponse.json(
      { 
        success: false,
        message: 'Failed to process signup request',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
    return setCorsHeaders(errorResponse, origin);
  }
}

export const dynamic = 'force-dynamic';
