import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DIST_CANDIDATES = [
  path.join(__dirname, 'dist'),
  path.resolve(__dirname, '..', 'dist'),
  path.resolve('dist'),
  path.resolve('app', 'dist')
];

function resolveFilePath(reqPath) {
  if (reqPath === '/') reqPath = '/index.html';

  for (const dir of DIST_CANDIDATES) {
    if (!fs.existsSync(dir)) continue;

    let candidate = path.join(dir, reqPath);
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
      let indexCandidate = path.join(candidate, 'index.html');
      if (fs.existsSync(indexCandidate) && fs.statSync(indexCandidate).isFile()) {
        return indexCandidate;
      }
    }
    if (fs.existsSync(candidate + '.html') && fs.statSync(candidate + '.html').isFile()) {
      return candidate + '.html';
    }
    let subIndexCandidate = path.join(dir, reqPath, 'index.html');
    if (fs.existsSync(subIndexCandidate) && fs.statSync(subIndexCandidate).isFile()) {
      return subIndexCandidate;
    }
  }
  return null;
}

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogg': 'video/ogg'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  let filePath = resolveFilePath(reqPath);

  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end('<h1>404 Not Found</h1><p>The requested file does not exist.</p>');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME_TYPES[ext] || 'application/octet-stream';

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize || end >= fileSize) {
      res.writeHead(416, {
        'Content-Range': `bytes */${fileSize}`
      });
      return res.end();
    }

    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': mime
    });
    file.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Accept-Ranges': 'bytes',
      'Content-Type': mime
    });
    fs.createReadStream(filePath).pipe(res);
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Portfolio server is live at http://localhost:${PORT}/`);
});

