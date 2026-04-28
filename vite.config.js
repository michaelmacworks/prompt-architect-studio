import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { onRequestGet, onRequestPost } from "./functions/api/architect.js";

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

async function sendWebResponse(res, webResponse) {
  res.statusCode = webResponse.status;
  webResponse.headers.forEach((value, key) => res.setHeader(key, value));
  res.end(await webResponse.text());
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: "local-pages-functions",
      configureServer(server) {
        server.middlewares.use("/api/architect", async (req, res) => {
          try {
            const body = req.method === "POST" ? await readBody(req) : undefined;
            const request = new Request("http://localhost/api/architect", {
              method: req.method,
              headers: req.headers,
              body,
            });
            const handler = req.method === "POST" ? onRequestPost : onRequestGet;
            await sendWebResponse(res, await handler({ request }));
          } catch (error) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Local API middleware failed." }));
          }
        });
      },
    },
  ],
});
