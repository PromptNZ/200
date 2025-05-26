// Define the interface for captured HTTP requests
export interface CapturedRequest {
  id: string;
  timestamp: number;
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string | null;
}

// Storage for all captured requests
export class RequestStorage {
  private requests: CapturedRequest[] = [];

  // Add a new request to storage
  addRequest(request: CapturedRequest): void {
    this.requests.push(request);
  }

  // Get all requests
  getAllRequests(): CapturedRequest[] {
    return [...this.requests];
  }

  // Filter requests by exact URL
  getRequestsByUrl(url: string): CapturedRequest[] {
    return this.requests.filter(req => req.url === url);
  }

  // Filter requests by URL pattern (supports * wildcard)
  getRequestsByUrlPattern(pattern: string): CapturedRequest[] {
    // Convert pattern to regex
    const regexPattern = pattern
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&') // Escape special characters
      .replace(/\*/g, '.*'); // Replace * with .*
    
    const regex = new RegExp(`^${regexPattern}$`);
    return this.requests.filter(req => regex.test(req.url));
  }

  // Clear all stored requests
  clearRequests(): void {
    this.requests = [];
  }
}

// Create a single instance to be shared between servers
export const requestStorage = new RequestStorage();