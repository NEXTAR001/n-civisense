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
    const formData = await request.formData();
    const audioFile = formData.get('file');

    if (!audioFile || !(audioFile instanceof Blob)) {
      const response = NextResponse.json(
        { 
          success: false,
          message: 'Audio file is required' 
        },
        { status: 400 }
      );
      return setCorsHeaders(response, origin);
    }

    const apiUrl = 'http://136.116.183.32/audio/transcribe';
    console.log('Transcribing audio file...');
    
    // Forward the FormData to the backend
    const apiFormData = new FormData();
    apiFormData.append('file', audioFile, 'voice_note.wav');

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: apiFormData,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Transcription API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: data
      });
      
      const errorResponse = NextResponse.json(
        { 
          success: false,
          message: data.message || 'Transcription failed',
          error: data
        },
        { status: response.status }
      );
      return setCorsHeaders(errorResponse, origin);
    }
    
    const apiResponse = NextResponse.json({
      success: true,
      text: data.text
    });
    
    return setCorsHeaders(apiResponse, origin);
    
  } catch (error) {
    console.error('Error in transcription API route:', error);
    const errorResponse = NextResponse.json(
      { 
        success: false,
        message: 'Failed to process transcription request',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
    return setCorsHeaders(errorResponse, origin);
  }
}

export const dynamic = 'force-dynamic';
