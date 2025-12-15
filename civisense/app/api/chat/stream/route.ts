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
    const { text, context, session_id } = body;
    if (!text || !session_id) {
      const response = NextResponse.json(
        { 
          success: false,
          message: 'Text and session_id are required' 
        },
        { status: 400 }
      );
      return setCorsHeaders(response, origin);
    }

    const apiUrl = 'http://136.116.183.32/chat/stream';
    console.log('Streaming chat for session:', session_id);
    
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify({
        text,
        context: context || 'NIMC',
        session_id
      })
    });
    
    if (!apiResponse.ok) {
      console.error('Chat API Error:', {
        status: apiResponse.status,
        statusText: apiResponse.statusText,
      });
      
      const errorResponse = NextResponse.json(
        { 
          success: false,
          message: 'Failed to connect to chat service'
        },
        { status: apiResponse.status }
      );
      return setCorsHeaders(errorResponse, origin);
    }
    
    // Create a ReadableStream to forward the SSE stream
    const stream = new ReadableStream({
      async start(controller) {
        const reader = apiResponse.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              controller.close();
              break;
            }
            
            // Forward the chunk as-is
            controller.enqueue(value);
          }
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      }
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': origin || '*',
      }
    });
    
  } catch (error) {
    console.error('Error in chat stream API route:', error);
    const errorResponse = NextResponse.json(
      { 
        success: false,
        message: 'Failed to process chat request',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
    return setCorsHeaders(errorResponse, origin);
  }
}

export const dynamic = 'force-dynamic';
