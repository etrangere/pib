<?php
// Use a relative path for the PID file (same directory as run.php)
$pid_file = __DIR__ . '/server.pid';

if ($_GET['cmd'] === 'start') {
    // Start the server in the same directory as run.php
    exec("python2 " . __DIR__ . "/start_pib.py > /dev/null 2>&1 & echo $!", $out);
    if (!empty($out) && is_numeric($out[0])) {
        $pid = $out[0];
        // Save PID to file
        file_put_contents($pid_file, $pid);
        echo "✅ Started. PID: $pid";
    } else {
        echo "❌ Failed to start server";
    }
} elseif ($_GET['cmd'] === 'stop') {
    // Check if PID file exists
    if (file_exists($pid_file)) {
        $pid = trim(file_get_contents($pid_file));
        if (is_numeric($pid)) {
            // Check if process is running
            exec("kill -0 $pid 2>/dev/null", $output, $return_code);
            if ($return_code === 0) {
                // Process exists, attempt to kill it
                exec("kill $pid 2>/dev/null", $output, $kill_return_code);
                // Verify if process is still running
                exec("kill -0 $pid 2>/dev/null", $output, $verify_return_code);
                if ($verify_return_code !== 0) {
                    // Process was killed, remove PID file
                    unlink($pid_file);
                    echo "✅ Stopped. PID $pid killed.";
                } else {
                    echo "❌ Failed to kill PID $pid. Process may still be running.";
                }
            } else {
                // Process doesn't exist, clean up PID file
                unlink($pid_file);
                echo "❌ PID $pid not found. Server was not running.";
            }
        } else {
            echo "❌ Invalid PID in $pid_file";
        }
    } else {
        echo "❌ No PID file found. Server may not be running.";
    }
} else {
    echo "❌ Invalid command";
}

