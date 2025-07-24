const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8088;
const WEB_DIR = __dirname;

console.log('=== SERVER STARTING ===');
console.log('WEB_DIR:', WEB_DIR);
console.log('Server will serve files from this directory and subdirectories');

const server = http.createServer((req, res) => {
    // Always set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');

    console.log('\n=== NEW REQUEST ===');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('WEB_DIR:', WEB_DIR);

    if (req.method === 'OPTIONS') {
        console.log('OPTIONS request - sending 200');
        res.writeHead(200);
        res.end();
        return;
    }

    // Parse URL to find pib path
    const urlParts = req.url.split('/');
    console.log('URL parts:', urlParts);

    // Find first occurrence of 'pib'
    const pibIndex = urlParts.indexOf('pib');
    console.log('First pib index:', pibIndex);

    if (pibIndex !== -1 && pibIndex < urlParts.length - 1) {
        // Get path after pib
        const filePathParts = urlParts.slice(pibIndex + 1);
        const relativePath = filePathParts.join('/');
        const fullPath = path.join(WEB_DIR, relativePath);

        console.log('Relative path:', relativePath);
        console.log('Full path:', fullPath);

        // Check if file exists
        fs.access(fullPath, fs.constants.F_OK, (err) => {
            if (err) {
                console.log('❌ FILE NOT FOUND:', fullPath);
                // Check what files actually exist
                const dirPath = path.dirname(fullPath);
                console.log('Checking directory:', dirPath);
                fs.readdir(dirPath, (dirErr, files) => {
                    if (dirErr) {
                        console.log('Directory error:', dirErr.message);
                    } else {
                        console.log('Files in directory:', files);
                    }
                    res.writeHead(404);
                    res.end('File not found: ' + relativePath);
                });
            } else {
                console.log('✅ FILE FOUND - SERVING');
                res.writeHead(200, {
                    'Content-Type': 'application/pdf'
                });
                fs.createReadStream(fullPath).pipe(res);
            }
        });
        return;
    }

    console.log('No pib path found');
    res.writeHead(200);
    res.end('Server running from: ' + WEB_DIR);
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`\n🚀 Server listening at http://localhost:${PORT}/`);
});

server.on('error', (err) => {
    console.error('❌ Server error:', err.message);
});