"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 4173);
const HOST = "127.0.0.1";
const ROOT = path.resolve(__dirname, "..");

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp"
};

const WRITE_TARGETS = {
  "/api/site-content": "site-content.json",
  "/api/editor-site": "editor-site.json",
  "/api/created-page-data": "created-page.json"
};

function send(res, statusCode, body, contentType) {
  res.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function safeOutputName(value) {
  const stem = String(value || "created-page")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64) || "created-page";
  return `${stem}.html`;
}

function decodeUrlPath(urlPath) {
  try {
    return decodeURIComponent((urlPath || "/").split("?")[0]);
  } catch (error) {
    return null;
  }
}

function safePath(cleanPath) {
  if (cleanPath === "/" || cleanPath === "/index.html") {
    return path.join(ROOT, "index.html");
  }

  if (cleanPath === "/react-editor" || cleanPath === "/react-editor/") {
    return path.join(ROOT, "react-editor", "index.html");
  }

  const normalized = path.normalize(cleanPath).replace(/^(\.\.[/\\])+/, "");
  return path.join(ROOT, normalized);
}

const server = http.createServer((req, res) => {
  const cleanUrl = decodeUrlPath(req.url);
  if (cleanUrl === null) {
    send(
      res,
      400,
      JSON.stringify({ ok: false, error: "Invalid URL encoding" }),
      "application/json; charset=utf-8"
    );
    return;
  }

  if (req.method === "POST" && WRITE_TARGETS[cleanUrl]) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 25 * 1024 * 1024) {
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        const parsed = JSON.parse(body || "{}");
        const pretty = `${JSON.stringify(parsed, null, 2)}\n`;
        fs.writeFileSync(path.join(ROOT, WRITE_TARGETS[cleanUrl]), pretty);
        send(res, 200, JSON.stringify({ ok: true, file: WRITE_TARGETS[cleanUrl] }), "application/json; charset=utf-8");
      } catch (error) {
        send(res, 400, JSON.stringify({ ok: false, error: "Invalid JSON" }), "application/json; charset=utf-8");
      }
    });

    return;
  }

  if (req.method === "POST" && cleanUrl === "/api/created-page") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 30 * 1024 * 1024) {
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        const parsed = JSON.parse(body || "{}");
        if (typeof parsed.html !== "string" || !parsed.html.trim()) {
          throw new Error("Missing HTML");
        }

        const outputFile = safeOutputName(parsed.fileName);
        const outputJson = outputFile.replace(/\.html$/i, ".json");

        fs.writeFileSync(path.join(ROOT, outputFile), parsed.html);

        if (parsed.project && typeof parsed.project === "object") {
          const pretty = `${JSON.stringify(parsed.project, null, 2)}\n`;
          fs.writeFileSync(path.join(ROOT, outputJson), pretty);
        }

        send(res, 200, JSON.stringify({ ok: true, file: outputFile }), "application/json; charset=utf-8");
      } catch (error) {
        send(res, 400, JSON.stringify({ ok: false, error: "Invalid page payload" }), "application/json; charset=utf-8");
      }
    });

    return;
  }

  const requestedPath = safePath(cleanUrl);

  fs.stat(requestedPath, (statError, stats) => {
    if (statError) {
      send(res, 404, "Not found", "text/plain; charset=utf-8");
      return;
    }

    const filePath = stats.isDirectory() ? path.join(requestedPath, "index.html") : requestedPath;

    fs.readFile(filePath, (readError, fileBuffer) => {
      if (readError) {
        send(res, 404, "Not found", "text/plain; charset=utf-8");
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      send(res, 200, fileBuffer, MIME_TYPES[ext] || "application/octet-stream");
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`React editor server running at http://${HOST}:${PORT}`);
});
