const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT_FILE = path.join(__dirname, '.pib-port');
let START_PORT = 8088;

// Read port from file at startup (highest priority)
if (fs.existsSync(PORT_FILE)) {
    try {
        const backupPort = parseInt(fs.readFileSync(PORT_FILE, 'utf8'));
        if (!isNaN(backupPort) && backupPort > 0) {
            START_PORT = backupPort;
            console.log(`🎯 Found backup port: ${START_PORT} (This is your preferred port!)`);
            console.log(` If port ${START_PORT} is busy, please stop the other project using it.`);
            console.log(`💡 To free the port: kill the process or stop the other PIB server.`);
        }
    } catch (err) {
        console.log('Could not read port file');
    }
} else {
    console.log('No port file found, using default 8088');
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

        // Special endpoints for port management
        if (req.url === '/backup-current-port' && req.method === 'GET') {
            const serverAddress = res.socket.server.address();
            if (serverAddress) {
                try {
                    fs.writeFileSync(PORT_FILE, serverAddress.port.toString());
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        status: 'success',
                        message: `Port ${serverAddress.port} backed up successfully`,
                        port: serverAddress.port
                    }));
                } catch (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        status: 'error',
                        message: 'Failed to backup port'
                    }));
                }
            } else {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 'error',
                    message: 'Server not listening'
                }));
            }
            return;
        }

        if (req.url === '/restore-backup-port' && req.method === 'GET') {
            if (fs.existsSync(PORT_FILE)) {
                try {
                    const backupPort = parseInt(fs.readFileSync(PORT_FILE, 'utf8'));
                    if (!isNaN(backupPort) && backupPort > 0) {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({
                            status: 'success',
                            message: `Backup port is ${backupPort}`,
                            port: backupPort
                        }));
                    } else {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({
                            status: 'error',
                            message: 'Invalid backup port'
                        }));
                    }
                } catch (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        status: 'error',
                        message: 'Failed to read backup port'
                    }));
                }
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 'error',
                    message: 'No backup port file found'
                }));
            }
            return;
        }

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
        res.end('Server running. Use /backup-current-port or /restore-backup-port for port management.');
    });
}

// Function to start server on available port (auto-detect)
function startServer(port) {
    const server = createServer(); // Create NEW server instance

    server.listen(port, '127.0.0.1', () => {
        const actualPort = server.address().port;
        console.log(`✅ Server successfully started at http://localhost:${actualPort}/`);

        // Handle port file logic
        try {
            if (!fs.existsSync(PORT_FILE)) {
                // First time - create port file with this port (this becomes the backup port)
                fs.writeFileSync(PORT_FILE, actualPort.toString());
                console.log(`🔒 Port ${actualPort} automatically saved as backup port!`);
                console.log(`💡 This ensures URL stability for future restarts.`);
            } else {
                // Port file exists - this contains our backup port
                const backupPort = parseInt(fs.readFileSync(PORT_FILE, 'utf8'));
                if (backupPort === actualPort) {
                    // Perfect - using our backup port
                    console.log(`🎯 Using backup port ${actualPort}`);
                } else {
                    // We had to use a different port (backup port was busy)
                    console.log(`Had to use port ${actualPort} instead of backup port ${backupPort}`);
                    console.log(`Your URLs may have changed!`);
                }
                // NEVER update the backup port file - it must remain unchanged
            }
        } catch (err) {
            console.error('Could not handle port file:', err.message);
        }
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            // Try to read the backup port
            if (fs.existsSync(PORT_FILE)) {
                const backupPort = parseInt(fs.readFileSync(PORT_FILE, 'utf8'));
                if (backupPort === port) {
                    console.log(`\n🔴 CRITICAL: Backup port ${port} is currently in use!`);
                    console.log(`🔴 Please stop the other project/server using port ${port}`);
                    process.exit(1);
                }
            }
            console.log(`Port ${port} is busy, trying ${port + 1}...`);
            startServer(port + 1); // Try next port with NEW server instance
        } else {
            console.error('Server error:', err.message);
        }
    });
}

// Start the server
console.log(`\n🚀 Attempting to start server with port: ${START_PORT}`);
startServer(START_PORT);