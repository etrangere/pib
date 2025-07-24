<?php
header('Content-Type: text/plain');
$pid_file = __DIR__ . '/server.pid';

if ($_GET['cmd'] === 'start') {
    // Kill any existing server first
    exec("lsof -i :8088 | grep LISTEN | awk '{print $2}' | xargs kill -9 2>/dev/null");

    // Start Node.js server
    exec("cd " . __DIR__ . " && node start_pib_node.js > /dev/null 2>&1 & echo $!", $out);
    if (!empty($out) && is_numeric($out[0])) {
        $pid = $out[0];
        file_put_contents($pid_file, $pid);
        echo "✅ Started Node.js server. PID: $pid";
    } else {
        echo "❌ Failed to start Node.js server";
    }
} elseif ($_GET['cmd'] === 'stop') {
    $killed = false;

    // Try to kill by PID file
    if (file_exists($pid_file)) {
        $pid = trim(file_get_contents($pid_file));
        if (is_numeric($pid) && !empty($pid)) {
            exec("kill -0 $pid 2>/dev/null", $output, $return_code);
            if ($return_code === 0) {
                exec("kill -9 $pid 2>/dev/null");
                unlink($pid_file);
                echo "✅ Stopped server. PID $pid killed.";
                $killed = true;
            }
        }
    }

    // Kill any remaining server on port 8088
    exec("lsof -i :8088 | grep LISTEN | awk '{print $2}' | xargs kill -9 2>/dev/null");

    if (!$killed) {
        echo "✅ Server stopped (killed processes on port 8088)";
    }

    // Clean up PID file
    if (file_exists($pid_file)) {
        unlink($pid_file);
    }
} else {
    echo "❌ Invalid command. Use ?cmd=start or ?cmd=stop";
}
