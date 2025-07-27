<?php
// router.php
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/php-error.log');

// Get requested URI path (without query string)
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Define server root as the common parent of all projects, e.g. /var/www
$serverRoot = realpath(__DIR__ . '/../..');

// Do NOT remove project folder segment — keep full URI path relative to server root
$relativePath = ltrim($uri, '/');  // Remove leading slash only

// Resolve full requested path
$requestedPath = realpath($serverRoot . DIRECTORY_SEPARATOR . $relativePath);

error_log("Requested URI: $uri");
error_log("Relative path: $relativePath");
error_log("Resolved path: $requestedPath");
error_log("Server root: $serverRoot");
error_log("Router location: " . realpath(__DIR__));

// Security check: ensure requested path is inside server root
if ($requestedPath === false || strpos($requestedPath, $serverRoot) !== 0) {
    http_response_code(403);
    echo "Access denied";
    exit;
}

// Serve file if it exists
if (is_file($requestedPath)) {
    $ext = strtolower(pathinfo($requestedPath, PATHINFO_EXTENSION));
    $mime_types = [
        'pdf' => 'application/pdf',
        'txt' => 'text/plain',
        'html' => 'text/html',
        'htm' => 'text/html',
        'js' => 'application/javascript',
        'css' => 'text/css',
        'json' => 'application/json',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'svg' => 'image/svg+xml',
        'mp4' => 'video/mp4',
        'mp3' => 'audio/mpeg',
        'wav' => 'audio/wav',
    ];
    header('Content-Type: ' . ($mime_types[$ext] ?? 'application/octet-stream'));
    readfile($requestedPath);
    exit;
}

// File not found fallback
http_response_code(404);
echo "File not found: " . htmlspecialchars($uri);
