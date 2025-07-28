<?php
header('Content-Type: text/plain');
$pid_file = __DIR__ . '/server.pid';
$port_file = __DIR__ . '/.pib-port';
$host = '127.0.0.1';
$default_port = 8088;
$port = $default_port;
$max_port = 9050;


function isPortFree($port) {
    $connection = @fsockopen('127.0.0.1', $port);
    if (is_resource($connection)) {
        fclose($connection);
        return false;
    }
    return true;
}

function isPhpServerRunning($pid, $port) {
    $output = [];
    exec("ps -p $pid -o cmd=", $output);
    if (!empty($output[0])) {
        return str_contains($output[0], "php -S 127.0.0.1:$port");
    }
    return false;
}

// Load saved port if exists
$max_port = 9050;

// Load saved port or find a new one
if (file_exists($port_file)) {
    $saved_port = intval(trim(file_get_contents($port_file)));
    if ($saved_port > 0) {
        $port = $saved_port;
    }
} else {
    // .pib-port does not exist
    if (isPortFree($default_port)) {
        $port = $default_port;
    } else {
        // Search for next free port from default + 1 to max_port
        for ($try = $default_port + 1; $try <= $max_port; $try++) {
            if (isPortFree($try)) {
                $port = $try;
                break;
            }
        }

        // If no free port found
        if (!isset($port)) {
            echo "❌ No free ports found from $default_port to $max_port\n";
            exit(1);
        }
    }

    // Save new port to .pib-port
    file_put_contents($port_file, $port);
}


if ($_GET['cmd'] === 'start') {
    // Check if server already running
    if (file_exists($pid_file)) {
        $pid = intval(trim(file_get_contents($pid_file)));
        if ($pid > 0 && isPhpServerRunning($pid, $port)) {
            echo "Server already running on http://$host:$port/ (PID: $pid)\n";
            exit;
        } else {
            // Stale PID, remove it
            unlink($pid_file);
        }
    }

    // If port is not free AND not our own server, abort
    if (!isPortFree($port)) {
        echo "ERROR: Port $port is already in use.\n";
        echo "Please free this port or delete " . basename($port_file) . " to choose a new port.\n";
        exit(1);
    }

    // Start server
    $cmd = sprintf(
        'php -S %s:%d -t %s %s > /dev/null 2>&1 & echo $!',
        $host,
        $port,
        escapeshellarg(__DIR__),
        escapeshellarg(__DIR__ . '/router.php')
    );
    exec($cmd, $output);
    $pid = intval($output[0] ?? 0);

    if ($pid > 0) {
        file_put_contents($pid_file, $pid);
        if (!file_exists($port_file)) {
            file_put_contents($port_file, $port);
        }
        echo "Started PHP built-in server on http://$host:$port/ PID: $pid\n";
    } else {
        echo "Failed to start PHP server\n";
    }

} elseif ($_GET['cmd'] === 'stop') {
    if (file_exists($pid_file)) {
        $pid = intval(trim(file_get_contents($pid_file)));
        if ($pid > 0 && isPhpServerRunning($pid, $port)) {
            exec("kill -9 $pid 2>/dev/null");
            unlink($pid_file);
            echo "Stopped server on port $port (PID: $pid)\n";
        } else {
            echo "No active PHP server found for PID: $pid\n";
            unlink($pid_file); // Clean up stale PID
        }
    } else {
        echo "No running server found\n";
    }

} elseif ($_GET['cmd'] === 'status') {
    header('Content-Type: application/json');
    if (file_exists($pid_file)) {
        $pid = intval(trim(file_get_contents($pid_file)));
        if ($pid > 0 && isPhpServerRunning($pid, $port)) {
            echo json_encode([
                'status' => 'running',
                'pid' => $pid,
                'port' => $port,
            ]);
        } else {
            echo json_encode(['status' => 'stopped']);
        }
    } else {
        echo json_encode(['status' => 'stopped']);
    }

} else {
    echo "Invalid command. Use ?cmd=start, ?cmd=stop or ?cmd=status\n";
}
