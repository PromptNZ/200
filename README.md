# 200

![200 Logo](https://github.com/PromptNZ/200/raw/main/assets/200.png)

200 is a lightweight HTTP request capture and inspection tool that responds to all incoming requests with a "200 OK" response while storing them in memory for later inspection.

## Features

- Captures all HTTP requests (any method, path, headers, body)
- Always responds with 200 OK
- View and filter captured requests via the web interface
- Real-time updates as new requests arrive
- Filter requests by URL or pattern matching

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime

### Installation

```bash
# Install dependencies
bun install
```

### Running the Application

```bash
# Start the development server
bun run 200
```

This will start:

- Capture server on port 4200
- Inspection API on port 4201
- Frontend on port 4202

## Usage

### Capturing Requests

Send any HTTP request to:

```
http://localhost:4200/any/path
```

The server will:

1. Capture the request details
2. Respond with 200 OK
3. Store the request in memory

### Inspecting Requests

#### Via Web Interface

Open your browser to:

```
http://localhost:4202
```

Features:

- View all captured requests
- Filter by URL pattern (supports \* wildcards)
- View detailed request information
- Clear all captured requests

#### Via API

The inspection API is available at:

```
# Get all requests
GET http://localhost:4201/requests

# Filter by exact URL
GET http://localhost:4201/requests?url=/some/path

# Filter by URL pattern (supports * wildcard)
GET http://localhost:4201/requests?url_pattern=/api/*

# Clear all requests
GET http://localhost:4201/requests/clear
```

## API Reference

### Request Object Schema

```typescript
interface CapturedRequest {
  id: string;
  timestamp: number;
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string | null;
}
```
