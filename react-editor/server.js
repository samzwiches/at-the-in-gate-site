"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { execFile } = require("child_process");

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

const IMAGE_EXTENSIONS = new Set([".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);

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

function safeExistingHtmlName(value) {
  const baseName = path.basename(String(value || ""));
  if (!baseName || !/^[a-z0-9._-]+\.html$/i.test(baseName)) {
    return null;
  }
  return baseName;
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

function labelFromAssetName(fileName) {
  return path.basename(fileName, path.extname(fileName))
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function listAssetLibrary() {
  const assetsDir = path.join(ROOT, "assets");
  const files = fs.readdirSync(assetsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((left, right) => left.localeCompare(right));

  return files.map((fileName) => ({
    label: labelFromAssetName(fileName),
    path: `../assets/${fileName}`
  }));
}

const server = http.createServer((req, res) => {
  const cleanUrl = decodeUrlPath(req.url);
  if (!cleanUrl) {
    send(res, 400, JSON.stringify({ ok: false, error: "Malformed URL" }), "application/json; charset=utf-8");
    return;
  }

  if ((req.method === "GET" || req.method === "HEAD") && cleanUrl === "/api/assets") {
    try {
      const library = listAssetLibrary();
      send(res, 200, JSON.stringify({ ok: true, assets: library }), "application/json; charset=utf-8");
    } catch (error) {
      send(res, 500, JSON.stringify({ ok: false, error: "Could not read assets folder" }), "application/json; charset=utf-8");
    }
    return;
  }

  if ((req.method === "GET" || req.method === "HEAD") && cleanUrl === "/api/download-site") {
    const zipPath = path.join(os.tmpdir(), `at-the-in-gate-site-${Date.now()}.zip`);
    const projectRoot = path.dirname(ROOT);

    execFile(
      "zip",
      ["-rq", zipPath, "equine-marketplace"],
      { cwd: projectRoot },
      (error) => {
        if (error) {
          send(res, 500, "Could not build site archive", "text/plain; charset=utf-8");
          return;
        }

        fs.readFile(zipPath, (readError, fileBuffer) => {
          fs.unlink(zipPath, () => {});

          if (readError) {
            send(res, 500, "Could not read site archive", "text/plain; charset=utf-8");
            return;
          }

          res.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Disposition": 'attachment; filename="at-the-in-gate-site.zip"',
            "Cache-Control": "no-store"
          });
          res.end(fileBuffer);
        });
      }
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

  if (req.method === "POST" && cleanUrl === "/api/publish-page") {
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
        const fileName = safeExistingHtmlName(parsed.fileName);
        if (!fileName || typeof parsed.html !== "string" || !parsed.html.trim()) {
          throw new Error("Invalid page payload");
        }

        fs.writeFileSync(path.join(ROOT, fileName), parsed.html);
        send(res, 200, JSON.stringify({ ok: true, file: fileName }), "application/json; charset=utf-8");
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
