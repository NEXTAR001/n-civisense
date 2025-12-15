import { NextResponse } from 'next/server';

// Define allowed origins (add your production domain here)
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://your-production-domain.com'
];

// Helper function to set CORS headers
function setCorsHeaders(response: NextResponse, origin: string | null) {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response, '*');
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const category = searchParams.get('category') || 'latest';

  try {
    // Validate category to prevent path traversal
    const validCategories = ['latest', 'education', 'health', 'agriculture'];
    if (!validCategories.includes(category)) {
      const response = NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
      return setCorsHeaders(response, origin);
    }

    const apiUrl = `https://n-civisense-api.onrender.com/api/v1/news/${category}`;
    console.log('Fetching from:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      
      const errorResponse = NextResponse.json(
        { 
          success: false,
          message: `Failed to fetch news: ${response.statusText}`,
          error: errorText
        },
        { status: response.status }
      );
      return setCorsHeaders(errorResponse, origin);
    }
    
    const data = await response.json();
    const apiResponse = NextResponse.json({
      success: true,
      ...data
    });
    
    return setCorsHeaders(apiResponse, origin);
    
  } catch (error) {
    console.error('Error in news API route:', error);
    const errorResponse = NextResponse.json(
      { 
        success: false,
        message: 'Failed to process news request',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
    return setCorsHeaders(errorResponse, origin);
  }
}

export const dynamic = 'force-dynamic'; // Ensure the route is dynamic
