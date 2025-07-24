// run.php
<?php
if ($_GET['cmd'] === 'start') {
  exec("python2 start_pib.py > /dev/null 2>&1 & echo $!", $out);
  echo "✅ Started. PID: " . implode(" ", $out);
} elseif ($_GET['cmd'] === 'stop') {
  exec("pkill -f start_pib.py");
  echo "🛑 Stopped.";
} else {
  echo "❌ Invalid";
}
    ?>
