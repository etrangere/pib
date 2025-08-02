<?php
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/php-error.log');

// CORS headers
header("Access-Control-Allow-Origin: *"); // For development, or restrict it like http://localhost:8088
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$path = __DIR__ . '/db.json';


error_log("Path in json-storage: $path");
// Create the file if it doesn't exist
if (!file_exists($path)) {
    file_put_contents($path, json_encode([], JSON_PRETTY_PRINT));
}

function loadDb($path) {
    return json_decode(file_get_contents($path), true) ?: [];
}

function saveDb($path, $data) {
    file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT));
}

// GET: ?key=mykey
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['key'])) {
    $db = loadDb($path);
    $key = $_GET['key'];
    echo json_encode(['value' => $db[$key] ?? null]);
    exit;
}

// POST: { key: ..., value: ... }
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (isset($input['key']) && array_key_exists('value', $input)) {
        $db = loadDb($path);
        $db[$input['key']] = $input['value'];
        saveDb($path, $db);
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Invalid payload']);
    }
    exit;
}

http_response_code(400);
echo json_encode(['error' => 'Invalid request']);
