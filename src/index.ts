import { startCaptureServer } from "./server/capture-server";
import { startInspectionServer } from "./server/inspection-server";
import { join } from "path";
import { existsSync, statSync } from "fs";
import { serve } from "bun";

// Start both servers
const captureServer = startCaptureServer();
const inspectionServer = startInspectionServer();

// Also serve the frontend static files if they exist
const frontendPath = join(import.meta.dir, "../dist/frontend");

if (existsSync(frontendPath) && statSync(frontendPath).isDirectory()) {
  console.log("🌐 Serving frontend on port 4200...");

  serve({
    port: 4202,
    async fetch(req) {
      const url = new URL(req.url);
      let path = url.pathname;

      // Default to index.html
      if (path === "/") {
        path = "/index.html";
      }

      const filePath = join(frontendPath, path);

      // Try to serve the requested file
      if (existsSync(filePath) && statSync(filePath).isFile()) {
        return new Response(Bun.file(filePath));
      }

      // Fall back to index.html for SPA routing
      return new Response(Bun.file(join(frontendPath, "index.html")));
    },
  });
} else {
  console.log('❌ Frontend build not found. Run "bun run build" to create it.');
}

console.log("✅ Two-Hundred is running!");
console.log("⚡ Capture server: http://localhost:4200");
console.log("🔍 Inspection API: http://localhost:4201/requests");
if (existsSync(frontendPath)) {
  console.log("🖥️ Frontend: http://localhost:4202");
}
