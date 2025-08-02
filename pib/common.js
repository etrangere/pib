// --- Global variables ---
window.prefix = null;
window.baseUrl = null;

// --- Step 1: Normalize path and compute prefix (remove .html) ---
const pathname = window.location.pathname.replace(/\/{2,}/g, '/');
window.prefix = pathname.replace('.html', '');

// --- Step 2: Extract project name for title ---
const segments = pathname.split('/').filter(s => s);
const pibIndex = segments.indexOf('pib');
const projectName = pibIndex > 0
    ? segments[pibIndex - 1]
    : segments[0] || 'PIB';

// --- Step 3: Set dynamic page title ---
document.title = `${projectName}_pib`;

// --- Step 4: Fetch real server port ---
fetch('./server-control.php?cmd=status')
    .then(response => {
        if (!response.ok) throw new Error('Network error: ' + response.status);
        return response.json();
    })
    .then(data => {
        // Use real port from PHP server
        const port = data.port || 8088;

        // ✅ Build baseUrl with correct protocol + port + prefix
        window.baseUrl = `http://localhost:${port}${window.prefix}`;

        // ✅ Debug
        console.log('Project:', projectName);
        console.log('prefix:', window.prefix);
        console.log('Port:', port);
        console.log('Base URL:', window.baseUrl);
    })
    .catch(err => {
        // ✅ Fallback if API fails

    });