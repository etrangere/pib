#!/usr/bin/env python2
# -*- coding: utf-8 -*-
import SimpleHTTPServer
import SocketServer
import os

PORT = 8088
WEB_DIR = os.path.dirname(os.path.abspath(__file__))

# Print WEB_DIR to verify the directory
print "📂 WEB_DIR: %s" % WEB_DIR

class CORSHTTPRequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers to allow access from any origin
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With')
        # Optionally set X-Frame-Options to SAMEORIGIN (uncomment if needed)
        # self.send_header('X-Frame-Options', 'SAMEORIGIN')
        SimpleHTTPServer.SimpleHTTPRequestHandler.end_headers(self)

    def do_OPTIONS(self):
        # Handle CORS preflight requests
        self.send_response(200)
        self.end_headers()

    def translate_path(self, path):
        # Strip '/69.pib/pib' from the URL path to map to WEB_DIR
        if path.startswith('/69.pib/pib'):
            path = path[len('/69.pib/pib'):]
        return SimpleHTTPServer.SimpleHTTPRequestHandler.translate_path(self, path)

# Change to the web directory (where index.html and resources folder are located)
os.chdir(WEB_DIR)

# Set up the server
Handler = CORSHTTPRequestHandler
httpd = SocketServer.TCPServer(("", PORT), Handler)

print "✅ Serving PIB at http://localhost:%s/" % PORT
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print "\n🛑 Server stopped."
    httpd.shutdown()