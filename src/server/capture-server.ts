import { serve } from 'bun';
import { randomUUID } from 'crypto';
import { requestStorage, CapturedRequest } from './types';

const CAPTURE_PORT = 4200;

// Function to read the request body as text
async function readRequestBodyAsText(req: Request): Promise<string | null> {
  try {
    const contentType = req.headers.get('content-type');
    if (!contentType || !req.body) {
      return null;
    }
    return await req.text();
  } catch (error) {
    console.error('Error reading request body:', error);
    return null;
  }
}

// Convert Headers object to a simple Record<string, string>
function headersToObject(headers: Headers): Record<string, string> {
  const obj: Record<string, string> = {};
  headers.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

// Start the capture server
export function startCaptureServer() {
  console.log(`🔍 Starting capture server on port ${CAPTURE_PORT}...`);
  
  return serve({
    port: CAPTURE_PORT,
    async fetch(req) {
      const url = new URL(req.url);
      const body = await readRequestBodyAsText(req);
      
      // Store the captured request
      const capturedRequest: CapturedRequest = {
        id: randomUUID(),
        timestamp: Date.now(),
        method: req.method,
        url: url.pathname + url.search,
        headers: headersToObject(req.headers),
        body
      };
      
      requestStorage.addRequest(capturedRequest);
      
      // Always respond with 200 OK
      return new Response('OK', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    }
  });
}