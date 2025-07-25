const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT_FILE = path.join(__dirname, '.pib-port');
let START_PORT = 8088;

// Read port from file at startup
if (fs.existsSync(PORT_FILE)) {
    try {
        START_PORT = parseInt(fs.readFileSync(PORT_FILE, 'utf8')) || 8088;
        console.log(`Found saved port from file: ${START_PORT}`);
    } catch (err) {
        console.log('Could not read port file, using default 8088');
    }
}

const WEB_DIR = __dirname;
console.log('WEB_DIR:', WEB_DIR);

// Proper MIME type mapping
const mimeTypes = {
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    '.html': 'text/html',
    '.htm': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav'
};

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return mimeTypes[ext] || 'application/octet-stream';
}

// Create server function
function createServer() {
    return http.createServer((req, res) => {
        // Always set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');

        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }

        // Parse URL to find pib path
        const urlParts = req.url.split('/');
        const pibIndex = urlParts.indexOf('pib');

        if (pibIndex !== -1 && pibIndex < urlParts.length - 1) {
            // Get path after pib
            const filePathParts = urlParts.slice(pibIndex + 1);
            const relativePath = filePathParts.join('/');
            const fullPath = path.join(WEB_DIR, relativePath);

            // Check if file exists
            fs.access(fullPath, fs.constants.F_OK, (err) => {
                if (err) {
                    res.writeHead(404);
                    res.end('File not found: ' + relativePath);
                } else {
                    // Get proper MIME type
                    const mimeType = getMimeType(fullPath);
                    console.log('Serving file:', relativePath, 'MIME type:', mimeType);

                    res.writeHead(200, {
                        'Content-Type': mimeType
                    });
                    fs.createReadStream(fullPath).pipe(res);
                }
            });
            return;
        }

        res.writeHead(200);
        res.end('Server running');
    });
}

// Function to start server on available port (auto-detect)
function startServer(port) {
    const server = createServer(); // Create NEW server instance

    server.listen(port, '127.0.0.1', () => {
        const actualPort = server.address().port;
        console.log(`✅ Server successfully started at http://localhost:${actualPort}/`);

        // Save port to file
        try {
            fs.writeFileSync(PORT_FILE, actualPort.toString());
            console.log(`Port ${actualPort} saved to ${PORT_FILE}`);
        } catch (err) {
            console.error('Could not save port to file:', err.message);
        }
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is busy, trying ${port + 1}...`);
            startServer(port + 1); // Try next port with NEW server instance
        } else {
            console.error('❌ Server error:', err.message);
        }
    });
}

// Start the server
startServer(START_PORT);