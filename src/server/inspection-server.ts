import { serve } from 'bun';
import { requestStorage } from './types';

const INSPECTION_PORT = 4201;

// Start the inspection server for API access
export function startInspectionServer() {
  console.log(`🔍 Starting inspection server on port ${INSPECTION_PORT}...`);

  return serve({
    port: INSPECTION_PORT,
    async fetch(req) {
      const url = new URL(req.url);
      const path = url.pathname;
      
      // CORS headers to allow frontend access
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      };
      
      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: corsHeaders
        });
      }
      
      // Only allow GET requests
      if (req.method !== 'GET') {
        return new Response('Method not allowed', {
          status: 405,
          headers: {
            ...corsHeaders,
            'Content-Type': 'text/plain'
          }
        });
      }
      
      // Handle different API endpoints
      if (path === '/requests') {
        // Filter by exact URL if specified
        const exactUrl = url.searchParams.get('url');
        if (exactUrl) {
          const filteredRequests = requestStorage.getRequestsByUrl(exactUrl);
          return new Response(JSON.stringify(filteredRequests), {
            status: 200,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json'
            }
          });
        }
        
        // Filter by URL pattern if specified
        const urlPattern = url.searchParams.get('url_pattern');
        if (urlPattern) {
          const filteredRequests = requestStorage.getRequestsByUrlPattern(urlPattern);
          return new Response(JSON.stringify(filteredRequests), {
            status: 200,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json'
            }
          });
        }
        
        // Return all requests if no filter specified
        return new Response(JSON.stringify(requestStorage.getAllRequests()), {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        });
      } 
      
      // Clear all requests
      else if (path === '/requests/clear') {
        requestStorage.clearRequests();
        return new Response('OK', {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'text/plain'
          }
        });
      }
      
      // Handle 404 for all other paths
      return new Response('Not found', {
        status: 404,
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/plain'
        }
      });
    }
  });
}