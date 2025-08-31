<?php

/**
 * woocommerce_api.php
 *
 * Fetches all WooCommerce orders & subscriptions for a specific client,
 * and writes them to PayJob.xml in a structured format.
 */

ini_set('log_errors', '1');
ini_set('display_errors', '1');
ini_set('error_log', __DIR__ . '/php-error.log');
error_reporting(E_ALL);

// --------------------- RETURN XML HEADER ---------------------
header('Content-Type: text/xml');

try {
    // --------------------- CONFIG ---------------------
    $woo_url = "https://example.com/"; // WooCommerce site URL
    $consumer_key = "ck_1c2xxxxxxxxxxxxxxxxxxxxxxxxxb10afa";
    $consumer_secret = "cs_35c2xxxxxxxxxxxxxxxxxxxxxxxxxxxx015c7";

    $resourcesDir = __DIR__ . "/resources";
    if (!is_dir($resourcesDir)) mkdir($resourcesDir, 0777, true);

    $client_email = "client_email@example.com"; // Filter orders by this email
    $projectXmlFile = $resourcesDir . "/PayJob.xml";


    // --------------------- LAST FETCH ---------------------
    $lastFetchFile = $resourcesDir . "/last_fetch.txt";

    // Load last fetch date or fallback
    if (file_exists($lastFetchFile)) {
        $lastFetch = trim(file_get_contents($lastFetchFile));
        if (!$lastFetch) $lastFetch = '2000-01-01T00:00:00';
    } else {
        $lastFetch = '2000-01-01T00:00:00';
    }

    // Convert any stored format to UTC Z
    $lastFetch = gmdate('Y-m-d\TH:i:s\Z', strtotime($lastFetch));


    // Build API URL (⚠️ no urlencode)
    $ordersEndpoint = $woo_url . "/wp-json/wc/v3/orders?per_page=100&after=" . $lastFetch;



    // --------------------- ENSURE XML SKELETON ---------------------
    $projectName = !empty($client_email) ? preg_replace('/[^a-zA-Z0-9_-]/', '_', $client_email) : 'PayJobProject';
    if (!file_exists($projectXmlFile)) {
        $xml = new SimpleXMLElement("<Project name='{$projectName}'><Payments></Payments></Project>");
        $xml->asXML($projectXmlFile);
    } else {
        $xml = simplexml_load_file($projectXmlFile);
    }
    $existingIds = [];
    if (isset($xml->Payments->Payment)) {
        foreach ($xml->Payments->Payment as $p) {
            $existingIds[] = (string)$p['id'];
        }
    }

    // --------------------- FETCH ORDERS ---------------------
    $ordersEndpoint = $woo_url . "/wp-json/wc/v3/orders?after={$lastFetch}&per_page=100";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $ordersEndpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_USERPWD, "$consumer_key:$consumer_secret");
    $response = curl_exec($ch);
    if (curl_errno($ch)) throw new Exception("Curl error: " . curl_error($ch));
    curl_close($ch);

    // Save raw WooCommerce response for debugging
    file_put_contents(__DIR__ . '/woo-debug.txt', $response);

// Decode JSON
    $orders = json_decode($response, true);

// Validate
    if (!$orders || !is_array($orders)) {
        throw new Exception("Failed to fetch orders or invalid JSON from WooCommerce.");
    }

// Log each order for debugging
    foreach ($orders as $order) {
        error_log("Order #{$order['id']} billing email: " . ($order['billing']['email'] ?? 'NONE'));
    }

// --------------------- FILTER ORDERS BY CLIENT EMAIL ---------------------
    $filteredOrders = [];
    foreach ($orders as $order) {
        if (isset($order['billing']['email']) && strtolower($order['billing']['email']) === strtolower($client_email)) {
            $filteredOrders[] = $order;
        }
    }


    $recurringOrders = [];
    $oneTimeOrders  = [];

// --------------------- PROCESS FILTERED ORDERS ---------------------
    foreach ($filteredOrders as $order) {
        $orderId = $order['id'];
        if (in_array($orderId, $existingIds)) continue;

        $type = "one-time";
        if (isset($order['line_items'][0]['meta_data'])) {
            foreach ($order['line_items'][0]['meta_data'] as $meta) {
                if (strpos(strtolower($meta['key']), 'subscription') !== false) {
                    $type = "recurring";
                    break;
                }
            }
        }

        // Add XML node as before
        $payment = $xml->Payments->addChild("Payment");
        $payment->addAttribute("id", $orderId);
        $payment->addAttribute("type", $type);
        $featureName = $order['line_items'][0]['name'] ?? "Unknown Feature";
        $payment->addChild("Feature", htmlspecialchars($featureName));
        $payment->addChild("Amount", $order['total'] ?? 0);
        $payment->addChild("Date", $order['date_created'] ?? date('c'));
        $payment->addChild("Status", $order['status'] ?? 'unknown');

        // Collect for HTML output
        if ($type === "recurring") {
            $recurringOrders[] = $order;
        } else {
            $oneTimeOrders[] = $order;
        }
    }


    // --------------------- SAVE XML ---------------------
    $xml->asXML($projectXmlFile);

    // --------------------- UPDATE LAST FETCH ---------------------
    file_put_contents($lastFetchFile, date('c'));

    // --------------------- RETURN SUCCESS JSON ---------------------
    echo json_encode([
        'success' => true,
        'orders_processed' => count($filteredOrders),
        'client' => $client_email
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
